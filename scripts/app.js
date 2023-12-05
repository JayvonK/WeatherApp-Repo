import { apiKey } from "./enivronment.js";
import { KelvinConvert } from "./kelvinConvert.js";
import { LowestTemp, HighTemp } from "./highAndLow.js";

let mainIcon = document.getElementById("mainIcon");
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


//API Call for current weather data
async function CurrentApiCall(a, b, c){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${c}`)
    const data = await promise.json();
    let area = data.name;

    console.log("Current Temp: " + Math.floor(KelvinConvert(data.main.temp)));
    console.log("Current max temp: " + Math.floor(KelvinConvert(data.main.temp_max)) + ", Current min temp: " + Math.floor(KelvinConvert(data.main.temp_min)));
    console.log("Current Weather: " + data.weather[0].main)
    console.log("City: " + data.name)

    data.weather[0].icon = "./assets/icons8-rain-96.png"
    console.log(data);
    
    mainIcon.src = data.weather[0].icon;
}

//API Call for five day forecast
async function FiveDayApiCall(a, b, c) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${a}&lon=${b}&appid=${c}`)
    const data = await promise.json();

    //Console logging first day
    console.log("1st day min temp: " + LowestTemp(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min, data.list[7].main.temp_min) + ", 1st day max temp: " + HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max) + ", Weather Description: ");

    //Console logging second day
    console.log("2nd day min temp: " + LowestTemp(data.list[8].main.temp_min, data.list[9].main.temp_min, data.list[10].main.temp_min, data.list[11].main.temp_min, data.list[12].main.temp_min, data.list[13].main.temp_min, data.list[14].main.temp_min, data.list[15].main.temp_min) + ", 2nd day max temp: " + HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max));

    //Console logging third day
    console.log("3rd day min temp: " + LowestTemp(data.list[16].main.temp_min, data.list[17].main.temp_min, data.list[18].main.temp_min, data.list[19].main.temp_min, data.list[20].main.temp_min, data.list[21].main.temp_min, data.list[22].main.temp_min, data.list[23].main.temp_min) + ", 3rd day max temp: " + HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max));

    //Console logging fourth day 
    console.log("4th day min temp: " + LowestTemp(data.list[24].main.temp_min, data.list[25].main.temp_min, data.list[26].main.temp_min, data.list[27].main.temp_min, data.list[28].main.temp_min, data.list[29].main.temp_min, data.list[30].main.temp_min, data.list[31].main.temp_min)
     + ", 4th day max temp: "
      + Math.floor(KelvinConvert(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max))));

    //Console logging fifth day
    console.log("5th day min temp: " + 
    Math.floor(KelvinConvert(LowestTemp(data.list[32].main.temp_min, data.list[33].main.temp_min, data.list[34].main.temp_min, data.list[35].main.temp_min, data.list[36].main.temp_min, data.list[37].main.temp_min, data.list[38].main.temp_min, data.list[39].main.temp_min))) 
    + ", 5th day max temp: " 
    + Math.floor(KelvinConvert(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max))));

    console.log("9am temp: " + Math.floor(KelvinConvert(data.list[0].main.temp)) + ", Noon temp: " + Math.floor(KelvinConvert(data.list[2].main.temp)) + ", 9pm temp: " + Math.floor(KelvinConvert(data.list[4].main.temp)));
}


//API Call for current time
async function CurrentTimeApiCall(area){
    const promise = await fetch(
        `http://worldtimeapi.org/api/timezone/${area}`)
    const data = await promise.json();

    console.log(data);
}

let favBtn = document.getElementById("favBtn");
let favInject = document.getElementById("favInject");

favBtn.addEventListener('click', function(e){

})


