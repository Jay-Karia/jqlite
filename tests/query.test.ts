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

  test("Left slice", () => {
    query.run("$.stats.visitors[2:]");
    expect(query.result).toEqual([1900, 1832, 2100, 1920, 1850]);

    query.run("$.stats.visitors[1:]");
    expect(query.result).toEqual([1542, 1900, 1832, 2100, 1920, 1850]);

    query.run("$.stats.visitors[0:]");
    expect(query.result).toEqual([1020, 1542, 1900, 1832, 2100, 1920, 1850]);
  });

  test("Right slice", () => {
    query.run("$.stats.visitors[:2]");
    expect(query.result).toEqual([1020, 1542]);

    query.run("$.stats.visitors[:1]");
    expect(query.result).toEqual([1020]);

    query.run("$.stats.visitors[:0]");
    expect(query.result).toEqual([1020, 1542, 1900, 1832, 2100, 1920, 1850]);
  });

  test("Full slice", () => {
    query.run("$.stats.visitors[2:4]");
    expect(query.result).toEqual([1900, 1832]);
  });

  test("Negative slice", () => {
    query.run("$.stats.visitors[-2:]");
    expect(query.result).toEqual([1920, 1850]);

    query.run("$.stats.visitors[:-2]");
    expect(query.result).toEqual([1020, 1542, 1900, 1832, 2100]);

    query.run("$.stats.visitors[-4:-1]");
    expect(query.result).toEqual([1832, 2100, 1920]);
  });

  test("Should not accept step in slice", () => {
    expect(() => {
      query.run("$.products[::2]");
    }).toThrowError();
  });

  test("Multiple slice", () => {
    query.run("$.products[0:1][0].reviews[0:2]");
    expect(query.result).toEqual([4, 5]);

    query.run("$.products[:1][0].reviews[:2]");
    expect(query.result).toEqual([4, 5]);

    query.run("$.products[1:][0].reviews[:2]");
    expect(query.result).toEqual([5, 5]);

    query.run("$.products[1:][0].reviews[2:]");
    expect(query.result).toEqual([4, 3, 5]);

    query.run("$.products[0:1][0].reviews[-2:]");
    expect(query.result).toEqual([5, 4]);

    query.run("$.products[0:1][0].reviews[-2:-1]");
    expect(query.result).toEqual([5]);
  });
});

/**
 * Tests for multiple key selection
 */
describe("Multiple Key Selection", () => {
  test("Should select multiple keys", () => {
    query.run("$.user.(name, age)");
    expect(query.result).toEqual({
      name: "John Doe",
      age: 32,
    });
  });

  test("Should select multiple keys with wildcard", () => {
    query.run("$.products[*].(id, name)");
    expect(query.result).toEqual({
      id: ["p1", "p2"],
      name: ["Laptop Pro", "Desktop Ultra"],
    });
  });

  test("Should not accept empty key selection", () => {
    expect(() => {
      query.run("$.products.()");
    }).toThrowError();
  });

  test("Should not accept nested key selection", () => {
    expect(() => {
      query.run("$.user.(name, address.street)");
    }).toThrowError();
  });

  test("Should not accept array access in key selection", () => {
    expect(() => {
      query.run("$.products.(id[0], name)");
    }).toThrowError();
  });

  test("Should throw an error if any one key is not found", () => {
    expect(() => {
      query.run("$.user.(name, nonExistentKey)");
    }).toThrowError();

    expect(() => {
      query.run("$.products.(none, nonExistentKey)");
    }).toThrowError();
  });
});

/**
 * Tests for key omission
 */
describe("Key Omission", () => {
  test("Should omit a single key", () => {
    query.run("$.metadata.!tags");
    expect(query.result).toEqual({
      lastUpdated: "2023-11-15T14:30:00Z",
      version: "2.1.0",
      debug: false,
      notes: null,
    });
  });

  test("Should omit multiple keys", () => {
    query.run("$.metadata.!(tags, lastUpdated)");
    expect(query.result).toEqual({
      version: "2.1.0",
      debug: false,
      notes: null,
    });
  });

  test("Nested single key omission", () => {
    query.run("$.user.!address.!skills");
    expect(query.result).toEqual({
      name: "John Doe",
      age: 32,
      email: "john.doe@example.com",
      isActive: true,
      tags: ["developer", "javascript", "typescript"],
    });
  });

  test("Nested multiple key omission", () => {
    query.run("$.user.!(name, age).!(address, skills)");
    expect(query.result).toEqual({
      isActive: true,
      email: "john.doe@example.com",
      tags: ["developer", "javascript", "typescript"],
    });
  });

  test("Should not throw an error if key is not found", () => {
    query.run("$.metadata.!nonExistentKey");
    expect(query.result).toEqual({
      lastUpdated: "2023-11-15T14:30:00Z",
      version: "2.1.0",
      debug: false,
      notes: null,
      tags: ["demo", "sample", "full", "demo"],
    });
  });
});

