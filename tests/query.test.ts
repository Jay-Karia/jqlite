/**
 * @fileoverview Query evaluation tests.
 * @author Jay-Karia
 */

"use strict";

//===================================IMPORTS===================================

import { expect, test, describe } from "vitest";
import { config, data, query } from "../src/index";

//=============================================================================

await data.fetch("https://jqlite.vercel.app/demo.json");

/**
 * Tests for basic selection feature
 */
describe("Basic Selection", () => {
  test("Root Selector", () => {
    query.run("$");
    expect(query.result).toEqual(data.get());
  });

  test("Should select a single property", () => {
    query.run("$.metadata");
    expect(query.result).toEqual({
      lastUpdated: "2023-11-15T14:30:00Z",
      version: "2.1.0",
      debug: false,
      notes: null,
      tags: ["demo", "sample", "full", "demo"],
    });
  });

  test("Should select a nested property", () => {
    query.run("$.metadata.version");
    expect(query.result).toEqual("2.1.0");
  });

  test("Should select an array element", () => {
    query.run("$.user.tags[0]");
    expect(query.result).toEqual("developer");
  });

  test("Should select a nested array element", () => {
    query.run("$.products[0].reviews[1]");
    expect(query.result).toEqual(5);
  });

  test("Root array selection", async () => {
    const jsonData = [120, 150, 200, 250, 300];
    data.set(JSON.stringify(jsonData));
    query.run("$[1]");
    expect(query.result).toEqual(150);
    await data.fetch("https://jqlite.vercel.app/demo.json");
  });
});

/**
 * Tests for fallback feature
 */
describe("Fallback", () => {
  test("Should return null for nullish values", () => {
    query.run("$.metadata.notes ?? No notes found");
    expect(query.result).toEqual(null);
  });

  test("Should return the value if it exists", () => {
    query.run("$.metadata.version ?? No version found");
    expect(query.result).toEqual("2.1.0");
  });

  test("Should return the fallback value if the property is undefined", () => {
    query.run("$.metadata.nonExistentProperty ?? Default Value");
    expect(query.result).toEqual("Default Value");
  });

  test("Should throw an error if fallback value is not provided", () => {
    expect(() => {
      query.run("$.metadata.nonExistentProperty");
    }).toThrowError();
  });

  test("Should use config fallback value if provided", () => {
    config.set({
      fallback: "Config Fallback Value",
    });
    query.run("$.metadata.nonExistentProperty");
    expect(query.result).toEqual("Config Fallback Value");
  });

  test("Should overwrite config fallback value with query fallback", () => {
    query.run("$.metadata.nonExistentProperty ?? Query Fallback Value");
    expect(query.result).toEqual("Query Fallback Value");
    config.clear();
  });
});

/**
 * Tests for wildcard feature
 */
describe("Wildcard", () => {
  test("Should throw an error if not an array of objects", () => {
    expect(() => {
      query.run("$.user.tags[*]");
    }).toThrowError();
  });

  test("Root wildcard selection", async () => {
    const jsonData = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
      { name: "Doe", age: 40 },
    ];
    data.set(JSON.stringify(jsonData));

    query.run("$[*]");
    expect(query.result).toEqual({
      name: ["John", "Jane", "Doe"],
      age: [30, 25, 40],
    });

    await data.fetch("https://jqlite.vercel.app/demo.json");
  });

  test("Wildcard property selection", () => {
    query.run("$.products[*].id");
    expect(query.result).toEqual(["p1", "p2"]);
  });

  test("Wildcard nested property selection", () => {
    query.run("$.orders[*].items[0][*].price");
    expect(query.result).toEqual([1299.99, 1599.99]);
  });
});

/**
 * Tests for Array Slices
 */
describe("Array Slices", () => {
  test("Should not accept empty slice", () => {
    expect(() => {
      query.run("$.products[:]");
    }).toThrowError();
  });

  test("Should accept left slice", () => {
    query.run("$");
    // expect(query.result).toEqual([ 1900, 1832, 2100, 1920, 1850 ]);
  });
});
