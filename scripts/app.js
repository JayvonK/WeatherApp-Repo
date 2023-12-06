import { apiKey } from "./enivronment.js";
import { KelvinConvert } from "./kelvinConvert.js";
import { LowestTemp, HighTemp } from "./highAndLow.js";
import { Search } from "./searchFunctions.js";
import { CurrentTime } from "./currentTime.js";
import { TimeOnly } from "./timOnly.js";
import { ChangeIcon } from "./changeIcon.js";

let mainIcon = document.getElementById("mainIcon");
let day1Icon = document.getElementById("day1Icon");
let day2Icon = document.getElementById("day2Icon");
let day3Icon = document.getElementById("day3Icon");
let day4Icon = document.getElementById("day4Icon");
let day5Icon = document.getElementById("day5Icon");
let currTemp = document.getElementById("currTemp");
let currCity = document.getElementById("currCity");
let currWeather = document.getElementById("currWeather");
let highTemp1 = document.getElementById("highTemp1");
let highTemp2 = document.getElementById("highTemp2");
let highTemp3 = document.getElementById("highTemp3");
let highTemp4 = document.getElementById("highTemp4");
let highTemp5 = document.getElementById("highTemp5");
let lowTemp1 = document.getElementById("lowTemp1");
let lowTemp2 = document.getElementById("lowTemp2");
let lowTemp3 = document.getElementById("lowTemp3");
let lowTemp4 = document.getElementById("lowTemp4");
let lowTemp5 = document.getElementById("lowTemp5");
let userInput = document.getElementById("userInput");
let searchBtn = document.getElementById("searchBtn");
let currTime = document.getElementById("currTime");
let currDay = document.getElementById("currDay")



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

    console.log("Current Temp: " + Math.floor(KelvinConvert(data.main.temp)));
    console.log("Current max temp: " + Math.floor(KelvinConvert(data.main.temp_max)) + ", Current min temp: " + Math.floor(KelvinConvert(data.main.temp_min)));
    console.log("Current Weather: " + data.weather[0].main)
    console.log("City: " + data.name)

    
    console.log(data);
    console.log(data.dt)

    currTemp.innerText = Math.floor(KelvinConvert(data.main.temp));
    mainIcon.src = ChangeIcon(data.weather[0].icon);
    currCity.textContent = data.name;
    currWeather.innerText = data.weather[0].main;
    currTime.innerText = TimeOnly(CurrentTime(data.dt));
    let dayValue = new Date(CurrentTime(data.dt)).getDay();
    currDay.innerText = FindDay(dayValue);
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

    //Displaying Max temps for 5 day forecast
    highTemp1.innerText = Math.floor(KelvinConvert(HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max))) + "°F";

    




    highTemp2.innerText = Math.floor(KelvinConvert(HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max))) + "°F";





    highTemp3.innerText = Math.floor(KelvinConvert(HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max))) + "°F";





    highTemp4.innerText = Math.floor(KelvinConvert(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max))) + "°F";


    highTemp5.innerText = Math.floor(KelvinConvert(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max))) + "°F";

    lowTemp1.innerText = Math.floor(KelvinConvert(LowestTemp(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min, data.list[7].main.temp_min))) + "°F";

    lowTemp2.innerText = Math.floor(KelvinConvert(LowestTemp(data.list[8].main.temp_min, data.list[9].main.temp_min, data.list[10].main.temp_min, data.list[11].main.temp_min, data.list[12].main.temp_min, data.list[13].main.temp_min, data.list[14].main.temp_min, data.list[15].main.temp_min))) + "°F";

    lowTemp3.innerText = Math.floor(KelvinConvert(LowestTemp(data.list[16].main.temp_min, data.list[17].main.temp_min, data.list[18].main.temp_min, data.list[19].main.temp_min, data.list[20].main.temp_min, data.list[21].main.temp_min, data.list[22].main.temp_min, data.list[23].main.temp_min))) + "°F";

    lowTemp4.innerText = Math.floor(KelvinConvert(LowestTemp(data.list[24].main.temp_min, data.list[25].main.temp_min, data.list[26].main.temp_min, data.list[27].main.temp_min, data.list[28].main.temp_min, data.list[29].main.temp_min, data.list[30].main.temp_min, data.list[31].main.temp_min))) + "°F";

    lowTemp5.innerText = Math.floor(KelvinConvert(LowestTemp(data.list[32].main.temp_min, data.list[33].main.temp_min, data.list[34].main.temp_min, data.list[35].main.temp_min, data.list[36].main.temp_min, data.list[37].main.temp_min, data.list[38].main.temp_min, data.list[39].main.temp_min))) + "°F";


    //Day 1 Icon and Temperature

    for(let i = 0; i < 7; i++){

        let tempMax = Math.floor(KelvinConvert(HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max)));


        let maxTemp = Math.floor(KelvinConvert(data.list[i].main.temp_max));
        if(maxTemp === tempMax){
            day1Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }


    //Day 2 Icon and Temperature

    for(let i = 8; i < 15; i++){

        let tempMax = Math.floor(KelvinConvert(HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max)));

        let maxTemp = Math.floor(KelvinConvert(data.list[i].main.temp_max));
        if(maxTemp === tempMax){
            day2Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }

    //Day 3 Icon and Temp

    for(let i = 16; i < 23; i++){

        let tempMax = Math.floor(KelvinConvert(HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max)));

        let maxTemp = Math.floor(KelvinConvert(data.list[i].main.temp_max));
        if(maxTemp === tempMax){
            day3Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }


    //Day 4 Icon and Temp
    for(let i = 24; i < 31; i++){

        let tempMax = Math.floor(KelvinConvert(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max)));

        let maxTemp = Math.floor(KelvinConvert(data.list[i].main.temp_max));
        if(maxTemp === tempMax){
            day4Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }


    //Day 5 Icon and Temp
    for(let i = 32; i < 39; i++){

        let tempMax = Math.floor(KelvinConvert(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max)));

        let maxTemp = Math.floor(KelvinConvert(data.list[i].main.temp_max));
        if(maxTemp === tempMax){
            day5Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }

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

searchBtn.addEventListener('click', function(e){
    Search(userInput.value);
})

function FindDay(day){
    switch(day){
        case 0:
            return "Sunday";
        break;
        case 1:
            return "Monday";
        break;
        case 2:
            return "Tuesday";
        break;
        case 3:
            return "Wednesday";
        break;
        case 4:
            return "Thursday";
        break;
        case 5:
            return "Friday";
        break;
        case 6:
            return "Saturday";
        break;
    }
}

