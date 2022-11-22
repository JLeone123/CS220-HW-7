import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUCalWeather, fetchUMassWeather } from "./universityWeather.js";

//this function finds the temperature average in a city given by its lngitude and latitude
function weatherIn(lon, lat) {
    let w = fetchCurrentWeather(lon, lat);
    let avg = w.then(result => { return result.temperature_2m.reduce((s, a) => s + a, 0) / result.temperature_2m.length; });
    avg.then(result => { return result });
}

//finding average temperature for the following cities
let Moscow = weatherIn(37.6, 55.75);
let Copenhagen = weatherIn(12.57, 55.67);
let RioDeJaneiro = weatherIn(-43.17, -22.9);
let Paris = weatherIn(2.35, 48.86);

//this function compares weather in the given city to the weather in the given university 
function printDif(city, cityN, uni, uniN) {
    if (city > uni) {
        console.log("Weather in " + uniN + " is lower than in " + cityN + " by " + city - uni + " degrees.");
    }
    else if (uni > city) {
        console.log("Weather in " + uniN + " is higher than in " + cityN + " by " + city - uni + " degrees.");
    }
    else {
        console.log("Weather in " + uniN + " is the same as in " + cityN + ".");
    }
}

//finding average temperatures for UMass and UCal
let u = fetchUMassWeather();
let UMass = 0;
u.then(r => UMass = r.totalAverage);

let c = fetchUCalWeather();
let UCal = 0;
c.then(r => UCal = r.totalAverage);

//printing all the comparisons
printDif(Moscow, "Moscow", UMass, "University of Massachusetts");
printDif(Moscow, "Moscow", UCal, "University of California");
printDif(Copenhagen, "Copenhagen", UMass, "University of Massachusetts");
printDif(Copenhagen, "Copenhagen", UCal, "University of California");
printDif(RioDeJaneiro, "Rio de Janeiro", UMass, "University of Massachusetts");
printDif(RioDeJaneiro, "Rio de Janeiro", UCal, "University of California");
printDif(Paris, "Paris", UMass, "University of Massachusetts");
printDif(Paris, "Paris", UCal, "University of California");
