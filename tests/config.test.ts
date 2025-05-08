/**
 * @fileoverview Config tests.
 * @author Jay-Karia
 */

"use strict";

//===================================IMPORTS===================================

import { expect, test, describe, vi } from "vitest";
import { config } from "../src/index";
import { DEFAULT_CONFIG } from "../src/config/defaults";
import { unlinkSync, writeFileSync } from "fs";
import { overrideConfig } from "../src/config/utils";
import {ConfigType} from "../src/config/types";

//=============================================================================

describe("ConfigManager", () => {
  test("default config", () => {
    // Initialize
    expect(config.get()).toEqual(DEFAULT_CONFIG);
  });

  test("override", () => {
    const newConfigs = [
      {
        loadFile: "./test.json",
      },
      {
        fetchUrl: "https://example.com/test.json",
      },
    ];

    newConfigs.forEach(newConfig => {
      config.set(newConfig);
      expect(config.get()).toEqual(overrideConfig(DEFAULT_CONFIG, newConfig));
      config.clear();
    });
  });

  test("get()", () => {
    // Initialize
    expect(config.get()).toEqual(DEFAULT_CONFIG);
  });

  test("set()", () => {
    // Initialize
    const newConfig = {
      loadFile: "./test.json",
      fetchUrl: "https://example.com/test.json",
    };

    config.set(newConfig);
    expect(config.get()).toEqual(overrideConfig(DEFAULT_CONFIG, newConfig));
    config.clear();
  });

  test("clear()", () => {
    // Initialize
    const newConfig = {
      loadFile: "./test.json",
      fetchUrl: "https://example.com/test.json",
    };

    config.set(newConfig);
    expect(config.get()).toEqual(overrideConfig(DEFAULT_CONFIG, newConfig));

    config.clear();
    expect(config.get()).toEqual(DEFAULT_CONFIG);
  });

  test("print()", () => {
    // Initialize
    const newConfig: ConfigType = {
      loadFile: "./test.json",
      fetchUrl: "https://example.com/test.json",
      quotedArguments: true,
      fallback: "no data",
      conditionFormat: "array",
    };

    config.set(newConfig);
    expect(config.get()).toEqual(overrideConfig(DEFAULT_CONFIG, newConfig));

    // Mock console.log
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    config.print();
    expect(logSpy).toHaveBeenCalledWith(newConfig);

    logSpy.mockRestore();
    config.clear();
  });

  test("load()", () => {
    const newConfigData = {
      fetchUrl: "https://example.com/test.json",
    };

    // Creating a new config file
    const configFilePath = "./tests/test2.json";
    writeFileSync(configFilePath, JSON.stringify(newConfigData, null, 2));

    // Load the config file
    config.load(configFilePath);

    expect(config.get()).toEqual(overrideConfig(DEFAULT_CONFIG, newConfigData));

    // Clean up
    unlinkSync(configFilePath);
  });
});
