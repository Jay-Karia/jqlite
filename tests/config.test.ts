import { expect, test, describe } from "vitest";
import { JQLite } from "../src/index";
import { Config } from "../src/types/config";
import { DEFAULT_CONFIG } from "../src/constants/";

/**
 * Override Config while initialization
 */
describe("Override Config", () => {
  test("should keep defaults for unspecified values", () => {
    const configs: Config[] = [
      {
        aliases: [
          {
            alias: "foo",
            path: "bar",
          },
        ],
      },
      {
        fallback: "baz",
      },
      {
        fuzzyDistance: 3,
        fuzzyLimit: 2,
      },
    ];

    const finalConfig: Config[] = [
      {
        aliases: configs[0].aliases,
        fallback: DEFAULT_CONFIG.fallback,
        fuzzyDistance: DEFAULT_CONFIG.fuzzyDistance,
        fuzzyLimit: DEFAULT_CONFIG.fuzzyLimit,
        fuzzyIgnoreCase: DEFAULT_CONFIG.fuzzyIgnoreCase,
      },
      {
        aliases: DEFAULT_CONFIG.aliases,
        fallback: configs[1].fallback,
        fuzzyDistance: DEFAULT_CONFIG.fuzzyDistance,
        fuzzyLimit: DEFAULT_CONFIG.fuzzyLimit,
        fuzzyIgnoreCase: DEFAULT_CONFIG.fuzzyIgnoreCase,
      },
      {
        aliases: DEFAULT_CONFIG.aliases,
        fallback: DEFAULT_CONFIG.fallback,
        fuzzyDistance: configs[2].fuzzyDistance,
        fuzzyLimit: configs[2].fuzzyLimit,
        fuzzyIgnoreCase: DEFAULT_CONFIG.fuzzyIgnoreCase,
      },
    ];

    configs.forEach((config, index) => {
      const jqlite = new JQLite(config);
      expect(jqlite.configManager.config).toEqual(finalConfig[index]);
    });
  });

  test("should only except valid config values", () => {
    const configs: Config[] = [
      {
        fuzzyDistance: -1,
        fuzzyLimit: -1,
      },
      {
        aliases: [
          {
            alias: "",
            path: "",
          },
        ],
      },
      {
        aliases: [
          {
            alias: "foo",
            path: "bar",
          },
          {
            alias: "foo",
            path: "bar",
          },
        ],
      },
    ];

    configs.forEach(config => {
      expect(() => new JQLite(config)).toThrowError();
    });
  });
});

/**
 * Get Config
 */
describe("Get Config", () => {
  test("should return the config object", () => {
    const jqlite = new JQLite();
    expect(jqlite.configManager.config).toEqual(DEFAULT_CONFIG);
  });

  test("should return the config object with aliases", () => {
    const jqlite = new JQLite({
      aliases: [{ alias: "foo", path: "bar" }],
    });

    expect(jqlite.configManager.config).toEqual({
      ...DEFAULT_CONFIG,
      aliases: [{ alias: "foo", path: "bar" }],
    });
  });

  test("should return the config object with a fallback", () => {
    const jqlite = new JQLite({
      fallback: "foo",
    });

    expect(jqlite.configManager.config).toEqual({
      ...DEFAULT_CONFIG,
      fallback: "foo",
    });
  });
});

/**
 * Add Alias
 */
describe("Add Alias", () => {
  test("should add an alias to the config object", () => {
    const jqlite = new JQLite();
    jqlite.configManager.addAlias("foo", "bar");
    expect(jqlite.configManager.config.aliases).toEqual([
      {
        alias: "foo",
        path: "bar",
      },
    ]);

    jqlite.configManager.clearAliases();
  });

  test("should throw an error if the alias is empty", () => {
    const jqlite = new JQLite();
    expect(() => jqlite.configManager.addAlias("", "bar")).toThrowError();
  });

  test("should throw an error if the path is empty", () => {
    const jqlite = new JQLite();
    expect(() => jqlite.configManager.addAlias("foo", "")).toThrowError();
  });

  test("should throw an error if the alias already exists", () => {
    const jqlite = new JQLite({
      aliases: [{ alias: "foo", path: "bar" }],
    });
    expect(() => jqlite.configManager.addAlias("foo", "baz")).toThrowError();
  });

  test("should throw an error if the path already exists", () => {
    const jqlite = new JQLite({
      aliases: [{ alias: "foo", path: "bar" }],
    });

    expect(() => jqlite.configManager.addAlias("baz", "bar")).toThrowError();
  });
});

/**
 * Remove Alias
 */
