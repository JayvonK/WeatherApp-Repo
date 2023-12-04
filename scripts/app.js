import { apiKey } from "./enivronment.js";
import { kelvinConvert } from "./kelvinConvert.js";

navigator.geolocation.getCurrentPosition(success, error);


async function success(pos){
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    CurrentApiCall(lat, long, apiKey);

}

function error(error){
    console.log(error.message);
}

async function CurrentApiCall(a, b, c){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${c}`)
    const data = await promise.json();

    console.log(kelvinConvert(data.main.temp));
}

async function FiveDayApiCall() {
    const promise = await fetch("api.openweathermap.org/data/2.5/forecast?lat=37.961632&lon=-121.275604&appid=c957eab891507b737820efc7f99d3675")
    const data = await promise.json();

    console.log(data);
}

FiveDayApiCall();