export default function convertTime(militaryTime) {
    let hours = militaryTime.slice(0, 2);
    let minutes = militaryTime.slice(3, 5);

    if (hours == "00") {
        return "12:".concat(minutes, " AM");
    }
    else if (hours < 12) {
        let newHours = parseInt(hours);

        return newHours.toString().concat(":", minutes, " AM");
    }
    else {
        let newHours = parseInt(hours) - 12;

        if (newHours == 0) {
            newHours = 12;
        }

        return newHours.toString().concat(":", minutes, " PM");
    }
}