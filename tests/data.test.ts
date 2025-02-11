import { expect, test, describe } from "vitest";
import { JQLite } from "../src/index";

/**
 * Data Validation while initialization
 */
describe("Data Validation while init", () => {
  test("should expect data to be empty object if not provided", () => {
    const jqlite = new JQLite();
    expect(jqlite.data).toEqual({});
  });

  test("should not accept invalid JSON data", () => {
    let jqlite: JQLite;

    expect(() => {
      jqlite = new JQLite({}, "invalid-json");
      expect(jqlite.data).toEqual({});
    }).toThrowError();
  });

  test("should not accept invalid JSON file path", () => {
    let jqlite: JQLite;

    expect(() => {
      jqlite = new JQLite({}, "invalid-path");
      expect(jqlite.data).toEqual({});
    }).toThrowError();

    expect(() => {
      jqlite = new JQLite({}, "./src/index.ts");
      expect(jqlite.data).toEqual({});
    }).toThrowError();
  });

  test("should accept valid JSON data", () => {
    const jqlite = new JQLite(
      {},
      JSON.stringify({
        key: "value",
      })
    );
    expect(jqlite.data).toEqual(
      JSON.stringify({
        key: "value",
      })
    );
  });

  test("should accept valid JSON file path", () => {
    const jqlite = new JQLite({}, "./tests/data.json");
    expect(jqlite.data).toEqual(
      JSON.stringify({
        hello: "world",
      })
    );
  });
});

/**
 * Set Data
 */
describe("Set Data", () => {
  test("should set the data", () => {
    const jqlite = new JQLite();
    jqlite.setData(JSON.stringify({ key: "value" }));
    expect(jqlite.data).toEqual(
      JSON.stringify({
        key: "value",
      })
    );
  });

  test("should not accept invalid JSON data", () => {
    const jqlite = new JQLite();
    expect(() => {
      jqlite.setData("invalid-json");
      expect(jqlite.data).toEqual({});
    }).toThrowError();
  });

  test("should not accpet invalid JSON file path", () => {
    const jqlite = new JQLite();
    expect(() => {
      jqlite.setData("invalid-path");
      expect(jqlite.data).toEqual({});
    }).toThrowError();

    expect(() => {
      jqlite.setData("./src/index.ts");
      expect(jqlite.data).toEqual({});
    }).toThrowError();
  });

  test("should accept valid JSON data", () => {
    const jqlite = new JQLite();
    jqlite.setData(
      JSON.stringify({
        key: "value",
      })
    );
    expect(jqlite.data).toEqual(
      JSON.stringify({
        key: "value",
      })
    );
  });

  test("should accept valid JSON file path", () => {
    const jqlite = new JQLite();
    jqlite.setData("./tests/data.json");
    expect(jqlite.data).toEqual(
      JSON.stringify({
        hello: "world",
      })
    );
  });

  test("should overwrite the existing data", () => {
    const jqlite = new JQLite({}, JSON.stringify({ key: "value" }));
    jqlite.setData(
      JSON.stringify({
        hello: "world",
      })
    );
    expect(jqlite.data).toEqual(
      JSON.stringify({
        hello: "world",
      })
    );
  });
});

/**
 * Clear Data
 */
describe("Clear Data", () => {
  test("should clear the data", () => {
    const jqlite = new JQLite();
    jqlite.setData(
      JSON.stringify({
        key: "value",
      })
    );
    jqlite.clearData();
    expect(jqlite.data).toEqual({});
  });

  test("should clear the data if not set", () => {
    const jqlite = new JQLite();
    jqlite.clearData();
    expect(jqlite.data).toEqual({});
  });
});
