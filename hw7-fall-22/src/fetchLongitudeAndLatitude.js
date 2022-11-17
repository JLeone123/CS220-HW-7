// Written by James Leone
export function fetchLongitudeAndLatitude(query) {
  // TODO
  const searchURL = new URL("https://geocode.maps.co/search");
  searchURL.searchParams.append("q", query);
  const newSearchURL = searchURL.toString();

  fetch(newSearchURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error("No results found."));
      }
    })
    .then((json) => {
      if (!Array.isArray(json.results) || json.results.length <= 0) {
        return Promise.reject(new Error("No results found."));
      }

      const filteredArray = json.results.filter(
        (obj) => "lon" in obj && "lat" in obj
      );

      if (filteredArray.length <= 0) {
        return Promise.reject(new Error("No results found for query."));
      }

      return Promise.resolve(filteredArray[0]);
    });
}
