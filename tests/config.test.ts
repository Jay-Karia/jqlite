/**
 * @fileoverview Config tests.
 * @author Jay-Karia
 */

"use strict";

//===================================IMPORTS===================================

import type { ConfigType } from "../src/config/types";
import { expect, test, describe, vi } from "vitest";
import { config } from "../src/index";
import { DEFAULT_CONFIG } from "../src/config/defaults";
import { unlinkSync, writeFileSync } from "fs";
import { overrideConfig } from "../src/config/utils";

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

    // Load a non JSON file
    const invalidConfigFilePath = "./tests/test2.txt";
    writeFileSync(invalidConfigFilePath, "This is not a JSON file");

    expect(() => config.load(invalidConfigFilePath)).toThrowError();
    unlinkSync(invalidConfigFilePath);
  });

  test("Config values", () => {
    // loadFile, fetchUrl, fallback
    const invalidStringValues = [101, true, {}, []];

    // quotedArguments
    const invalidBooleanValues = [101, "string", {}, []];

    // conditionFormat
    const invalidConditionFormatValues = [101, "string", true, [], "arr", "obj"];

    // String values
    invalidStringValues.forEach(value => {
      const loadFileConfig = {
        loadFile: value as any,
      };
      const fetchUrlConfig = {
        fetchUrl: value as any,
      };

      const fallbackConfig = {
        fallback: value as any,
      };

      expect(() => config.set(loadFileConfig)).toThrowError();
      expect(() => config.set(fetchUrlConfig)).toThrowError();
      expect(() => config.set(fallbackConfig)).toThrowError();
    });

    // Boolean values
    invalidBooleanValues.forEach(value => {
      const quotedArgumentsConfig = {
        quotedArguments: value as any,
      };

      expect(() => config.set(quotedArgumentsConfig)).toThrowError();
    });

    // conditionFormat values
    invalidConditionFormatValues.forEach(value => {
      const conditionFormatConfig = {
        conditionFormat: value as any,
      };

      expect(() => config.set(conditionFormatConfig)).toThrowError();
    });

  });
});
