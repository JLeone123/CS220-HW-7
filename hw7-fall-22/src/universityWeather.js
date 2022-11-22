// James Leone
import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

export function fetchUniversityWeather(query) {
  let totalAvg = 0;
  let obj = {};
  let count = 0;
  let sum = 0;

  if (typeof query !== "string") {
    return Promise.reject(new Error("Query must be a string"));
  }

  if (query === undefined) {
    return Promise.reject(new Error("Query was not provided"));
  }

  if (query === "") {
    return Promise.reject(new Error("Query is empty"));
  }

  let p = fetchUniversities(query).then((arr) => {
    if (arr.length === 0) {
      return Promise.reject(new Error("No results found for query."));
    }
    return arr.map((x) =>
      fetchLongitudeAndLatitude(x).then((y) =>
        fetchCurrentWeather(y.lon, y.lat).then((z) => {
          count = count + 1;
          z["temperature_2m"].map((e) => (sum += e));

          obj[x] = sum / z["temperature_2m"].length;
          totalAvg += obj[x];

          sum = 0;

          if (count === arr.length) {
            obj["totalAverage"] = totalAvg / arr.length;
          }
          return obj;
        })
      )
    );
  });

  let newP = p.then((arr) => Promise.all(arr).then((x) => x[0]));
  return newP;
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California");
}
