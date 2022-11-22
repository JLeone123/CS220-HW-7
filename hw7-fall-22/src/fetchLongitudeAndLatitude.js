// James Leone
export function fetchLongitudeAndLatitude(query) {
  // TODO
  if (query === undefined) {
    return Promise.reject(new Error ("A query was not provided"));
  }

  if (typeof query !== "string") {
    return Promise.reject(new Error ("The provided query is not a string"));
  }

  if (query === "") {
    return Promise.reject(new Error ("The query is empty"));
  }

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
        return Promise.reject(new Error("No results found for query."));
      }

      const filteredArray = json.filter((obj) => "lon" in obj && "lat" in obj);

      if (filteredArray.length <= 0) {
        return Promise.reject(new Error("No results found for query."));
      }

      return {
        lon: Number(filteredArray[0].lon),
        lat: Number(filteredArray[0].lat),
      };
    });
}
