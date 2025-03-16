import { EventManager } from "hooks/eventManager";

export function registerDataHooks(eventManager: EventManager) {
  eventManager.on("AFTER_GET_DATA", () => {
    console.log("Data retrieved!");
  });

  eventManager.on("AFTER_SET_DATA", () => {
    console.log("Data set!");
  });

  eventManager.on("AFTER_CLEAR_DATA", () => {
    console.log("Data cleared!");
  });

  eventManager.on("AFTER_RESOLVE_DATA", () => {
    console.log("Data resolved!");
  });

  eventManager.on("BEFORE_GET_DATA", () => {
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
