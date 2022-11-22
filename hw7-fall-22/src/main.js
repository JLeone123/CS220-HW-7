import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUCalWeather, fetchUMassWeather } from "./universityWeather.js";

//this function finds the temperature average in a city given by its lngitude and latitude
function weatherIn(lon, lat) {
    return fetchCurrentWeather(lon, lat).then(result => {
         return result.temperature_2m.reduce((s, a) => s + a, 0) / result.temperature_2m.length; 
    });
}

//finding average temperature for the following cities
let Moscow = weatherIn(37.6, 55.75);
let Copenhagen = weatherIn(12.57, 55.67);
let RioDeJaneiro = weatherIn(-43.17, -22.9);
let Paris = weatherIn(2.35, 48.86);

//this function compares weather in the given city to the weather in the given university 
function printDif(city, cityN, uni, uniN) {
    if (city > uni) {
        console.log("Weather in " + uniN + " is lower than in " + cityN + " by " + (city - uni) + " degrees.");
    }
    else if (uni > city) {
        console.log("Weather in " + uniN + " is higher than in " + cityN + " by " + (uni - city) + " degrees.");
    }
    else {
        console.log("Weather in " + uniN + " is the same as in " + cityN + ".");
    }
}

//printing all the comparisons
fetchUMassWeather().then(r => {
    Moscow.then(c => {
        printDif(c, "Moscow", r.totalAverage, "University of Massachusetts");
    })
});

fetchUMassWeather().then(r => {
    Copenhagen.then(c => {
        printDif(c, "Copenhagen", r.totalAverage, "University of Massachusetts");
    })
});

fetchUMassWeather().then(r => {
    RioDeJaneiro.then(c => {
        printDif(c, "Rio de Janeiro", r.totalAverage, "University of Massachusetts");
    })
});

fetchUMassWeather().then(r => {
    Paris.then(c => {
        printDif(c, "Paris", r.totalAverage, "University of Massachusetts");
    })
});

fetchUCalWeather().then(r => {
    Moscow.then(c => {
        printDif(c, "Moscow", r.totalAverage, "University of California");
    })
});

fetchUCalWeather().then(r => {
    Copenhagen.then(c => {
        printDif(c, "Copenhagen", r.totalAverage, "University of California");
    })
});

fetchUCalWeather().then(r => {
    RioDeJaneiro.then(c => {
        printDif(c, "Rio de Janeiro", r.totalAverage, "University of California");
    })
});

fetchUCalWeather().then(r => {
    Paris.then(c => {
        printDif(c, "Paris", r.totalAverage, "University of California");
    })
});
