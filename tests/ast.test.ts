/**
 * @fileoverview AST Tests
 * @author Jay-Karia
 */

"use strict";

//===================================IMPORTS===================================

import { expect, test, describe } from "vitest";
import { ast } from "src/ast/ast";
import { data, query } from "src";

//=============================================================================

// Load the data
await data.fetch("https://jqlite.vercel.app/demo.json");

describe("AST", () => {
  test("preOrder()", () => {
    const queries = ["$", "$.user", "$.orders[0]"];

    const preOrder = [
      [
        {
          type: "Root",
        },
      ],
      [
        {
          children: [],
          type: "Root",
        },
        {
          propertyName: "user",
          type: "Property",
        },
      ],
      [
        {
          children: [],
          type: "Root",
        },
        {
          children: [],
          propertyName: "orders",
          type: "Property",
        },
        {
          index: 0,
          type: "ArrayAccess",
        },
      ],
    ];

    queries.forEach((queryString, index) => {
      query.run(queryString);
      expect(ast.preOrder()).toStrictEqual(preOrder[index]);
    });
  });

  test("toJSON()", () => {
    const queries = ["$", "$.user", "$.orders[0]", "$.user.name.#length()", "$.user.age > 30"];

    const expectedJson = [
      JSON.stringify({
        type: "Root",
      }),

      JSON.stringify({
        type: "Root",
        children: [
          {
            type: "Property",
            propertyName: "user",
          },
        ],
      }),

      JSON.stringify({
        type: "Root",
        children: [
          {
            type: "Property",
            children: [
              {
                type: "ArrayAccess",
                index: 0,
              },
            ],
            propertyName: "orders",
          },
        ],
      }),

      JSON.stringify({
        type: "Root",
        children: [
          {
            type: "Property",
            propertyName: "user",
          },
          {
            type: "Property",
            propertyName: "name",
          },
          {
            type: "Function",
            functionName: "length",
            functionCategory: "string",
            functionArgs: [],
          },
        ],
      }),

      JSON.stringify({
        type: "Root",
        children: [
          {
            type: "Property",
            propertyName: "user",
          },
          {
            type: "Property",
            propertyName: "age",
          },
          {
            type: "Comparison",
            comparisonOperator: ">",
            comparisonValue: 30,
          },
        ],
      })
    ];

    queries.forEach((queryString, index) => {
      query.run(queryString);
      expect(ast.toJSON()).toEqual(expectedJson[index]);
    });
  });
});
