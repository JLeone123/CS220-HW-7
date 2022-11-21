import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  // TODO
}

export function readFromJSONFile(path) {
  // TODO
  const data = {};
  return readFile(path, {encoding:"utf8"}).then((results) => {
    if(!data[results]){
      data[results] =  JSON.parse(results);
    }
  });
}
