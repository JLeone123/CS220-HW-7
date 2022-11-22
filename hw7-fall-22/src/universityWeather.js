import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

export function fetchUniversityWeather(query) {
  // TODO
  let totalAvg = 0;
  let obj = {};
  let count = 0;
  let sum = 0;

  return fetchUniversities(query).then((arr) => {
    return arr.map((x) => {
      return fetchLongitudeAndLatitude(x).then((y) => {
        return fetchCurrentWeather(y.lon, y.lat).then((z) => {
          count = count + 1;

          z["temperature_2m"].map((x) => (sum += x));
          obj[x] = sum / z["temperature_2m"].length;
          totalAvg += obj[x];

          sum = 0;

          if (count === arr.length) {
            obj["totalAverage"] = totalAvg / arr.length;
            return obj;
          }
        });
      });
    });
  });
}

export function fetchUMassWeather() {
  // TODO
}

export function fetchUCalWeather() {
  // TODO
}
