import { apiKey } from "./enivronment.js";
import { LowestTemp, HighTemp } from "./highAndLow.js";
import { CurrentTime } from "./currentTime.js";
import { TimeOnly } from "./timOnly.js";
import { ChangeIcon } from "./changeIcon.js";
import { WeekDays, FindDay } from "./weekDayFunctions.js";
import { favArray } from "./app.js";
import { AddFavCity } from "./addFavCity.js";

let CityName;

function Search(city) {


    SearchCurrent(city, apiKey);
    Search5Day(city, apiKey);

    userInput.value = "";
}


async function SearchCurrent(cityName, k) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${k}&units=imperial`)
    const data = await promise.json();

    currTemp.innerText = Math.floor(data.main.temp);
    mainIcon.src = ChangeIcon(data.weather[0].icon);
    currCity.textContent = data.name;
    CityName = data.name;
    currWeather.innerText = data.weather[0].main;
    currTime.innerText = TimeOnly(CurrentTime(data.dt));
    let dayValue = new Date(CurrentTime(data.dt)).getDay();
    currDay.innerText = FindDay(dayValue);
    console.log(data.dt);

    let weekDayArray = WeekDays(FindDay(dayValue));
    weekDay1.innerText = weekDayArray[0];
    weekDay2.innerText = weekDayArray[1];
    weekDay3.innerText = weekDayArray[2];
    weekDay4.innerText = weekDayArray[3];
    weekDay5.innerText = weekDayArray[4];

    console.log(CityName)

    heartBtn.src = "./assets/heart.svg";

    for(let i = 0; i < favArray.length; i++){
        if(CityName === favArray[i]){
            console.log(favArray[i])
            heartBtn.src = "./assets/heart (1).svg";
        }
    }
}

async function Search5Day(cityName, k) {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${k}&units=imperial`)
    const data = await promise.json();

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


    //3 Day Section
    firstHrTemp.innerText = Math.floor((data.list[0].main.temp)) + "°F";
    firstHrIcon.src = ChangeIcon(data.list[0].weather[0].icon);

    secondHrTemp.innerText = Math.floor((data.list[2].main.temp)) + "°F";
    secondHrIcon.src = ChangeIcon(data.list[2].weather[0].icon);

    thirdHrTemp.innerText = Math.floor((data.list[4].main.temp)) + "°F";
    thirdHrIcon.src = ChangeIcon(data.list[4].weather[0].icon);
}

export { Search, Search5Day, SearchCurrent, CityName}

