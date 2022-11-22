import assert from "node:assert";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";

test("fetchLongitudeAndLatitude follows type specification", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object"); //  Assert the result is an object
    assert(typeof result.lon === "number"); // Assert that the lon value is a number
    assert(typeof result.lat === "number"); // Assert that the lat value is a number
    assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
  });
});

test("fetchLongitudeAndLatitude follows type specification for the first returned location in a group of multiple locations", () => {
  const promise = fetchLongitudeAndLatitude("University of Massachusetts");

  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    assert(typeof result.lon === "number");
    assert(typeof result.lat === "number");
    assert(Object.keys(result).length === 2);
  });
});

test("fetchLongitudeAndLatitude outputs correct longitude and latitude for just one location", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );

  return promise.then((result) => {
    assert(result.lon === -72.52991477067445);
    assert(result.lat === 42.3869382);
  });
});

test("fetchLongitudeAndLatitude outputs correct longitude and latitude for first location in a group of multiple locations", () => {
  const promise = fetchLongitudeAndLatitude("University of Massachusetts");

  return promise.then((result) => {
    assert(result.lon === -72.5287);
    assert(result.lat === 42.38898);
  });
});

test("fetchLongitudeAndLatitude rejects with the correct error if there are no results (array is empty)", () => {
  const promise = fetchLongitudeAndLatitude("WHY So SERIOUS? ~ Joker, 2008");
  return promise.catch((result) => {
    console.log(result);
    assert(result === "No results found for query.");
  });
});
