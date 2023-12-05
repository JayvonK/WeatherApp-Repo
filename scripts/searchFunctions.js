//Search Function
import { apiKey } from "./enivronment.js";
import { KelvinConvert } from "./kelvinConvert.js";
import { LowestTemp, HighTemp } from "./highAndLow.js";

function Search(city){
    SearchCurrent(city, apiKey);
    Search5Day(city, apiKey);

    userInput.value = "";
}


async function SearchCurrent(cityName, k){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${k}`)
    const data = await promise.json();

    data.weather[0].icon = "./assets/icons8-rain-96.png"

    currTemp.innerText = Math.floor(KelvinConvert(data.main.temp));
    mainIcon.src = data.weather[0].icon;
    currCity.textContent = data.name;
    currWeather.innerText = data.weather[0].main;
}

async function Search5Day(cityName, k){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${k}`)
    const data = await promise.json();

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
}

export { Search, Search5Day, SearchCurrent }