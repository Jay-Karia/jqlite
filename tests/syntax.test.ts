/**
 * @fileoverview Syntax tests.
 * @author Jay-Karia
 */

"use strict";

//===================================IMPORTS===================================

import { expect, test, describe } from "vitest";
import { query } from "../src/index";

//=============================================================================

describe("Syntax", () => {
  test("valid syntax", () => {
    const validQueries = [
      // Basic Selection
      "$.me.name",
      "$.friends[0]",
      "$.friends[0].name",
      "$.friends[-1]",
      "$.friends[0][1]",
      "$.friends[0][1].name",
      "$.friends[0][1].name[0]",
      "$.users[1].employees[2].game",
      "$[1]",
      "$[0].name",
      // Fallback
      "$.games.favorite ?? No favorite game",
      "$.games.favorite ?? 'No favorite game'",
      "$.games.favorite ?? \"No favorite game\"",
      "$.games.favorite ?? 123",
      "$.games.favorite ?? '123'",
      "$.games.favorite ?? ",
      "$.games.favorite ??  ",
      "$.games.favorite??  ",
      "$.games.favorite?? ",
      // Wildcard
      "$.friends[*].name",
      "$[*]",
      "$.friends[*]",
      // Slices
      // Multiple Selection
      // Omission
      // Functions
      // Comparison operators
      // Conditions
    ];

    validQueries.forEach((queryString) => {
      expect(() => {
        query.validate(queryString);
      }).not.toThrow();
    });
  });

  test("invalid syntax", () => {
    const invalidQueries = [
      // Basic Selection
      "$.me.name.",
      "$.me.123",
      "$.me.[age]",
      "$.me.[1",
      "$.me.name.[1]",
      ".friends[]",
      "$friends[]",
      "$.users[0]name",
      "$users[0]name",
      "$.users[0].name.",
      // Fallback
      "$.games.favorite??",
      "$.games.favorite ?",
      "$.games.favorite ??",
      "$.games.favorite ??",
      // Wildcard
      "$.friends[*.name",
      "$.friends.*.name",
      "$.friends.*].name",
      "$.friends[]*].name",
      "$.friends.[*].name",
      "$.friends*.name",
      "$*",
      "$.*",
      "$.[*]",
      // Slices
      // Multiple Selection
      // Omission
      // Functions
      // Comparison operators
      // Conditions
    ];
    invalidQueries.forEach((queryString) => {
      expect(() => {
        query.validate(queryString);
      }).toThrow();
    });
  });
});
