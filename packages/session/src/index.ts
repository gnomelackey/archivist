import { prisma } from "@repo/db";
import { createHmac, randomBytes } from "crypto";

import { sessionCache } from "./cache";

export class SessionManager {
  /**
   * Create a new session for a user
   */
  static async createSession(
    userId: string,
    userAgent?: string,
    ipAddress?: string
  ): Promise<string> {
    const token = randomBytes(32).toString("hex");

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const hashedToken = this.hashSessionId(token);
    const data = {
      token: hashedToken,
      userId,
      userAgent,
      ipAddress,
      expiresAt,
    };
    await prisma.session.create({ data });

    const session = { userId, expiresAt, lastUsed: new Date() };
    sessionCache.set(hashedToken, session);

    return token;
  }

  static hashSessionId(raw?: string): string {
    const pepper = process.env.SESSION_PEPPER;

    if (!pepper) {
      throw new Error("Session ID Hashing Error: Pepper not defined");
    } else if (!raw) {
      throw new Error("Session ID Hashing Error: Session token is missing");
    }

    return createHmac("sha256", pepper).update(raw, "utf8").digest("hex");
  }

  /**
   * Validate if a session exists and is not expired (cache-first approach)
   */
  static async isSessionValid(sessionToken: string): Promise<string | null> {
    try {
      const now = new Date();

      const tokenHash = this.hashSessionId(sessionToken);

      const cachedSession = sessionCache.get(sessionToken);

      if (!cachedSession) {
        const session = await prisma.session.findUnique({
          where: { token: tokenHash },
          select: { userId: true, expiresAt: true },
        });

        if (!session) return null;

        if (session.expiresAt < now) {
          await prisma.session.delete({ where: { token: tokenHash } });
          return null;
        }

        sessionCache.set(sessionToken, {
          userId: session.userId,
          expiresAt: session.expiresAt,
          lastUsed: now,
        });

        await prisma.session.update({
          where: { token: tokenHash },
          data: { lastUsed: now },
        });

        return session.userId;
      }

      if (cachedSession.expiresAt < now) {
        sessionCache.delete(sessionToken);

        await prisma.session
          .delete({ where: { token: tokenHash } })
          .catch(() => {});

        return null;
      }

      if (cachedSession.lastUsed.getTime() <= now.getTime() - 60000) {
        cachedSession.lastUsed = now;
        sessionCache.set(sessionToken, cachedSession);
        prisma.session
          .update({ where: { token: tokenHash }, data: { lastUsed: now } })
          .catch((error) => {
            console.error("Background session update failed:", error);
          });
      }

      return cachedSession.userId;
    } catch (error) {
      console.error("Session validation error:", error);
      return null;
    }
  }

  /**
   * Destroy a specific session
   */
  static async destroySession(sessionToken: string): Promise<void> {
    try {
      const tokenHash = this.hashSessionId(sessionToken);
      sessionCache.delete(sessionToken);
      await prisma.session.delete({ where: { token: tokenHash } });
    } catch (error) {
      console.error("Error destroying session:", error);
    }
  }

  /**
   * Destroy all sessions for a user (logout from all devices)
   */
  static async destroyAllUserSessions(userId: string): Promise<void> {
    try {
      for (const [token, session] of sessionCache["cache"].entries()) {
        if (session.userId === userId) {
          sessionCache.delete(token);
        }
      }

      await prisma.session.deleteMany({ where: { userId } });
    } catch (error) {
      console.error("Error destroying user sessions:", error);
    }
  }

  /**
   * Clean up expired sessions (run this periodically)
   */
  static async cleanupExpiredSessions(): Promise<void> {
    try {
      await prisma.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
    } catch (error) {
      console.error("Error cleaning up expired sessions:", error);
    }
  }

  /**
   * Get all active sessions for a user
   */
  static async getUserSessions(userId: string) {
    return await prisma.session.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastUsed: "desc" },
    });
  }

  /**
   * Get cache statistics (for monitoring/debugging)
   */
  static getCacheStats() {
    return {
      size: sessionCache.size(),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Clear all cached sessions (useful for debugging or emergency)
   */
  static clearCache(): void {
    sessionCache.clear();
  }

  /**
   * Manually cleanup cache (useful for forced cleanup)
   */
  static cleanupCache(): void {
    sessionCache.cleanup();
  }

  /**
   * Check if a session exists in cache (for debugging)
   */
  static isSessionInCache(sessionToken: string): boolean {
    return sessionCache.get(sessionToken) !== undefined;
  }
}
