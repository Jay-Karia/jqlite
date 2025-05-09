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
      '$.games.favorite ?? "No favorite game"',
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
      "$.nested[*][*]",
      // Slices
      "$.products[0:1]",
      "$.products[0:2]",
      "$.products[:2]",
      "$.products[1:]",
      "$.products[-2:]",
      "$.products[:-1]",
      "$.products[-3:-1]",
      "$.stats.visitors[2:5]",
      // Multiple Selection
      "$.user.(name, email)",
      "$.products[0].(name, price)",
      "$.stats.(visitors, revenue)",
      "$.address.(street, city, zip)",
      "$.products[*].(name, price, inStock)",
      // Omission
      "$.user.!password",
      "$.user.!(password, secretKey)",
      "$.products[0].!(reviews, specs.details)",
      "$.settings.!(credentials, apiKeys)",
      "$.products[*].!(description, manufacturerId)",
      // Functions
      "$.stats.visitors.#min()",
      "$.stats.visitors.#max()",
      "$.stats.visitors.#avg()",
      "$.stats.visitors.#sum()",
      "$.stats.visitors.#count()",
      '$.products.#sort("asc")',
      '$.products.#sort("desc")',
      "$.products.#sort()",
      "$.products.#reverse()",
      "$.metadata.tags.#unique()",
      "$.stats.visitors.#contains(1900)",
      "$.stats.visitors.#contains('ab')",
      "$.user.name.#length()",
      "$.user.name.#substring(0, 4)",
      "$.user.name.#upper()",
      "$.user.name.#lower()",
      '$.user.name.#equals("J")',
      // Comparison operators
      "$.user.age > 30",
      "$.user.age >= 32",
      "$.user.age < 40",
      "$.user.age <= 32",
      "$.user.age == 32",
      "$.user.age != 30",
      // Conditions
      "$.friends[?(@.age > 30)]",
      "$.scores[?(@ > 30)]",
      "$.friends[?(@.(name, age))]",
      "$.friends[?(@.!(name, age))]",
      "$.friends[?(@.hobbies[1].#contains('sports'))]",
      "$.friends[?(@.hobbies[*])]",
      "$.friends[?(@.hobbies[:1])]",
      "$.friends[?(@.hobbies[:1])]",
      "$.friends[?((@.age > 30) && (@.level == 12))]",
      "$.friends[?( (@.age > 30) && (@.level == 12) )]",
      "$.friends[?(  (@.age > 30) && (@.level == 12)  )]",
      "$.friends[?( (@.age > 30) && (@.level == 12) || (@.level == 5) && (@.age > 50) )]",
      "$.friends[?( (@.age > 30) && (@.level == 12) || (@.level == 5) && (@.age > 50) ) ]",
    ];

    validQueries.forEach(queryString => {
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
      "$.products[:]",
      "$.products[0,5]",
      "$.products[0-5]",
      "$.products[0..5]",
      "$.products[a:b]",
      "$.products[0:b]",
      "$.products[a:5]",
      "$.products[::]",
      "$.products[0:5:2]",
      "$.products[0:5",
      "$.products0:5]",
      // Multiple Selection
      "$.products.()",
      "$.products.(",
      "$.products.)",
      "$.products.(name",
      "$.products.name)",
      "$.products.(name,,price)",
      "$.products.(name price)",
      "$.products.(name.)",
      "$.products.(.name)",
      "$.products.(name..price)",
      "$.products.(name, price.amount)",
      "$.products.(name,price)",
      "$.products.( name, price)",
      "$.products.(name, price )",
      "$.products.(name , price)",
      "$.products.(name, price.(name, price))",
      // Omission
      "$.products.!)",
      "$.products.!(name",
      "$.products.(name)!",
      "$.products.!(name,,price)",
      "$.products.!name.price",
      "$.products.!!name",
      "$.products.!(name!)",
      "$.products.!()",
      // Functions
      "$.stats.visitors.#min(12)",
      "$.stats.visitors.#max(2)",
      "$.stats.visitors.#avg(3)",
      "$.stats.visitors.#sum('12')",
      "$.stats.visitors.#count(12)",
      '$.products.#sort("a")',
      '$.products.#sort("d")',
      "$.products.#reverse('', 12)",
      "$.metadata.tags.#unique(0, 1)",
      "$.stats.visitors.#contains(1900, 120)",
      "$.stats.visitors.#contains('ab', 'cd')",
      "$.user.name.#length(0)",
      "$.user.name.#substring(0, 4, 4)",
      "$.user.name.#substring(2)",
      "$.user.name.#upper('case')",
      "$.user.name.#lower('case', 12)",
      "$.user.name.#equals(\"J')",
      '$.user.name.#equals("J)',
      '$.user.name.#equals(")',
      '$.user.name.#equals(J")',
      '$.user.name.contains("J")',
      "$.user.name.#max",
      "$.user.name.#max(",
      "$.user.name.#max)",
      "$.user.name.#substring(1,)",
      "$.user.name.#substring(1,2)",
      "$.user.name.#substring( 1, 2)",
      "$.user.name.#substring(1, 2 )",
      "$.user.name.#substring( 1 , 2 )",
      // Comparison operators
      "$.user.age = 30",
      "$.user.age => 30",
      "$.user.age =< 30",
      "$.user.age === 30",
      "$.user.age !== 30",
      "$.user.age > > 30",
      "$.user.age >> 30",
      "$.user.age >",
      "$.user.age < > 30",
      "$.user.age <=> 30",
      "$.user.name == Jay",
      "$.user.name != null",
      // Conditions
      "$.friends[?(@.age ! 30)]",
      "$.friends[?(!(@.age == 30))]",
      "$.friends[?(@.age == 'Jay')]",
      "$.friends[? (@.age == 'Jay')]",
      "$.friends[ ?(@.age == 'Jay')]",
      "$.friends[?()]",
      "$.friends[?( (@.age ! 30)&& (@.level == 12)) ]",
      "$.friends[?(@.age ! 30) &&(@.level == 12)]",
      "$.friends[?(@.age ! 30 &&@.level == 12)]",
      "$.friends[?( @.age ! 30) && (@.level == 12)) ]",
      "$.friends[?( (@.age ! 30) && (@.level == 12) ]",
      "$.friends[?( (@.age ! 30&& (@.level == 12)) ]",
      "$.friends[?( (@.age ! 30)&& @.level == 12)) ]",
      "$.friends[?( (@.age ! 30) && (@.level == 12) || ()) ]",
    ];
    invalidQueries.forEach(queryString => {
      expect(() => {
        query.validate(queryString);
      }).toThrow();
    });
  });
});