describe("Remove Alias", () => {
  test("should remove an alias from the config object", () => {
    const jqlite = new JQLite({
      aliases: [{ alias: "foo", path: "bar" }],
    });

    jqlite.configManager.removeAlias("foo");
    expect(jqlite.configManager.config.aliases).toEqual([]);
  });

  test("should throw an error if the aliases array is empty", () => {
    const jqlite = new JQLite();
    expect(() => jqlite.configManager.removeAlias("foo")).toThrowError();
  });

  test("should throw an error if the alias is not found", () => {
    const jqlite = new JQLite({
      aliases: [{ alias: "foo", path: "bar" }],
    });

    expect(() => jqlite.configManager.removeAlias("baz")).toThrowError();
  });

  test("should throw an error if the alias is empty", () => {
    const jqlite = new JQLite();
    expect(() => jqlite.configManager.removeAlias("")).toThrowError();
  });
});

/**
 * Clear Aliases
 */
describe("Clear Aliases", () => {
  test("should set the aliases array to null", () => {
    const jqlite = new JQLite();
    jqlite.configManager.clearAliases();
    expect(jqlite.configManager.config.aliases).toEqual([]);
  });
});

/**
 * Set Fallback
 */
describe("Set Fallback", () => {
  test("should set the fallback for the config object", () => {
    const jqlite = new JQLite();
    jqlite.configManager.setFallback("foo");
    expect(jqlite.configManager.config.fallback).toBe("foo");
  });

  test("should set the fallback to null", () => {
    const jqlite = new JQLite();
    jqlite.configManager.setFallback(null);
    expect(jqlite.configManager.config.fallback).toBeNull();
  });
});

/**
 * Fuzzy Config
 */
describe("Fuzzy Config", () => {
  test("should set the fuzzy distance", () => {
    const jqlite = new JQLite({
      fuzzyDistance: 3,
    });

    expect(jqlite.configManager.config.fuzzyDistance).toBe(3);
  });

  test("should set the fuzzy limit", () => {
    const jqlite = new JQLite({
      fuzzyLimit: 2,
    });

    expect(jqlite.configManager.config.fuzzyLimit).toBe(2);
  });

  test("should set the fuzzy ignore case", () => {
    const jqlite = new JQLite({
      fuzzyIgnoreCase: false,
    });

    expect(jqlite.configManager.config.fuzzyIgnoreCase).toBe(false);
  });

  test("should throw an error if the fuzzy distance is negative", () => {
    const jqlite = new JQLite();
    expect(() => jqlite.configManager.setFuzzyDistance(-1)).toThrowError();
  });

  test("should throw an error if the fuzzy limit is negative", () => {
    const jqlite = new JQLite();
    expect(() => jqlite.configManager.setFuzzyLimit(-1)).toThrowError();
  });
});

/**
 * Set Config
 */
describe("Set Config", () => {
  test("should set the config object", () => {
    const jqlite = new JQLite();
    jqlite.configManager.set({
      aliases: [{ alias: "foo", path: "bar" }],
      fallback: "baz",
      fuzzyDistance: 3,
      fuzzyLimit: 2,
      fuzzyIgnoreCase: false,
    });

    expect(jqlite.configManager.config).toEqual({
      aliases: [{ alias: "foo", path: "bar" }],
      fallback: "baz",
      fuzzyDistance: 3,
      fuzzyLimit: 2,
      fuzzyIgnoreCase: false,
    });
  });

  test("should throw an error if the config object is invalid", () => {
    const jqlite = new JQLite();
    expect(() =>
      jqlite.configManager.set({ fuzzyDistance: -1 })
    ).toThrowError();
    expect(() => jqlite.configManager.set({ fuzzyLimit: -2 })).toThrowError();
  });

  test("should override only the specified values", () => {
    const jqlite = new JQLite({
      aliases: [{ alias: "foo", path: "bar" }],
      fallback: "baz",
      fuzzyDistance: 3,
      fuzzyLimit: 2,
      fuzzyIgnoreCase: false,
    });

    jqlite.configManager.set({
      aliases: [{ alias: "baz", path: "foo" }],
    });

    expect(jqlite.configManager.config).toEqual({
      aliases: [{ alias: "baz", path: "foo" }],
      fallback: "baz",
      fuzzyDistance: 3,
      fuzzyLimit: 2,
      fuzzyIgnoreCase: false,
    });
  });
});

/**
 * Reset Config
 */
describe("Reset Config", () => {
  test("should reset the config object to the default config object", () => {
    const jqlite = new JQLite({
      aliases: [{ alias: "foo", path: "bar" }],
      fallback: "baz",
      fuzzyDistance: 3,
      fuzzyLimit: 2,
      fuzzyIgnoreCase: false,
    });

    jqlite.configManager.reset();
    expect(jqlite.configManager.config).toEqual(DEFAULT_CONFIG);
  });
});
