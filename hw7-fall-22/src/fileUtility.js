import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  // TODO
  return writeFile(path, JSON.stringify(data));
}

export function readFromJSONFile(path) {
  const data = {};
  return readFile(path, {encoding:"utf8"}).then((results) => {
    if(!data[results]){
      data[results] =  JSON.parse(results);
    }
  }).catch((err) => {
    console.log(err);
  });
}
