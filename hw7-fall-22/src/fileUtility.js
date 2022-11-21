import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  // TODO
}

export function readFromJSONFile(path) {
  // TODO
  /*
  readFromJSONFile(path: string): Promise<object | object[]>
  This function should take in a path (assumed to be a JSON file) and return a Promise that fulfils with the parsed contents of the file.
  Use readFile from the fs/promises library and JSON.parse to parse the contents of the file.
  */
  const data = {};
  return readFile(path, "utf8").then((results) => {
    if(!data[results]){
      data[results] =  JSON.parse(results);
    }
  });
}
