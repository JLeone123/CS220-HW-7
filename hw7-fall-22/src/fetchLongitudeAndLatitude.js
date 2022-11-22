// Written by James Leone
export function fetchLongitudeAndLatitude(query) {
  // TODO
  const searchURL = new URL("https://geocode-cache.herokuapp.com/search");
  searchURL.searchParams.append("q", query);
  searchURL.searchParams.append;
  const newSearchURL = searchURL.toString();

  return fetch(newSearchURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then((json) => {
      if (!Array.isArray(json) || json.length <= 0) {
        return Promise.reject(new Error("No results found."));
      }

      const filteredArray = json.filter((obj) => "lon" in obj && "lat" in obj);

      if (filteredArray.length <= 0) {
        return Promise.reject(new Error("No results found for query."));
      }

      return {
        lon: Number(filteredArray[0].lon),
        lat: Number(filteredArray[0].lat)
      }
    });
}
