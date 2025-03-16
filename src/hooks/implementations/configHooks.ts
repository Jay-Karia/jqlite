import {EventManager} from "hooks/eventManager";

export function registerConfigHooks(eventManager: EventManager) {
  eventManager.on("AFTER_SET_CONFIG", () => {
    console.log("Config set!");
  });

  eventManager.on("AFTER_GET_CONFIG", () => {
    console.log("Config retrieved!");
  });

  eventManager.on("BEFORE_SET_CONFIG", () => {
    console.log("Setting config...");
  });

  eventManager.on("BEFORE_GET_CONFIG", () => {
    console.log("Getting config...");
  });
}
