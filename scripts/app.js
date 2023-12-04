import { apiKey } from "./enivronment.js";
import { kelvinConvert } from "./kelvinConvert.js";

navigator.geolocation.getCurrentPosition(success, error);


async function success(pos){
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    CurrentApiCall(lat, long, apiKey);
    FiveDayApiCall(lat, long, apiKey);

}

function error(error){
    console.log(error.message);
}

async function CurrentApiCall(a, b, c){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${c}`)
    const data = await promise.json();

    console.log("Current Temp: " + kelvinConvert(data.main.temp));
}

async function FiveDayApiCall(a, b, c) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${a}&lon=${b}&appid=${c}`)
    const data = await promise.json();

    console.log(data);
    console.log("1st day min temp: " + LowestTemp(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min, data.list[7].main.temp_min) + ", 1st day max temp: " + HighTemp(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min, data.list[7].main.temp_min));

    
}

function LowestTemp(n1, n2, n3, n4, n5, n6, n7, n8){
    let numArray = [];
    let min = numArray[0];
    numArray.push(n1, n2, n3, n4, n5, n6, n7, n8);
    
    for(let i = 0; i < numArray.length; i++){
        if(numArray[0] > numArray[i]){
            numArray[0] = numArray[i];
            min = numArray[0];
        }
    }
    return min;
}

function HighTemp(n1, n2, n3, n4, n5, n6, n7, n8){
    let numArray = [];
    let max = numArray[0];
    numArray.push(n1, n2, n3, n4, n5, n6, n7, n8);
    
    for(let i = 0; i < numArray.length; i++){
        if(numArray[0] < numArray[i]){
            numArray[0] = numArray[i];
            max = numArray[0];
        }
    }
    return max;
}

