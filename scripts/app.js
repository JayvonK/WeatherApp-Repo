import { apiKey } from "./enivronment.js";
import { LowestTemp, HighTemp } from "./highAndLow.js";
import { Search, CityName } from "./searchFunctions.js";
import { CurrentTime } from "./currentTime.js";
import { TimeOnly } from "./timOnly.js";
import { ChangeIcon } from "./changeIcon.js";
import { WeekDays, FindDay, FindDay2 } from "./weekDayFunctions.js";
import { updateFav, updatePast } from "./updateFav.js";

let title = document.getElementById("title");
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
let currHL = document.getElementById("currHL");
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
let pastSearchInject = document.getElementById("pastSearchInject");
let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
let dots1 = document.getElementById("dots1");
let dots2 = document.getElementById("dots2");
let dots3 = document.getElementById("dots3");
let firstHrTime = document.getElementById("firstHrTime");
let secondHrTime = document.getElementById("secondHrTime");
let thirdHrTime = document.getElementById("thirdHrTime");
let headerBg = document.getElementById("headerBg");
let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let offcanvasExample = document.getElementById("offcanvasExample");
let offcanvasExampleLabel = document.getElementById("offcanvasExampleLabel");
let split1 = document.getElementById("split1");
let split2 = document.getElementById("split2");
let split3 = document.getElementById("split3");
let split4 = document.getElementById("split4");
let split5 = document.getElementById("split5");
let day1box = document.getElementById("day1box");
let day2box = document.getElementById("day2box");
let day3box = document.getElementById("day3box");
let day4box = document.getElementById("day4box");
let day5box = document.getElementById("day5box");
let injectMoreInfo = document.getElementById("injectMoreInfo");

let currCityName;
let favArray = [];
let pastSearchArray = []
let heart = heartBtn.src;
let searched = false;
let fiveDayData;
let weekDayArray = [];
let day1Max;
let day2Max;
let day3Max;
let day4Max;
let day5Max;

if (localStorage.getItem("favorites")) {
    favArray = JSON.parse(localStorage.getItem("favorites"));
    console.log(favArray.length)
}
if (localStorage.getItem("pastSearches")) {
    pastSearchArray = JSON.parse(localStorage.getItem("pastSearches"));
}

