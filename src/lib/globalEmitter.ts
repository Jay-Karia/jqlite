import { EventManager } from "events/eventManager";
import { EventType } from "events/events";

const eventManager = new EventManager();

export function emit(event: EventType, ...args: any[]) {
  eventManager.emit(event, ...args);
}

export { eventManager };
