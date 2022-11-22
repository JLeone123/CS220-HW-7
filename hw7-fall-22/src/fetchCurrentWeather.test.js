import assert from "node:assert";
import { fetchCurrentWeather } from "./fetchCurrentWeather.js";

test("fetchCurrentWeather follows type specification", () => {
  const promise = fetchCurrentWeather(42.36, -71.05);
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object"); // Assert the result is an object
    assert(Array.isArray(result.time)); // Assert the result has an array time field
    assert(result.time.every((x) => typeof x === "string")); // Assert each element in that time is a sting
    assert(Array.isArray(result.temperature_2m)); // Assert the result as an array temperature_2m field
    assert(result.temperature_2m.every((x) => typeof x === "number")); // Assert each element in that time is a number
  });
});

test("fetchCurrWeather rejects", () => {
  const promise = fetchCurrentWeather("sdhiw", "vknsdlk");
  assert(!promise.isFulfilled);
  const promise2 = fetchCurrentWeather(-1378217482375439872384723847, 23984732847237474368);
  assert(!promise2.isFulfilled);
  const promise3 = fetchCurrentWeather(true, false);
  assert(!promise3.isFulfilled);
});
