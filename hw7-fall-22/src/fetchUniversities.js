export function fetchUniversities(query) {
  return fetch(`https://university-web-api.herokuapp.com/search?name=${query}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error("No results found."));
      }
    })
    .then((json) => {
      let universities = [];
      for (let i = 0; i < json.length; i++) {
        universities.push(json[i].name);
      }
      return universities;
    });
}
