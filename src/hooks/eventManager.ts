import { EVENT_ERRORS } from "constants/errors";
import { EventError } from "errors";
import { EVENTS, EventType } from "./events";

type Callback = (...args: any[]) => void;

export class EventManager {
  private events: Record<EventType, Callback[]>;

  constructor() {
    this.events = Object.keys(EVENTS).reduce((acc, key) => {
      acc[key as EventType] = [];
      return acc;
    }, {} as Record<EventType, Callback[]>);
  }

  public on(event: EventType, callback: () => void): void {
    if (!(event in EVENTS)) throw new EventError(EVENT_ERRORS.INVALID_EVENT);

    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  public clear(event: EventType) {
    if (this.events[event]) {
      delete this.events[event];
    }
  }

  public off(event: EventType, callback: Callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        cb => cb !== callback
      );
    }
  }

  public emit(event: EventType, ...args: any[]) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(...args));
    }
  }
}
