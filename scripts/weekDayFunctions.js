function FindDay(day) {
    switch (day) {
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

function WeekDays(day) {

    switch (day) {
        case "Sunday":
            return ["Mon", "Tue", "Wed", "Thu", "Fri"];
            break;
        case "Monday":
            return ["Tue", "Wed", "Thu", "Fri", "Sat"];
            break;
        case "Tuesday":
            return ["Wed", "Thu", "Fri", "Sat", "Sun"];
            break;
        case "Wednesday":
            return ["Thu", "Fri", "Sat", "Sun", "Mon"];
            break;
        case "Thursday":
            return ["Fri", "Sat", "Sun", "Mon", "Tue"];
            break;
        case "Friday":
            return ["Sat", "Sun", "Mon", "Tue", "Wed"];
            break;
        case "Saturday":
            return ["Sun", "Mon", "Tue", "Wed", "Thu"];
            break;
    }
}

export { WeekDays, FindDay }