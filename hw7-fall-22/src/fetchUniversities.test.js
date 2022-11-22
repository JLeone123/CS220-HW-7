import assert from "node:assert";
import { fetchUniversities } from "./fetchUniversities.js";

test("fetchUniversities follows type specification", () => {
  const promise = fetchUniversities("University of Massachusetts Amherst");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(Array.isArray(result)); // Assert the result in an array
    assert(result.every((x) => typeof x === "string")); // Assert each element in the array is a string
  });
});

test("fetchUniversities outputs the correct number of results for a query with multiple results", () => {
  const promise = fetchUniversities("University of Massachusetts");
  return promise.then((result) => {
    assert(result.length === 4);
  });
});

test("fetchUniversities outputs the correct number of results for a query with a single result", () => {
  const promise = fetchUniversities("University of Massachusetts Amherst");
  return promise.then((result) => {
    assert(result.length === 1);
  });
});

test("fetchUniversities outputs the correct number of results for a query with no results", () => {
  const promise = fetchUniversities("University of California, Los Angeles");
  return promise.then((result) => {
    assert(result.length === 0);
  });
});

test("fetchUniversities rejects a query that is undefined", () => {
  const promise = fetchUniversities(undefined);
  return promise.catch((result) => {
    assert(result === "No query provided.");
  });
});
