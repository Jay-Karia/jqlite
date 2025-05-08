/**
 * @fileoverview Syntax tests.
 * @author Jay-Karia
 */

"use strict";

//===================================IMPORTS===================================

import { expect, test, describe, vi } from "vitest";
import { query } from "../src/index";

//=============================================================================

describe("Syntax", () => {
  test("valid syntax", () => {
    const validQueries = [
      "$.me.name",
      "$.friends[0]",
      "$.friends[0].name",
      "$.friends[-1]",
      "$.friends[0][1]",
      "$.friends[0][1].name",
      "$.friends[0][1].name[0]",
      "$.games.favorite ?? No favorite game",
      "$.friends[*].name"
    ]

    validQueries.forEach((queryString) => {
      expect(() => {
        query.validate(queryString);
      }).not.toThrow();
    })
  });

  test("invalid syntax", () => {
    const invalidQueries = [
      "$.me.name.",
      "$.me.123",
      "$.me.[age]",
      "$.me.[1",
      "$.me.name.[1]",
      ".friends[]"
    ]
    invalidQueries.forEach((queryString) => {
      expect(() => {
        query.validate(queryString);
      }).toThrow();
    })
  });
});
