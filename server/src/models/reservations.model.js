const { checkUserDateAvailability, addResevationToUser } = require('./users.model')
const fs = require('fs');
const path = require('path')



const getReservations = () => {
    return [];
}

const addReservation = async (user_id, date, station_id) => {
    let reservations_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'reservations.json'));
    let reservations = JSON.parse(reservations_string);

    // true if station_id is NOT free in date
    const station_reserved_in_date = reservations.map( reservation => {
        if (reservation.date === date){
            return reservation.station_id
        }
        else{
            return -1
        }
    })
    .filter(v => v !== -1)
    .includes(station_id);

    // true if user_id already reserve a station in this day
    const user_reserved_station_for_this_date = checkUserDateAvailability(user_id, date);

    if (!station_reserved_in_date && !user_reserved_station_for_this_date){
        reservations.push({ date, user_id, station_id });
        try{
            await writeToJsonFile('reservations', reservations);
            await addResevationToUser(user_id, date, station_id);
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