updateFav();
updatePast();

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
    currHL.innerText = "H: " + Math.floor(data.main.temp_max) + "°F" + " L: " + Math.floor(data.main.temp_min) + "°F";
    let dayValue = new Date(CurrentTime(data.dt)).getDay();

    weekDayArray = WeekDays(FindDay(dayValue));
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

    fiveDayData = data;

    firstHrTemp.innerText = Math.floor((data.list[0].main.temp)) + "°";
    firstHrIcon.src = ChangeIcon(data.list[0].weather[0].icon);

    secondHrTemp.innerText = Math.floor((data.list[2].main.temp)) + "°";
    secondHrIcon.src = ChangeIcon(data.list[2].weather[0].icon);

    thirdHrTemp.innerText = Math.floor((data.list[4].main.temp)) + "°";
    thirdHrIcon.src = ChangeIcon(data.list[4].weather[0].icon);


    //Displaying Max temps for 5 day forecast
    highTemp1.innerText = Math.floor(HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max)) + "°F";

    day1Max = Math.floor(HighTemp(data.list[0].main.temp_max, data.list[1].main.temp_max, data.list[2].main.temp_max, data.list[3].main.temp_max, data.list[4].main.temp_max, data.list[5].main.temp_max, data.list[6].main.temp_max, data.list[7].main.temp_max));


    highTemp2.innerText = Math.floor(HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max)) + "°F";

    day2Max = Math.floor(HighTemp(data.list[8].main.temp_max, data.list[9].main.temp_max, data.list[10].main.temp_max, data.list[11].main.temp_max, data.list[12].main.temp_max, data.list[13].main.temp_max, data.list[14].main.temp_max, data.list[15].main.temp_max));


    highTemp3.innerText = Math.floor(HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max)) + "°F";

    day3Max = Math.floor(HighTemp(data.list[16].main.temp_max, data.list[17].main.temp_max, data.list[18].main.temp_max, data.list[19].main.temp_max, data.list[20].main.temp_max, data.list[21].main.temp_max, data.list[22].main.temp_max, data.list[23].main.temp_max));


    highTemp4.innerText = Math.floor(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max)) + "°F";

    day4Max = Math.floor(HighTemp(data.list[24].main.temp_max, data.list[25].main.temp_max, data.list[26].main.temp_max, data.list[27].main.temp_max, data.list[28].main.temp_max, data.list[29].main.temp_max, data.list[30].main.temp_max, data.list[31].main.temp_max));

    highTemp5.innerText = Math.floor(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max)) + "°F";

    day5Max = Math.floor(HighTemp(data.list[32].main.temp_max, data.list[33].main.temp_max, data.list[34].main.temp_max, data.list[35].main.temp_max, data.list[36].main.temp_max, data.list[37].main.temp_max, data.list[38].main.temp_max, data.list[39].main.temp_max));

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
    let input2 = userInput.value;
    let search = false;

    for (let i = 0; i < cityList.length; i++) {
        let city = cityList[i].name.toLowerCase();

        if (input === city) {
            search = true;
        }
    }
    if (search === true) {
        Search(input);
        pastSearchArray.push(input2);
        console.log(pastSearchArray);
        localStorage.setItem("pastSearches", JSON.stringify(pastSearchArray));
        pastSearchInject.innerHTML = "";
        updatePast();
        searched = true;
    } else {
        body.className = "modal-open bodyBg";
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


sun.addEventListener('click', function (e) {
    if (moon.src === moon.src) {
        sun.src = "";
        moon.src = "./assets/full-moon-symbol.svg";
        title.className = "philosopher white";
        currCity.className = "white";
        currTemp.className = "philosopher white";
        currWeather.className = "philosopher white";
        currHL.className = "philosopher white";
        currDay.className = "card-title roboto locationSize white";
        currTime.className = "card-title roboto locationSize white";
        dots1.className = "dots white";
        dots2.className = "dotLine white";
        dots3.className = "dotLine white";
        firstHrTime.className = "roboto2 white";
        secondHrTime.className = "roboto2 white";
        thirdHrTime.className = "roboto2 white";
        firstHrTemp.className = "philosopher2 white";
        secondHrTemp.className = "philosopher2 white";
        thirdHrTemp.className = "philosopher2 white";
        weekDay1.className = "card-title roboto3 white";
        weekDay2.className = "card-title roboto3 white";
        weekDay3.className = "card-title roboto3 white";
        weekDay4.className = "card-title roboto3 white";
        weekDay5.className = "card-title roboto3 white";
        highTemp1.className = "white";
        highTemp2.className = "white";
        highTemp3.className = "white";
        highTemp4.className = "white";
        highTemp5.className = "white";
        lowTemp1.className = "white";
        lowTemp2.className = "white";
        lowTemp3.className = "white";
        lowTemp4.className = "white";
        lowTemp5.className = "white";
        headerBg.className = "row headerBg2 py-2";
        card1.className = "card borderR headerBg2";
        card2.className = "card borderR headerBg2";
        offcanvasExample.className = "offcanvas offcanvas-start headerBg2";
        offcanvasExampleLabel.className = "offcanvas-title white";
        day1box.className = "card borderR forecastOpacity2";
        day2box.className = "card borderR forecastOpacity2";
        day3box.className = "card borderR forecastOpacity2";
        day4box.className = "card borderR forecastOpacity2";
        day5box.className = "card borderR forecastOpacity2";
        split1.className = "card-text roboto4 white";
        split2.className = "card-text roboto4 white";
        split3.className = "card-text roboto4 white";
        split4.className = "card-text roboto4 white";
        split5.className = "card-text roboto4 white";
        body.className = "bodyBg2"
    }
})

moon.addEventListener('click', function (e) {
    if (sun.src === sun.src) {
        moon.src = "";
        sun.src = "./assets/sun-symbol.svg";
    }
})

function AddPastSearch(inject, search) {
    let li = document.createElement("li");

    let a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.innerText = search;

    li.appendChild(a);

    li.addEventListener('click', function (e) {
        Search(search);
        searched = true;
    })

    inject.appendChild(li);
}

console.log(injectMoreInfo.innerHTML);
day1box.addEventListener('click', function (e) {
    if (injectMoreInfo.innerHTML === "") {
        injectMoreInfo.innerHTML = "";

        let p = document.createElement("p");
        p.className = "dots";
        p.innerText = "..............................................";

        let dayH1 = document.createElement("h1");
        dayH1.className = "locationSize roboto";
        dayH1.innerText = FindDay2(weekDayArray[0]).toUpperCase();

        let h4Description = document.createElement("h4");

        h4Description.className = "roboto3";
        for (let i = 0; i < 8; i++) {

            let maxTemp = Math.floor(fiveDayData.list[i].main.temp_max);
            if (maxTemp === day1Max) {
                h4Description.innerText = fiveDayData.list[i].weather[0].description;
            }
        }

        let firstCol6 = document.createElement("div");
        firstCol6.className = "col-6";

        firstCol6.appendChild(dayH1);
        firstCol6.appendChild(p);
        firstCol6.appendChild(h4Description);

        let img1 = document.createElement("img");
        img1.className = "threeHrIcon";
        img1.alt = "a weather icon";
        img1.src = ChangeIcon(fiveDayData.list[1].weather[0].icon);


        let img1Div = document.createElement("div");
        img1Div.className = "center";

        img1Div.appendChild(img1);

        let time1 = document.createElement("h4");
        time1.className = "roboto2";
        time1.innerText = "8am";

        let time1Temp = document.createElement("h1");
        time1Temp.className = "philosopher2";
        time1Temp.innerText = Math.floor(fiveDayData.list[1].main.temp_max) + "°";


        let time1Col = document.createElement("div");
        time1Col.className = "col";

        time1Col.appendChild(time1);
        time1Col.appendChild(img1Div);
        time1Col.appendChild(time1Temp);

        let dot1 = document.createElement("div");
        dot1.className = "dotLine";
        dot1.innerText = "......................"

        let img2 = document.createElement("img");
        img2.className = "threeHrIcon";
        img2.alt = "a weather icon";
        img2.src = ChangeIcon(fiveDayData.list[3].weather[0].icon);


        let img2Div = document.createElement("div");
        img2Div.className = "center";

        img2Div.appendChild(img2);

        let time2 = document.createElement("h4");
        time2.className = "roboto2";
        time2.innerText = "12pm";

        let time2Temp = document.createElement("h1");
        time2Temp.className = "philosopher2";
        time2Temp.innerText = Math.floor(fiveDayData.list[3].main.temp_max) + "°";


        let time2Col = document.createElement("div");
        time2Col.className = "col";

        time2Col.appendChild(time2);
        time2Col.appendChild(img2Div);
        time2Col.appendChild(time2Temp);

        let dot2 = document.createElement("div");
        dot2.className = "dotLine";
        dot2.innerText = "......................"


        let img3 = document.createElement("img");
        img3.className = "threeHrIcon";
        img3.alt = "a weather icon";
        img3.src = ChangeIcon(fiveDayData.list[6].weather[0].icon);


        let img3Div = document.createElement("div");
        img3Div.className = "center";

        img3Div.appendChild(img3);

        let time3 = document.createElement("h4");
        time3.className = "roboto2";
        time3.innerText = "8pm";

        let time3Temp = document.createElement("h1");
        time3Temp.className = "philosopher2";
        time3Temp.innerText = Math.floor(fiveDayData.list[6].main.temp_max) + "°";


        let time3Col = document.createElement("div");
        time3Col.className = "col";

        time3Col.appendChild(time3);
        time3Col.appendChild(img3Div);
        time3Col.appendChild(time3Temp);

        let innerRow = document.createElement("div");
        innerRow.className = "row";

        innerRow.appendChild(time1Col);
        innerRow.appendChild(dot1);
        innerRow.appendChild(time2Col);
        innerRow.appendChild(dot2);
        innerRow.appendChild(time3Col);

        let secondCol6 = document.createElement("div");
        secondCol6.className = "col-6";

        secondCol6.appendChild(innerRow);

        let outerRow = document.createElement("div");
        outerRow.className = "row";

        outerRow.appendChild(firstCol6);
        outerRow.appendChild(secondCol6);

        let card = document.createElement("div");
        card.className = "card mt-4 headerBg infoPadding";

        card.appendChild(outerRow);

        let lastCol = document.createElement("div");
        lastCol.className = "col";

        lastCol.appendChild(card);

        injectMoreInfo.appendChild(lastCol);

    } else {
        injectMoreInfo.innerHTML = "";
    }

})

day2box.addEventListener('click', function (e) {
    console.log("2");
    if (injectMoreInfo.innerHTML === "") {
        injectMoreInfo.innerHTML = "";

        let p = document.createElement("p");
        p.className = "dots";
        p.innerText = "..............................................";

        let dayH1 = document.createElement("h1");
        dayH1.className = "locationSize roboto";
        dayH1.innerText = FindDay2(weekDayArray[1]).toUpperCase();

        let h4Description = document.createElement("h4");

        h4Description.className = "roboto3";
        for (let i = 8; i < 16; i++) {

            let maxTemp = Math.floor(fiveDayData.list[i].main.temp_max);
            if (maxTemp === day2Max) {
                h4Description.innerText = fiveDayData.list[i].weather[0].description;
            }
        }

        let firstCol6 = document.createElement("div");
        firstCol6.className = "col-6";

        firstCol6.appendChild(dayH1);
        firstCol6.appendChild(p);
        firstCol6.appendChild(h4Description);

        let img1 = document.createElement("img");
        img1.className = "threeHrIcon";
        img1.alt = "a weather icon";
        img1.src = ChangeIcon(fiveDayData.list[9].weather[0].icon);


        let img1Div = document.createElement("div");
        img1Div.className = "center";

        img1Div.appendChild(img1);

        let time1 = document.createElement("h4");
        time1.className = "roboto2";
        time1.innerText = "8am";

        let time1Temp = document.createElement("h1");
        time1Temp.className = "philosopher2";
        time1Temp.innerText = Math.floor(fiveDayData.list[9].main.temp_max) + "°";


        let time1Col = document.createElement("div");
        time1Col.className = "col";

        time1Col.appendChild(time1);
        time1Col.appendChild(img1Div);
        time1Col.appendChild(time1Temp);

        let dot1 = document.createElement("div");
        dot1.className = "dotLine";
        dot1.innerText = "......................"

        let img2 = document.createElement("img");
        img2.className = "threeHrIcon";
        img2.alt = "a weather icon";
        img2.src = ChangeIcon(fiveDayData.list[12].weather[0].icon);


        let img2Div = document.createElement("div");
        img2Div.className = "center";

        img2Div.appendChild(img2);

        let time2 = document.createElement("h4");
        time2.className = "roboto2";
        time2.innerText = "12pm";

        let time2Temp = document.createElement("h1");
        time2Temp.className = "philosopher2";
        time2Temp.innerText = Math.floor(fiveDayData.list[12].main.temp_max) + "°";


        let time2Col = document.createElement("div");
        time2Col.className = "col";

        time2Col.appendChild(time2);
        time2Col.appendChild(img2Div);
        time2Col.appendChild(time2Temp);

        let dot2 = document.createElement("div");
        dot2.className = "dotLine";
        dot2.innerText = "......................"


        let img3 = document.createElement("img");
        img3.className = "threeHrIcon";
        img3.alt = "a weather icon";
        img3.src = ChangeIcon(fiveDayData.list[15].weather[0].icon);


        let img3Div = document.createElement("div");
        img3Div.className = "center";

        img3Div.appendChild(img3);

        let time3 = document.createElement("h4");
        time3.className = "roboto2";
        time3.innerText = "8pm";

        let time3Temp = document.createElement("h1");
        time3Temp.className = "philosopher2";
        time3Temp.innerText = Math.floor(fiveDayData.list[15].main.temp_max) + "°";


        let time3Col = document.createElement("div");
        time3Col.className = "col";

        time3Col.appendChild(time3);
        time3Col.appendChild(img3Div);
        time3Col.appendChild(time3Temp);

        let innerRow = document.createElement("div");
        innerRow.className = "row";

        innerRow.appendChild(time1Col);
        innerRow.appendChild(dot1);
        innerRow.appendChild(time2Col);
        innerRow.appendChild(dot2);
        innerRow.appendChild(time3Col);

        let secondCol6 = document.createElement("div");
        secondCol6.className = "col-6";

        secondCol6.appendChild(innerRow);

        let outerRow = document.createElement("div");
        outerRow.className = "row";

        outerRow.appendChild(firstCol6);
        outerRow.appendChild(secondCol6);

        let card = document.createElement("div");
        card.className = "card mt-4 headerBg infoPadding";

        card.appendChild(outerRow);

        let lastCol = document.createElement("div");
        lastCol.className = "col";

        lastCol.appendChild(card);

        injectMoreInfo.appendChild(lastCol);

    } else {
        injectMoreInfo.innerHTML = "";
    }

})

day3box.addEventListener('click', function (e) {
    if (injectMoreInfo.innerHTML === "") {
        injectMoreInfo.innerHTML = "";

        let p = document.createElement("p");
        p.className = "dots";
        p.innerText = "..............................................";

        let dayH1 = document.createElement("h1");
        dayH1.className = "locationSize roboto";
        dayH1.innerText = FindDay2(weekDayArray[2]).toUpperCase();

        let h4Description = document.createElement("h4");

        h4Description.className = "roboto3";
        for (let i = 16; i < 24; i++) {

            let maxTemp = Math.floor(fiveDayData.list[i].main.temp_max);
            if (maxTemp === day3Max) {
                h4Description.innerText = fiveDayData.list[i].weather[0].description;
            }
        }

        let firstCol6 = document.createElement("div");
        firstCol6.className = "col-6";

        firstCol6.appendChild(dayH1);
        firstCol6.appendChild(p);
        firstCol6.appendChild(h4Description);

        let img1 = document.createElement("img");
        img1.className = "threeHrIcon";
        img1.alt = "a weather icon";
        img1.src = ChangeIcon(fiveDayData.list[17].weather[0].icon);


        let img1Div = document.createElement("div");
        img1Div.className = "center";

        img1Div.appendChild(img1);

        let time1 = document.createElement("h4");
        time1.className = "roboto2";
        time1.innerText = "8am";

        let time1Temp = document.createElement("h1");
        time1Temp.className = "philosopher2";
        time1Temp.innerText = Math.floor(fiveDayData.list[17].main.temp_max) + "°";


        let time1Col = document.createElement("div");
        time1Col.className = "col";

        time1Col.appendChild(time1);
        time1Col.appendChild(img1Div);
        time1Col.appendChild(time1Temp);

        let dot1 = document.createElement("div");
        dot1.className = "dotLine";
        dot1.innerText = "......................"

        let img2 = document.createElement("img");
        img2.className = "threeHrIcon";
        img2.alt = "a weather icon";
        img2.src = ChangeIcon(fiveDayData.list[20].weather[0].icon);


        let img2Div = document.createElement("div");
        img2Div.className = "center";

        img2Div.appendChild(img2);

        let time2 = document.createElement("h4");
        time2.className = "roboto2";
        time2.innerText = "12pm";

        let time2Temp = document.createElement("h1");
        time2Temp.className = "philosopher2";
        time2Temp.innerText = Math.floor(fiveDayData.list[20].main.temp_max) + "°";


        let time2Col = document.createElement("div");
        time2Col.className = "col";

        time2Col.appendChild(time2);
        time2Col.appendChild(img2Div);
        time2Col.appendChild(time2Temp);

        let dot2 = document.createElement("div");
        dot2.className = "dotLine";
        dot2.innerText = "......................"


        let img3 = document.createElement("img");
        img3.className = "threeHrIcon";
        img3.alt = "a weather icon";
        img3.src = ChangeIcon(fiveDayData.list[23].weather[0].icon);


        let img3Div = document.createElement("div");
        img3Div.className = "center";

        img3Div.appendChild(img3);

        let time3 = document.createElement("h4");
        time3.className = "roboto2";
        time3.innerText = "8pm";

        let time3Temp = document.createElement("h1");
        time3Temp.className = "philosopher2";
        time3Temp.innerText = Math.floor(fiveDayData.list[23].main.temp_max) + "°";


        let time3Col = document.createElement("div");
        time3Col.className = "col";

        time3Col.appendChild(time3);
        time3Col.appendChild(img3Div);
        time3Col.appendChild(time3Temp);

        let innerRow = document.createElement("div");
        innerRow.className = "row";

        innerRow.appendChild(time1Col);
        innerRow.appendChild(dot1);
        innerRow.appendChild(time2Col);
        innerRow.appendChild(dot2);
        innerRow.appendChild(time3Col);

        let secondCol6 = document.createElement("div");
        secondCol6.className = "col-6";

        secondCol6.appendChild(innerRow);

        let outerRow = document.createElement("div");
        outerRow.className = "row";

        outerRow.appendChild(firstCol6);
        outerRow.appendChild(secondCol6);

        let card = document.createElement("div");
        card.className = "card mt-4 headerBg infoPadding";

        card.appendChild(outerRow);

        let lastCol = document.createElement("div");
        lastCol.className = "col";

        lastCol.appendChild(card);

        injectMoreInfo.appendChild(lastCol);

    } else {
        injectMoreInfo.innerHTML = "";
    }

})

day4box.addEventListener('click', function (e) {
    if(injectMoreInfo.innerHTML === ""){
    injectMoreInfo.innerHTML = "";

    let p = document.createElement("p");
    p.className = "dots";
    p.innerText = "..............................................";

    let dayH1 = document.createElement("h1");
    dayH1.className = "locationSize roboto";
    dayH1.innerText = FindDay2(weekDayArray[3]).toUpperCase();

    let h4Description = document.createElement("h4");

    h4Description.className = "roboto3";
    for (let i = 24; i < 32; i++) {

        let maxTemp = Math.floor(fiveDayData.list[i].main.temp_max);
        if (maxTemp === day4Max) {
            h4Description.innerText = fiveDayData.list[i].weather[0].description;
        }
    }

    let firstCol6 = document.createElement("div");
    firstCol6.className = "col-6";

    firstCol6.appendChild(dayH1);
    firstCol6.appendChild(p);
    firstCol6.appendChild(h4Description);

    let img1 = document.createElement("img");
    img1.className = "threeHrIcon";
    img1.alt = "a weather icon";
    img1.src = ChangeIcon(fiveDayData.list[25].weather[0].icon);


    let img1Div = document.createElement("div");
    img1Div.className = "center";

    img1Div.appendChild(img1);

    let time1 = document.createElement("h4");
    time1.className = "roboto2";
    time1.innerText = "8am";

    let time1Temp = document.createElement("h1");
    time1Temp.className = "philosopher2";
    time1Temp.innerText = Math.floor(fiveDayData.list[25].main.temp_max) + "°";


    let time1Col = document.createElement("div");
    time1Col.className = "col";

    time1Col.appendChild(time1);
    time1Col.appendChild(img1Div);
    time1Col.appendChild(time1Temp);

    let dot1 = document.createElement("div");
    dot1.className = "dotLine";
    dot1.innerText = "......................"

    let img2 = document.createElement("img");
    img2.className = "threeHrIcon";
    img2.alt = "a weather icon";
    img2.src = ChangeIcon(fiveDayData.list[28].weather[0].icon);


    let img2Div = document.createElement("div");
    img2Div.className = "center";

    img2Div.appendChild(img2);

    let time2 = document.createElement("h4");
    time2.className = "roboto2";
    time2.innerText = "12pm";

    let time2Temp = document.createElement("h1");
    time2Temp.className = "philosopher2";
    time2Temp.innerText = Math.floor(fiveDayData.list[28].main.temp_max) + "°";


    let time2Col = document.createElement("div");
    time2Col.className = "col";

    time2Col.appendChild(time2);
    time2Col.appendChild(img2Div);
    time2Col.appendChild(time2Temp);

    let dot2 = document.createElement("div");
    dot2.className = "dotLine";
    dot2.innerText = "......................"


    let img3 = document.createElement("img");
    img3.className = "threeHrIcon";
    img3.alt = "a weather icon";
    img3.src = ChangeIcon(fiveDayData.list[31].weather[0].icon);


    let img3Div = document.createElement("div");
    img3Div.className = "center";

    img3Div.appendChild(img3);

    let time3 = document.createElement("h4");
    time3.className = "roboto2";
    time3.innerText = "8pm";

    let time3Temp = document.createElement("h1");
    time3Temp.className = "philosopher2";
    time3Temp.innerText = Math.floor(fiveDayData.list[31].main.temp_max) + "°";


    let time3Col = document.createElement("div");
    time3Col.className = "col";

    time3Col.appendChild(time3);
    time3Col.appendChild(img3Div);
    time3Col.appendChild(time3Temp);

    let innerRow = document.createElement("div");
    innerRow.className = "row";

    innerRow.appendChild(time1Col);
    innerRow.appendChild(dot1);
    innerRow.appendChild(time2Col);
    innerRow.appendChild(dot2);
    innerRow.appendChild(time3Col);

    let secondCol6 = document.createElement("div");
    secondCol6.className = "col-6";
    
    secondCol6.appendChild(innerRow);

    let outerRow = document.createElement("div");
    outerRow.className = "row";

    outerRow.appendChild(firstCol6);
    outerRow.appendChild(secondCol6);

    let card = document.createElement("div");
    card.className = "card mt-4 headerBg infoPadding";

    card.appendChild(outerRow);

    let lastCol = document.createElement("div");
    lastCol.className = "col";

    lastCol.appendChild(card);

    injectMoreInfo.appendChild(lastCol);

}else{
    injectMoreInfo.innerHTML = "";
}

})

day5box.addEventListener('click', function (e) {
    if(injectMoreInfo.innerHTML === ""){
    injectMoreInfo.innerHTML = "";

    let p = document.createElement("p");
    p.className = "dots";
    p.innerText = "..............................................";

    let dayH1 = document.createElement("h1");
    dayH1.className = "locationSize roboto";
    dayH1.innerText = FindDay2(weekDayArray[4]).toUpperCase();

    let h4Description = document.createElement("h4");

    h4Description.className = "roboto3";
    for (let i = 32; i < 40; i++) {

        let maxTemp = Math.floor(fiveDayData.list[i].main.temp_max);
        if (maxTemp === day5Max) {
            h4Description.innerText = fiveDayData.list[i].weather[0].description;
        }
    }

    let firstCol6 = document.createElement("div");
    firstCol6.className = "col-6";

    firstCol6.appendChild(dayH1);
    firstCol6.appendChild(p);
    firstCol6.appendChild(h4Description);

    let img1 = document.createElement("img");
    img1.className = "threeHrIcon";
    img1.alt = "a weather icon";
    img1.src = ChangeIcon(fiveDayData.list[33].weather[0].icon);


    let img1Div = document.createElement("div");
    img1Div.className = "center";

    img1Div.appendChild(img1);

    let time1 = document.createElement("h4");
    time1.className = "roboto2";
    time1.innerText = "8am";

    let time1Temp = document.createElement("h1");
    time1Temp.className = "philosopher2";
    time1Temp.innerText = Math.floor(fiveDayData.list[33].main.temp_max) + "°";


    let time1Col = document.createElement("div");
    time1Col.className = "col";

    time1Col.appendChild(time1);
    time1Col.appendChild(img1Div);
    time1Col.appendChild(time1Temp);

    let dot1 = document.createElement("div");
    dot1.className = "dotLine";
    dot1.innerText = "......................"

    let img2 = document.createElement("img");
    img2.className = "threeHrIcon";
    img2.alt = "a weather icon";
    img2.src = ChangeIcon(fiveDayData.list[35].weather[0].icon);


    let img2Div = document.createElement("div");
    img2Div.className = "center";

    img2Div.appendChild(img2);

    let time2 = document.createElement("h4");
    time2.className = "roboto2";
    time2.innerText = "12pm";

    let time2Temp = document.createElement("h1");
    time2Temp.className = "philosopher2";
    time2Temp.innerText = Math.floor(fiveDayData.list[35].main.temp_max) + "°";


    let time2Col = document.createElement("div");
    time2Col.className = "col";

    time2Col.appendChild(time2);
    time2Col.appendChild(img2Div);
    time2Col.appendChild(time2Temp);

    let dot2 = document.createElement("div");
    dot2.className = "dotLine";
    dot2.innerText = "......................"


    let img3 = document.createElement("img");
    img3.className = "threeHrIcon";
    img3.alt = "a weather icon";
    img3.src = ChangeIcon(fiveDayData.list[39].weather[0].icon);


    let img3Div = document.createElement("div");
    img3Div.className = "center";

    img3Div.appendChild(img3);

    let time3 = document.createElement("h4");
    time3.className = "roboto2";
    time3.innerText = "8pm";

    let time3Temp = document.createElement("h1");
    time3Temp.className = "philosopher2";
    time3Temp.innerText = Math.floor(fiveDayData.list[39].main.temp_max) + "°";


    let time3Col = document.createElement("div");
    time3Col.className = "col";

    time3Col.appendChild(time3);
    time3Col.appendChild(img3Div);
    time3Col.appendChild(time3Temp);

    let innerRow = document.createElement("div");
    innerRow.className = "row";

    innerRow.appendChild(time1Col);
    innerRow.appendChild(dot1);
    innerRow.appendChild(time2Col);
    innerRow.appendChild(dot2);
    innerRow.appendChild(time3Col);

    let secondCol6 = document.createElement("div");
    secondCol6.className = "col-6";
    
    secondCol6.appendChild(innerRow);

    let outerRow = document.createElement("div");
    outerRow.className = "row";

    outerRow.appendChild(firstCol6);
    outerRow.appendChild(secondCol6);

    let card = document.createElement("div");
    card.className = "card mt-4 headerBg infoPadding";

    card.appendChild(outerRow);

    let lastCol = document.createElement("div");
    lastCol.className = "col";

    lastCol.appendChild(card);

    injectMoreInfo.appendChild(lastCol);

}else{
    injectMoreInfo.innerHTML = "";
}

})





export { favArray, pastSearchArray, AddPastSearch }