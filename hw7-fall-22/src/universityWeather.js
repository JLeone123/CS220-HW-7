import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

export function fetchUniversityWeather(query) {
  // TODO
  let totalAvg = 0;
  let obj = {};
  let count = 0;
  let sum = 0;

  let p = fetchUniversities(query).then((arr) =>
    arr.map((x) =>
      fetchLongitudeAndLatitude(x).then((y) =>
        fetchCurrentWeather(y.lon, y.lat).then((z) => {
          count = count + 1;
          z["temperature_2m"].map((e) => (sum += e));

          obj[x] = sum / z["temperature_2m"].length;
          totalAvg += obj[x];

          sum = 0;

          if (count === arr.length) {
            obj["totalAverage"] = totalAvg / arr.length;
            // return obj;
          }
          return obj;
        })
      )
    )
  );

  let newP = p.then((arr) => Promise.all(arr).then((x) => x[0]));
  return newP;
}

export function fetchUMassWeather() {
  // TODO
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  // TODO
  return fetchUniversityWeather("University of California");
}
