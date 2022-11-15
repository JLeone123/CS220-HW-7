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
