import { expect, test, describe, vi } from "vitest";
import { data } from "../src/index";
import { unlinkSync, writeFileSync } from "fs";

describe("DataManager", () => {
  test("get()", () => {
    // Initialize
    expect(data.get()).toBeNull();
  });

  test("set()", () => {
    // Valid JSON Data
    const newData = {
      name: "test",
      age: 30,
    };

    data.set(newData);
    expect(data.get()).toEqual(newData);

    // Invalid JSON Data
    const invalidData = "{ name: test, age: 30 }";
    expect(() => {
      data.set(invalidData);
    }).toThrowError();
  });

  test("clear()", () => {
    // Initialize
    const newData = {
      name: "test",
      age: 30,
    };

    data.set(newData);
    expect(data.get()).toEqual(newData);

    data.clear();
    expect(data.get()).toBeNull();
  });

  test("print()", () => {
    // Initialize
    const newData = {
      name: "test",
      age: 30,
    };

    data.set(newData);
    expect(data.get()).toEqual(newData);

    // Mock console.log
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    data.print();
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(newData, null, 2));

    logSpy.mockRestore();
  });

  // Problems in formatting
  test("load()", () => {
    const fileData = JSON.stringify({
      name: "test",
      age: 30,
    });

    // Create a mock file
    const filePath = "./tests/test.json";
    writeFileSync(filePath, fileData);

    // Load data from that file
    data.load(filePath);
    expect(data.get()).toEqual(JSON.parse(fileData));

    // Clean up
    unlinkSync(filePath);
  });

  test("fetch()", async () => {
    // Mock fetch
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    const response = await data.fetch(url);

    // Check if data is set in memory
    expect(data.get()).toEqual(response);

    // Invalid URL
    const invalidUrl = "invalid-url";
    await expect(async () => {
      await data.fetch(invalidUrl);
    }).rejects.toThrowError();

    // No URL provided
    await expect(async () => {
      await data.fetch();
    }).rejects.toThrowError();
  });
});
