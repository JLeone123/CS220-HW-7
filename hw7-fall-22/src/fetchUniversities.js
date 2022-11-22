export function fetchUniversities(query) {
  //check to make sure parameter is there
  if (query === undefined) {
    return Promise.reject(new Error("No query provided."));
  }
  //check to make sure parameter is a string
  if (typeof query !== "string") {
    return Promise.reject(new Error("Query is not a string."));
  }
  //check to make sure parameter is not empty
  if (query === "") {
    return Promise.reject(new Error("Query is empty."));
  }
  return fetch(`https://university-web-api.herokuapp.com/search?name=${query}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error("No results found."));
      }
    })
    .then((json) => {
      if (!Array.isArray(json) || json.length < 0) {
        return Promise.reject(new Error("No results found."));
      }
      let universities = [];
      for (let i = 0; i < json.length; i++) {
        universities.push(json[i].name);
      }
      return universities;
    });
}
