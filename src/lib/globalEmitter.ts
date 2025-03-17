import { EventManager } from "hooks/eventManager";
import { EventType } from "hooks/events";

const eventManager = new EventManager();

export function emit(event: EventType, ...args: any[]) {
  eventManager.emit(event, ...args);
}

export { eventManager };
