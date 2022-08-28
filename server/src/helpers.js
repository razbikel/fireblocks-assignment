const moment = require('moment');
const path = require('path');
const fs = require('fs');

const getDayName = (date) => {
    let day =  moment(date , 'DD/MM/YYYY').isoWeekday();
    switch(day){
        case 1:
            return "Monday";
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        case 7:
            return "Sunday";
        default:
            return "";
    }
}

const getWeekDates = (date) => {
    try{
        let today = moment(date).subtract(1, 'day').format("DD/MM/YYYY");
        let week_dates = [0,1,2,3,4,5,6].map( day => {
            return moment(date).add(day, 'day').format("DD/MM/YYYY")
        })
        return [today, ...week_dates];
    }
    catch(e){
        return [];
    }

}

const getReservationByDate = (date) => {
    let reservations_string = fs.readFileSync(path.join(__dirname, '.', 'data', 'reservations.json'));
    let reservations = JSON.parse(reservations_string);
    let dateReservations = reservations.map(reservation => {
        return reservation.date === date ? reservation : undefined
    }).filter(value => value !== undefined);
    if(dateReservations.length > 0){
        return dateReservations.map(reservation => {
            let dayName = getDayName(reservation.date);
            return { ...reservation, dayName }
        })
    }
    else{
        return [];
    }
}


const findUserReservations = (weekReservations, user_id) => {
    let res = [];
    Object.keys(weekReservations).map(date => {
        let dayReservations = weekReservations[date];
        dayReservations.forEach(reservation => {
            if(reservation.user_id === user_id){
                res.push(reservation);
            }
        })
    })
    return res;
}

const writeToJsonFile = (filename, reservations) => {
    return new Promise((resolve, reject) => {
    
        fs.writeFile(path.join(__dirname, '.', 'data', `${filename}.json`), JSON.stringify(reservations), 'utf8', async()=>{
            console.log(``);
            resolve();
        }); 
    })
}

module.exports = {
    getDayName,
    getWeekDates,
    getReservationByDate,
    findUserReservations,
    writeToJsonFile
}