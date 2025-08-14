import { prisma } from "@repo/db";
import { randomBytes } from "crypto";

import { sessionCache } from "./SessionCache";

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

    const data = { token, userId, userAgent, ipAddress, expiresAt };
    await prisma.session.create({ data });

    const session = { userId, expiresAt, lastUsed: new Date() };
    sessionCache.set(token, session);

    return token;
  }

  /**
   * Validate if a session exists and is not expired (cache-first approach)
   */
  static async isSessionValid(sessionToken: string): Promise<boolean> {
    try {
      const now = new Date();

      const cachedSession = sessionCache.get(sessionToken);

      if (!cachedSession) {
        const session = await prisma.session.findUnique({
          where: { token: sessionToken },
        });

        if (!session) return false;

        if (session.expiresAt < now) {
          await prisma.session.delete({ where: { token: sessionToken } });
          return false;
        }

        sessionCache.set(sessionToken, {
          userId: session.userId,
          expiresAt: session.expiresAt,
          lastUsed: now,
        });

        await prisma.session.update({
          where: { token: sessionToken },
          data: { lastUsed: now },
        });

        return true;
      }

      if (cachedSession.expiresAt < now) {
        sessionCache.delete(sessionToken);

        await prisma.session
          .delete({ where: { token: sessionToken } })
          .catch(() => {});

        return false;
      }

      cachedSession.lastUsed = now;
      sessionCache.set(sessionToken, cachedSession);

      prisma.session
        .update({ where: { token: sessionToken }, data: { lastUsed: now } })
        .catch((error) => {
          console.error("Background session update failed:", error);
        });

      return true;
    } catch (error) {
      console.error("Session validation error:", error);
      return false;
    }
  }

  /**
   * Get session with user data
   */
  static async getSessionWithUser(sessionToken: string) {
    return await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });
  }

  /**
   * Destroy a specific session
   */
  static async destroySession(sessionToken: string): Promise<void> {
    try {
      sessionCache.delete(sessionToken);
      await prisma.session.delete({ where: { token: sessionToken } });
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
