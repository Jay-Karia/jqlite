import { EventManager } from "events/eventManager";
import { isVerboseEvent } from "helpers/index";

export function registerDataEvents(eventManager: EventManager) {
  eventManager.on("AFTER_SET_DATA", (data: string) => {
    console.log("Data set!");
    if (isVerboseEvent()) console.log("New data: " + data);
  });

  eventManager.on("AFTER_CLEAR_DATA", () => {
    console.log("Data cleared!");
  });

  eventManager.on("AFTER_RESOLVE_DATA", (data: string) => {
    console.log("Data resolved!");
    if (isVerboseEvent()) console.log("Resolved data: " + data);
  });

  eventManager.on("GET_DATA", () => {
    console.log("Getting data...");
  });

  eventManager.on("BEFORE_SET_DATA", () => {
    console.log("Setting data...");
  });

  eventManager.on("BEFORE_CLEAR_DATA", () => {
    console.log("Clearing data...");
  });

  eventManager.on("BEFORE_RESOLVE_DATA", () => {
    console.log("Resolving data...");
  });
}

export function clearDataEvents(eventManager: EventManager) {
  eventManager.off("AFTER_SET_DATA");
  eventManager.off("AFTER_CLEAR_DATA");
  eventManager.off("AFTER_RESOLVE_DATA");
  eventManager.off("GET_DATA");
  eventManager.off("BEFORE_SET_DATA");
  eventManager.off("BEFORE_CLEAR_DATA");
  eventManager.off("BEFORE_RESOLVE_DATA");
}
