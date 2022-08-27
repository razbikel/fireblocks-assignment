const { checkUserDateAvailability, addResevationToUser } = require('./users.model')
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const getWeekDates = (date) => {
    let today = moment(date).subtract(1, 'day').format("DD/MM/YYYY");
    let week_dates = [0,1,2,3,4,5,6].map( day => {
        return moment(date).add(day, 'day').format("DD/MM/YYYY")
    })
    return [today, ...week_dates];
}

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

const getReservationByDate = (date) => {
    let reservations_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'reservations.json'));
    let reservations = JSON.parse(reservations_string);
    let dateReservations = reservations.map(reservation => {
        return reservation.date === date ? reservation : undefined
    }).filter(value => value !== undefined);
    if(dateReservations.length > 0){
        return dateReservations.map(reservation => {
            let dayName = getDayName(reservation.date);
            // let dayName = ""
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

const getReservations = (user_id, date) => {
    let weekDates = getWeekDates(date);
    let weekReservations = {}
    weekDates.forEach(date => {
        weekReservations = { ...weekReservations, [date]: getReservationByDate(date) }
    })
    let userWeekReservations = findUserReservations(weekReservations, user_id);
    return {weekReservations, userWeekReservations};
}

const addReservation = async (user_id, date, station_id) => {
    let reservations_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'reservations.json'));
    let reservations = JSON.parse(reservations_string);

    let dateKey = moment(date).subtract(1, 'day').format("DD/MM/YYYY");

    // true if station_id is NOT free in date
    const station_reserved_in_date = reservations.map( reservation => {
        if (reservation.date === dateKey){
            return reservation.station_id
        }
        else{
            return -1
        }
    })
    .filter(v => v !== -1)
    .includes(station_id);

    // true if user_id already reserve a station in this day
    const user_reserved_station_for_this_date = checkUserDateAvailability(user_id, dateKey);

    if (!station_reserved_in_date && !user_reserved_station_for_this_date){
        reservations.push({ date: dateKey, user_id, station_id });
        try{
            await writeToJsonFile('reservations', reservations);
            await addResevationToUser(user_id, dateKey, station_id);
            return {
                sucess: true,
                message: "reservation addedd sucessfully"
            };
        }
        catch(e){
            console.log(e);
            return {
                sucess: false,
                message: e.message
            };
        }
    }
    else{
        return {
            sucess: false,
            message: station_reserved_in_date ?
             "station is not available in this date" :
             "user already reserved a station for this date"
        };
    }

}

const deleteResevations = () => {

}


const writeToJsonFile = (filename, reservations) => {
    return new Promise((resolve, reject) => {
    
        fs.writeFile(path.join(__dirname, '..', 'data', `${filename}.json`), JSON.stringify(reservations), 'utf8', async()=>{
            console.log(``);
            resolve();
        }); 
    

    })
}


module.exports = {
    getReservations,
    addReservation
}