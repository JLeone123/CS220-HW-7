export function fetchCurrentWeather(longitude, latitude) {
  // TODO
  return fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m&temperature_unit=fahrenheit") 
  .then(response => response.json()) // parse the result to a json
  .then(json => {
    return { time: json.hourly.time, temperature_2m: json.hourly.temperature_2m }
  });
}
