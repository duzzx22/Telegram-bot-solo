class CacheService {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 300000) { // 5 minutos padrão
    this.cache.set(key, { value, expires: Date.now() + ttl });
  }

  get(key) {
    const item = this.cache.get(key);
    if (item && item.expires > Date.now()) {
      return item.value;
    }
    this.cache.delete(key);
    return null;
  }

  clear() {
    this.cache.clear();
  }
}

module.exports = new CacheService();