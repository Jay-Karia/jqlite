import { EventManager } from "hooks/eventManager";

export function registerConfigHooks(eventManager: EventManager) {
  eventManager.on("AFTER_SET_CONFIG", () => {
    console.log("Config set!");
  });

  eventManager.on("BEFORE_SET_CONFIG", () => {
    console.log("Setting config...");
  });

  eventManager.on("GET_CONFIG", () => {
    console.log("Getting config...");
  });

  eventManager.on("BEFORE_ADD_ALIAS", () => {
    console.log("Adding Alias...");
  });

  eventManager.on("AFTER_ADD_ALIAS", () => {
    console.log("Alias added!");
  });

  eventManager.on("BEFORE_REMOVE_ALIAS", () => {
    console.log("Removing Alias...");
  });

  eventManager.on("AFTER_REMOVE_ALIAS", () => {
    console.log("Alias removed!");
  });

  eventManager.on("BEFORE_CLEAR_ALIASES", () => {
    console.log("Clearing aliases...");
  });

  eventManager.on("AFTER_CLEAR_ALIASES", () => {
    console.log("Aliases cleared!");
  });

  eventManager.on("BEFORE_RESET_CONFIG", () => {
    console.log("Resetting config...");
  });

  eventManager.on("AFTER_RESET_CONFIG", () => {
    console.log("Config reset!");
  });
}
