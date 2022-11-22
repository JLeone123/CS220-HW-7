// James Leone
import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

export function fetchUniversityWeather(query) {
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
          obj[x] = Number(sum / z["temperature_2m"].length);
          totalAvg += obj[x];

          sum = 0;

          if (count === arr.length) {
            obj["totalAverage"] = Number(totalAvg / arr.length);
            return obj;
          }
        });
      });
    });
  });
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California");
}
