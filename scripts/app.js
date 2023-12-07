import { apiKey } from "./enivronment.js";
import { LowestTemp, HighTemp } from "./highAndLow.js";
import { Search, CityName } from "./searchFunctions.js";
import { CurrentTime } from "./currentTime.js";
import { TimeOnly } from "./timOnly.js";
import { ChangeIcon } from "./changeIcon.js";
import { WeekDays, FindDay } from "./weekDayFunctions.js";
import { updateFav } from "./updateFav.js";

let mainIcon = document.getElementById("mainIcon");
let day1Icon = document.getElementById("day1Icon");
let day2Icon = document.getElementById("day2Icon");
let day3Icon = document.getElementById("day3Icon");
let day4Icon = document.getElementById("day4Icon");
let day5Icon = document.getElementById("day5Icon");
let currTemp = document.getElementById("currTemp");
let currCity = document.getElementById("currCity");
let currWeather = document.getElementById("currWeather");
let firstHrTemp = document.getElementById("firstHrTemp");
let secondHrTemp = document.getElementById("secondHrTemp");
let thirdHrTemp = document.getElementById("thirdHrTemp");
let firstHrIcon = document.getElementById("firstHrIcon");
let secondHrIcon = document.getElementById("secondHrIcon");
let thirdHrIcon = document.getElementById("thirdHrIcon");
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
let currDay = document.getElementById("currDay");
let weekDay1 = document.getElementById("weekDay1");
let weekDay2 = document.getElementById("weekDay2");
let weekDay3 = document.getElementById("weekDay3");
let weekDay4 = document.getElementById("weekDay4");
let weekDay5 = document.getElementById("weekDay5");
let exampleModal = document.getElementById("exampleModal");
let modalBg = document.getElementById("modalBg");
let body = document.getElementById("body");
let heartBtn = document.getElementById("heartBtn");
let favInject = document.getElementById("favInject");
let favSearch = document.getElementsByClassName("btn btn-light");
let currCityName;
let favArray = [];
let heart = heartBtn.src;
let searched = false;

if (localStorage.getItem("favorites")) {
    favArray = JSON.parse(localStorage.getItem("favorites"));
}

updateFav();

console.log(favArray);


navigator.geolocation.getCurrentPosition(success, error);


async function success(pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;

    CurrentApiCall(lat, long, apiKey);
    FiveDayApiCall(lat, long, apiKey);
}

function error(error) {
    console.log(error.message);
}

