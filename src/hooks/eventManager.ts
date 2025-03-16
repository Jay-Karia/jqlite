import { EVENT_ERRORS } from "constants/errors";
import { EventError } from "errors";
import { EVENTS, EventType } from "./events";

type Callback = (...args: any[]) => void;

export class EventManager {
  private events: Record<EventType, Callback>;

  /**
   * Initialize a new EventManager
   */
  constructor() {
    // remove the callback array and only want one callback per event
    this.events = Object.keys(EVENTS).reduce(
      (acc, key) => {
        acc[key as EventType] = () => {};
        return acc;
      },
      {} as Record<EventType, Callback>
    );
  }

  /**
   * Listen for an event
   * @param event The event to listen for
   * @param callback The callback to run when the event is emitted
   */
  public on(event: EventType, callback: Callback): void {
    if (!(event in EVENTS)) throw new EventError(EVENT_ERRORS.INVALID_EVENT);

    if (!this.events[event]) this.events[event] = callback;
    this.events[event] = callback;
  }

  /**
   * Clear an event
   * @param event The event to clear
   */
  public clear(event: EventType) {
    if (this.events[event]) {
      this.events[event] = () => {};
    }
  }

  /**
   * Clear all events
   */
  public clearAllEvents() {
    this.events = Object.keys(EVENTS).reduce(
      (acc, key) => {
        acc[key as EventType] = () => {};
        return acc;
      },
      {} as Record<EventType, Callback>
    );
  }

  /**
   * Emits an event
   * @param event The event to emit
   */
  public emit(event: EventType, ...args: any[]): void {
    if (this.events[event]) {
      this.events[event](...args);
    }
  }

  /**
   * Get all the events
   * @returns All events
   */
  public getEvents(): Record<EventType, Callback> {
    return this.events;
  }
}