/**
 * Tests for functions
 */
describe("Functions", () => {
  test("Should throw an error if function is not found", () => {
    expect(() => {
      query.run("$.user.name.#toUpperCase()");
    }).toThrowError();
  });

  test("Numeric array functions", () => {
    // min
    query.run("$.stats.visitors.#min()");
    expect(query.result).toEqual(1020);

    // max
    query.run("$.stats.visitors.#max()");
    expect(query.result).toEqual(2100);

    // avg
    query.run("$.stats.visitors.#avg()");
    expect(query.result).toEqual(1737.7142857142858);

    // sum
    query.run("$.stats.visitors.#sum()");
    expect(query.result).toEqual(12164);
  });

  test("Array functions", () => {
    // count
    query.run("$.products.#count()");
    expect(query.result).toEqual(2);

    // sort
    query.run("$.products.#sort()");
    expect(query.result).toEqual([
      {
        id: "p1",
        name: "Laptop Pro",
        price: 1299.99,
        inStock: true,
        specs: {
          cpu: "i7",
          ram: "16GB",
          storage: "512GB SSD",
        },
        reviews: [4, 5, 3, 5, 4],
      },
      {
        id: "p2",
        name: "Desktop Ultra",
        price: 1599.99,
        inStock: false,
        specs: {
          cpu: "i9",
          ram: "32GB",
          storage: "1TB SSD",
        },
        reviews: [5, 5, 4, 3, 5],
      },
    ]);

    query.run("$.stats.visitors.#sort()");
    expect(query.result).toEqual([1020, 1542, 1832, 1850, 1900, 1920, 2100]);

    query.run("$.stats.visitors.#sort(asc)");
    expect(query.result).toEqual([1020, 1542, 1832, 1850, 1900, 1920, 2100]);

    query.run("$.stats.visitors.#sort(desc)");
    expect(query.result).toEqual([2100, 1920, 1900, 1850, 1832, 1542, 1020]);

    // reverse
    query.run("$.products.#reverse()");
    expect(query.result).toEqual([
      {
        id: "p2",
        name: "Desktop Ultra",
        price: 1599.99,
        inStock: false,
        specs: {
          cpu: "i9",
          ram: "32GB",
          storage: "1TB SSD",
        },
        reviews: [5, 5, 4, 3, 5],
      },
      {
        id: "p1",
        name: "Laptop Pro",
        price: 1299.99,
        inStock: true,
        specs: {
          cpu: "i7",
          ram: "16GB",
          storage: "512GB SSD",
        },
        reviews: [4, 5, 3, 5, 4],
      },
    ]);

    // unique
    query.run("$.products[0].reviews.#unique()");
    expect(query.result).toEqual([5, 4, 3]);
  });

  test("String functions", () => {
    // contains
    query.run("$.user.name.#contains('John')");
    expect(query.result).toEqual(true);

    expect(() => {
      query.run("$.user.name.#contains(John)");
    }).toThrowError();

    query.run("$.user.name.#contains('Jane')");
    expect(query.result).toEqual(false);

    // length
    query.run("$.user.name.#length()");
    expect(query.result).toEqual(8);

    // substring
    query.run("$.user.name.#substring(0, 4)");
    expect(query.result).toEqual("John");

    query.run("$.user.name.#substring(5, 8)");
    expect(query.result).toEqual("Doe");

    // upper
    query.run("$.user.name.#upper()");
    expect(query.result).toEqual("JOHN DOE");

    // lower
    query.run("$.user.name.#lower()");
    expect(query.result).toEqual("john doe");

    // equals
    query.run("$.user.name.#equals('John Doe')");
    expect(query.result).toEqual(true);
  });

  test("Boolean functions", () => {

  });

  test("Quoted string arguments", () => {

  });
});
