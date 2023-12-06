function ChangeIcon(icon){
    switch(icon){
        case "01d":
            return "./assets/wi-day-sunny.svg";
        break;
        case "01n":
            return "./assets/wi-night-clear.svg";
        break;
        case "02n":
            return "./assets/wi-day-cloudy.svg";
        break;
        case "02d":
            return "./assets/wi-night-alt-cloudy.svg";
        break;
        case "03d":
            return "./assets/wi-cloud.svg";
        break;
        case "03n":
            return "./assets/wi-cloud.svg";
        break;
        case "04d":
            return "./assets/wi-cloudy.svg";
        break;
        case "04n":
            return "./assets/wi-cloudy.svg";
        break;
        case "09d":
            return "./assets/wi-day-showers.svg";
        break; 
        case "9n":
            return "./assets/wi-night-alt-showers.svg";
        break;
        case "10d":
            return "./assets/wi-day-rain.svg";
        break;
        case "10n":
            return "./assets/wi-night-alt-rain.svg";
        break;
        case "11d":
            return "./assets/wi-day-thunderstorm.svg";
        break;
        case "11n":
            return "./assets/wi-night-alt-thunderstorm.svg";
        break;
        case "13d":
            return "./assets/wi-day-snow.svg";
        break;
        case "13n":
            return "./assets/wi-night-alt-snow.svg";
        break;
        case "50d":
            return "./assets/wi-day-fog.svg";
        break;
        case "50n":
            return "./assets/wi-night-fog.svg";
        break;
    }
}

export { ChangeIcon }