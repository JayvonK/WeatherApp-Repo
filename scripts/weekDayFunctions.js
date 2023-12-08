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
            return ["MON", "TUE", "WED", "THU", "FRI"];
            break;
        case "Monday":
            return ["TUE", "WED", "THU", "FRI", "SAT"];
            break;
        case "Tuesday":
            return ["WED", "THU", "FRI", "SAT", "SUN"];
            break;
        case "Wednesday":
            return ["THU", "FRI", "SAT", "SUN", "MON"];
            break;
        case "Thursday":
            return ["FRI", "SAT", "SUN", "MON", "TUE"];
            break;
        case "Friday":
            return ["SAT", "SUN", "MON", "TUE", "WED"];
            break;
        case "Saturday":
            return ["SUN", "MON", "TUE", "WED", "THU"];
            break;
    }
}

function FindDay2(day) {
    switch (day) {
        case "SUN":
            return "Sunday";
            break;
        case "MON":
            return "Monday";
            break;
        case "TUE":
            return "Tuesday";
            break;
        case "WED":
            return "Wednesday";
            break;
        case "THU":
            return "Thursday";
            break;
        case "FRI":
            return "Friday";
            break;
        case "SAT":
            return "Saturday";
            break;
    }
}

export { WeekDays, FindDay, FindDay2 }