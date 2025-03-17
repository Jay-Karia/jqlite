import { EventManager } from "hooks/eventManager";

export function registerCacheHooks(eventManager: EventManager) {
  eventManager.on("CACHE_HIT", () => {
    console.log("Cache hit!");
  });

  eventManager.on("CACHE_MISS", () => {
    console.log("Cache miss!");
  });

  eventManager.on("CACHE_EXPIRED", () => {
    console.log("Cache expired!");
  });

  eventManager.on("CACHE_CLEARED", () => {
    console.log("Cache cleared!");
  });
}

export function clearCacheHooks(eventManager: EventManager) {
  eventManager.off("CACHE_HIT");
  eventManager.off("CACHE_MISS");
  eventManager.off("CACHE_EXPIRED");
  eventManager.off("CACHE_CLEARED");
}
