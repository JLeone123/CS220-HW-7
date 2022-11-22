export function fetchCurrentWeather(longitude, latitude) {
  return fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&hourly=temperature_2m&temperature_unit=fahrenheit"
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } 
      else {
        return Promise.reject(new Error("No results found."));
      }
    })
    .then((json) => {
      return {
        time: json.hourly.time,
        temperature_2m: json.hourly.temperature_2m,
      };
    });
}
