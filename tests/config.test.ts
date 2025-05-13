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
  test("Default config", () => {
    // Initialize
    expect(config.get()).toEqual(DEFAULT_CONFIG);
  });

  test("Override", () => {
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

    // Invalid config
    const invalidConfig: any = {
      loadFile: 101,
      fetchUrl: true,
      quotedArguments: {},
      fallback: [],
      conditionFormat: "arr",
    };
    expect(() => config.set(invalidConfig)).toThrowError();
    expect(config.get()).toEqual(DEFAULT_CONFIG);
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

    // Load a non-existing file
    const nonExistingFilePath = "./tests/non-existing.json";
    expect(() => config.load(nonExistingFilePath)).toThrowError();

    // Load an invalid config file
    const invalidConfigFilePath2 = "./tests/test3.json";
    const invalidConfigData = {
      loadFile: 101,
      fetchUrl: true,
      quotedArguments: {},
      fallback: [],
      conditionFormat: "arr",
    };
    writeFileSync(invalidConfigFilePath2, JSON.stringify(invalidConfigData, null, 2));

    expect(() => config.load(invalidConfigFilePath2)).toThrowError();
    unlinkSync(invalidConfigFilePath2);
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

  test("Extra keys", () => {
    const newConfig = {
      loadFile: "./test.json",
      fetchUrl: "https://example.com/test.json",
      extraKey: "extraValue",
    };

    expect(() => config.set(newConfig)).toThrowError();

    // Load from a file
    const configFilePath = "./tests/test3.json";
    const configData = {
      loadFile: "./test.json",
      fetchUrl: "https://example.com/test.json",
      extraKey: "extraValue",
    };
    writeFileSync(configFilePath, JSON.stringify(configData, null, 2));

    expect(() => config.load(configFilePath)).toThrowError();
    unlinkSync(configFilePath);
  });

  test("overrideConfig()", () => {
    const nestedObject = {
      key1: "value1",
      key2: {
        key3: "value3",
        key4: "value4",
      },
    };
    const overrideObject = {
      key2: {
        key4: "newValue4",
      },
    };

    const newObject = overrideConfig<any>(nestedObject, overrideObject);
    expect(newObject).toEqual({
      key1: "value1",
      key2: {
        key3: "value3",
        key4: "newValue4",
      },
    });
  });
});