//API Call for current weather data
async function CurrentApiCall(a, b, c) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=${c}&units=imperial`)
    const data = await promise.json();

    // console.log("Current Temp: " + Math.floor(data.main.temp));
    // console.log("Current max temp: " + Math.floor(data.main.temp_max) + ", Current min temp: " + Math.floor(data.main.temp_min));
    // console.log("Current Weather: " + data.weather[0].main)
    // console.log("City: " + data.name)


    console.log(data);
    // console.log(data.dt)

    currTemp.innerText = Math.floor(data.main.temp) + "°F";
    mainIcon.src = ChangeIcon(data.weather[0].icon);
    currCity.textContent = data.name.toUpperCase();
    currCityName = data.name;
    currWeather.innerText = data.weather[0].main;
    currTime.innerText = TimeOnly(CurrentTime(data.dt));
    let dayValue = new Date(CurrentTime(data.dt)).getDay();

    let weekDayArray = WeekDays(FindDay(dayValue));
    weekDay1.innerText = weekDayArray[0];
    weekDay2.innerText = weekDayArray[1];
    weekDay3.innerText = weekDayArray[2];
    weekDay4.innerText = weekDayArray[3];
    weekDay5.innerText = weekDayArray[4];

    for (let i = 0; i < favArray.length; i++) {
        if (currCityName === favArray[i]) {
            heartBtn.src = "./assets/heart (1).svg";
        }
    }
}


//API Call for five day forecast
async function FiveDayApiCall(a, b, c) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${a}&lon=${b}&appid=${c}&units=imperial`)
    const data = await promise.json();

    // Console logging first day
    // console.log("1st day min temp: " + LowestTemp(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min, data.list[7].main.temp_min) + ", 1st day max temp: " + HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max) + ", Weather Description: ");

    //Console logging second day
    // console.log("2nd day min temp: " + LowestTemp(data.list[8].main.temp_min, data.list[9].main.temp_min, data.list[10].main.temp_min, data.list[11].main.temp_min, data.list[12].main.temp_min, data.list[13].main.temp_min, data.list[14].main.temp_min, data.list[15].main.temp_min) + ", 2nd day max temp: " + HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max));

    //Console logging third day
    // console.log("3rd day min temp: " + LowestTemp(data.list[16].main.temp_min, data.list[17].main.temp_min, data.list[18].main.temp_min, data.list[19].main.temp_min, data.list[20].main.temp_min, data.list[21].main.temp_min, data.list[22].main.temp_min, data.list[23].main.temp_min) + ", 3rd day max temp: " + HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max));

    //Console logging fourth day 
    // console.log("4th day min temp: " + LowestTemp(data.list[24].main.temp_min, data.list[25].main.temp_min, data.list[26].main.temp_min, data.list[27].main.temp_min, data.list[28].main.temp_min, data.list[29].main.temp_min, data.list[30].main.temp_min, data.list[31].main.temp_min)
    //     + ", 4th day max temp: "
    //     + Math.floor(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max)));

    //Console logging fifth day
    // console.log("5th day min temp: " +
    //     Math.floor(LowestTemp(data.list[32].main.temp_min, data.list[33].main.temp_min, data.list[34].main.temp_min, data.list[35].main.temp_min, data.list[36].main.temp_min, data.list[37].main.temp_min, data.list[38].main.temp_min, data.list[39].main.temp_min))
    //     + ", 5th day max temp: "
    //     + Math.floor(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max)));


    //Current Day 3 segment Temp
    // console.log("9am temp: " + Math.floor((data.list[0].main.temp)) + ", Noon temp: " + Math.floor((data.list[2].main.temp)) + ", 9pm temp: " + Math.floor((data.list[4].main.temp)));

    firstHrTemp.innerText = Math.floor((data.list[0].main.temp)) + "°F";
    firstHrIcon.src = ChangeIcon(data.list[0].weather[0].icon);

    secondHrTemp.innerText = Math.floor((data.list[2].main.temp)) + "°F";
    secondHrIcon.src = ChangeIcon(data.list[2].weather[0].icon);

    thirdHrTemp.innerText = Math.floor((data.list[4].main.temp)) + "°F";
    thirdHrIcon.src = ChangeIcon(data.list[4].weather[0].icon);


    //Displaying Max temps for 5 day forecast
    highTemp1.innerText = Math.floor(HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max)) + "°F";


    highTemp2.innerText = Math.floor(HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max)) + "°F";


    highTemp3.innerText = Math.floor(HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max)) + "°F";


    highTemp4.innerText = Math.floor(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max)) + "°F";


    highTemp5.innerText = Math.floor(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max)) + "°F";


    lowTemp1.innerText = Math.floor(LowestTemp(data.list[0].main.temp_min, data.list[1].main.temp_min, data.list[2].main.temp_min, data.list[3].main.temp_min, data.list[4].main.temp_min, data.list[5].main.temp_min, data.list[6].main.temp_min, data.list[7].main.temp_min)) + "°F";


    lowTemp2.innerText = Math.floor(LowestTemp(data.list[8].main.temp_min, data.list[9].main.temp_min, data.list[10].main.temp_min, data.list[11].main.temp_min, data.list[12].main.temp_min, data.list[13].main.temp_min, data.list[14].main.temp_min, data.list[15].main.temp_min)) + "°F";


    lowTemp3.innerText = Math.floor(LowestTemp(data.list[16].main.temp_min, data.list[17].main.temp_min, data.list[18].main.temp_min, data.list[19].main.temp_min, data.list[20].main.temp_min, data.list[21].main.temp_min, data.list[22].main.temp_min, data.list[23].main.temp_min)) + "°F";


    lowTemp4.innerText = Math.floor(LowestTemp(data.list[24].main.temp_min, data.list[25].main.temp_min, data.list[26].main.temp_min, data.list[27].main.temp_min, data.list[28].main.temp_min, data.list[29].main.temp_min, data.list[30].main.temp_min, data.list[31].main.temp_min)) + "°F";


    lowTemp5.innerText = Math.floor(LowestTemp(data.list[32].main.temp_min, data.list[33].main.temp_min, data.list[34].main.temp_min, data.list[35].main.temp_min, data.list[36].main.temp_min, data.list[37].main.temp_min, data.list[38].main.temp_min, data.list[39].main.temp_min)) + "°F";


    //Day 1 Icon and Temperature

    for (let i = 0; i < 8; i++) {

        let tempMax = Math.floor(HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max));

        let maxTemp = Math.floor(data.list[i].main.temp_max);
        if (maxTemp === tempMax) {
            day1Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }


    //Day 2 Icon and Temperature

    for (let i = 8; i < 16; i++) {

        let tempMax = Math.floor(HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max));

        let maxTemp = Math.floor(data.list[i].main.temp_max);
        if (maxTemp === tempMax) {
            day2Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }

    //Day 3 Icon and Temp

    for (let i = 16; i < 24; i++) {

        let tempMax = Math.floor(HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max));

        let maxTemp = Math.floor(data.list[i].main.temp_max);
        if (maxTemp === tempMax) {
            day3Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }


    //Day 4 Icon and Temp
    for (let i = 24; i < 32; i++) {

        let tempMax = Math.floor(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max));

        let maxTemp = Math.floor(data.list[i].main.temp_max);
        if (maxTemp === tempMax) {
            day4Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }


    //Day 5 Icon and Temp
    for (let i = 32; i < 40; i++) {

        let tempMax = Math.floor(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max));

        let maxTemp = Math.floor(data.list[i].main.temp_max);
        if (maxTemp === tempMax) {
            day5Icon.src = ChangeIcon(data.list[i].weather[0].icon);
        }
    }
}

