export default function convertDate(dateObj) {
    let year = dateObj.slice(0, 4);
    let month = dateObj.slice(5, 7);
    let day = dateObj.slice(8, 10);
    let months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    return months[month].concat(" ", day, ", ", year);
}