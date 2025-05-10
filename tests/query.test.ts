/**
 * @fileoverview Query evaluation tests.
 * @author Jay-Karia
 */

"use strict";

//===================================IMPORTS===================================

import { expect, test, describe } from "vitest";
import { data, query } from "../src/index";

//=============================================================================

describe("Basic Selection", () => {
  // Load the testing JSON data
  data.load("tests/test-data.json");


  test("Root Selector", () => {
    query.run("$");
    expect(query.result).toEqual(data.get());
  });

  test("Should select a single property", () => {
    query.run("$.metadata");
    expect(query.result).toEqual({
      "lastUpdated": "2023-11-15T14:30:00Z",
      "version": "2.1.0",
      "debug": false,
      "notes": null,
      "tags": [
        "demo",
        "sample",
        "full",
        "demo"
      ]
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

  test("Root array selection", () => {
    const jsonData = [120, 150, 200, 250, 300];
    data.set(JSON.stringify(jsonData));
    query.run("$[1]");
    expect(query.result).toEqual(150);
  });
});
