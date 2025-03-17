import { EVENT_ERRORS } from "constants/errors";
import { EventError } from "errors";
import { EVENTS, EventType } from "./events";
import { clearDataHooks, registerDataHooks } from "./implementations/dataHooks";
import {
  clearCacheHooks,
  registerCacheHooks,
} from "./implementations/cacheHooks";
import {
  clearConfigHooks,
  registerConfigHooks,
} from "./implementations/configHooks";
import { DEFAULT_EVENTS_CONFIG } from "constants/index";
import { Events } from "types/config";
import { getConfig } from "lib/globalConfig";
import { EventCategory } from "types/event";

type Callback = (...args: any[]) => void;

export class EventManager {
  private events: Record<EventType, Callback>;
  /**
   * Initialize a new EventManager
   */
  constructor() {
    this.events = Object.keys(EVENTS).reduce(
      (acc, key) => {
        acc[key as EventType] = () => {};
        return acc;
      },
      {} as Record<EventType, Callback>
    );

    if (this.config && this.config.defaultEvents === false) return;

    registerDataHooks(this);
    registerCacheHooks(this);
    registerConfigHooks(this);
  }

  /**
   * Get the events config
   */
  get config(): Events {
    return getConfig().events || DEFAULT_EVENTS_CONFIG;
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
  public off(event: EventType) {
    if (this.events[event]) {
      // console.log(this.events[event]);
      this.events[event] = () => {};
    }
  }

  /**
   * Clear an event category
   * @param event The event category to clear
   */
  public clearEventCategory(event: EventCategory) {
    switch (event) {
      case "data":
        clearDataHooks(this);
        break;
      case "cache":
        clearCacheHooks(this);
        break;
      case "config":
        clearConfigHooks(this);
        break;
      case "all":
        this.clearAllEvents();
        break;
      default:
        throw new EventError(EVENT_ERRORS.INVALID_EVENT_CATEGORY);
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
    // if (this.config && this.config.defaultEvents === false)
    if (this.config && this.config.emit === false) return;
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
