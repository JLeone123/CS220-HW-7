export function fetchUniversities(query) {
  return fetch(`https://university-web-api.herokuapp.com/search?name=${query}`)
    .then((response) => response.json())
    .then((json) => {
      let universities = [];
      for (let i = 0; i < json.length; i++) {
        universities.push(json[i].name);
      }
      return universities;
    });
}