let cityList;

//API Call for current time
async function CityList() {
    const promise = await fetch(`../assets/city.list.json`);
    const data = await promise.json();

    cityList = data;
}

function FindCity() {
    let input = userInput.value.toLowerCase();
    let search = false;

    for (let i = 0; i < cityList.length; i++) {
        let city = cityList[i].name.toLowerCase();

        if (input === city) {
            search = true;
        }
    }
    if (search === true) {
        Search(input);
        searched = true;
    } else {
        body.className = "modal-open";
        body.style = "overflow: hidden; padding-right: 0px;";
        exampleModal.className = "modal fade show";
        exampleModal.style = "display: block;";
        exampleModal.ariaModal = "true";
        exampleModal.removeAttribute('aria-hidden');
        exampleModal.role = "dialog";
        modalBg.className = "modal-backdrop fade show";
    }
}

exampleModal.addEventListener('click', function (e) {
    body.className = "";
    body.style = "";
    exampleModal.className = "modal fade";
    exampleModal.style = "";
    exampleModal.ariaModal = "";
    exampleModal.role = "";
    modalBg.className = "";
})



CityList();


searchBtn.addEventListener('click', function (e) {
    FindCity();
})


heartBtn.addEventListener('click', function (e) {
    if (heartBtn.src === heart) {
        if (searched === false) {
            heartBtn.src = "./assets/heart (1).svg";
            favArray.push(currCityName);

            localStorage.setItem("favorites", JSON.stringify(favArray));
            favInject.innerHTML = "";
            updateFav();
        } else {
            heartBtn.src = "./assets/heart (1).svg";
            favArray.push(CityName);

            localStorage.setItem("favorites", JSON.stringify(favArray));
            favInject.innerHTML = "";
            updateFav();
        }

    } else {
        if (searched === true) {
            heartBtn.src = "./assets/heart.svg";

            let index = favArray.indexOf(CityName);

            favArray.splice(index, 1);

            localStorage.setItem("favorites", JSON.stringify(favArray));
            favInject.innerHTML = "";
            updateFav();

        } else {
            heartBtn.src = "./assets/heart.svg";

            let index = favArray.indexOf(currCityName);

            favArray.splice(index, 1);

            localStorage.setItem("favorites", JSON.stringify(favArray));
            favInject.innerHTML = "";
            updateFav();
        }

    }
})




















function convertUnixTimeToTimeZone(unixTime, timeZone) {
    const date = new Date(unixTime * 1000); // Convert Unix time to milliseconds

    // Get the local time zone offset in minutes
    const localOffset = date.getTimezoneOffset();

    // Create a new Date object adjusted for the target time zone
    const targetDate = new Date(date.getTime() + localOffset * 60 * 1000);
    const targetOffset = timeZone * 60 * 60 * 1000; // Convert time zone to milliseconds

    // Apply the time zone offset
    const convertedTime = new Date(targetDate.getTime() + targetOffset);
    console.log(convertedTime);

    return convertedTime.toLocaleString(); // Return the converted time in a readable format
}

// Example usage:
const unixTimestamp = 1701894551; // Replace this with your Unix timestamp
const targetTimeZone = -8; // Replace this with the target time zone offset in hours (e.g., -5 for EST)

const convertedTime = convertUnixTimeToTimeZone(unixTimestamp, targetTimeZone);
console.log(`Converted Time: ${convertedTime}`);

export { favArray }