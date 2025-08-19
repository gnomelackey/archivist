interface CachedSession {
  userId: string;
  expiresAt: Date;
  lastUsed: Date;
}

class SessionCache {
  private cache = new Map<string, CachedSession>();

  set(token: string, session: CachedSession): void {
    this.cache.set(token, session);
  }

  get(token: string): CachedSession | undefined {
    return this.cache.get(token);
  }

  delete(token: string): void {
    this.cache.delete(token);
  }

  clear(): void {
    this.cache.clear();
  }

  cleanup(): void {
    const now = new Date();

    for (const [token, session] of this.cache.entries()) {
      if (session.expiresAt < now) {
        this.cache.delete(token);
      }
    }
  }

  size(): number {
    return this.cache.size;
  }
}

const sessionCache = new SessionCache();

setInterval(
  () => {
    sessionCache.cleanup();
  },
  5 * 60 * 1000
);

export { sessionCache };
