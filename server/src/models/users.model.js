const fs = require('fs');
const path = require('path')


const getUsers = () => {
    let users_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'));
    return JSON.parse(users_string);
}

const writeToJsonFile = (user_id, date, station_id) => {
    return new Promise((resolve, reject) => {
        let reservation = {
            date,
            station_id
        };
    
        fs.readFile(path.join(__dirname, '..', 'data', 'users.json'), 'utf8', (err, data) => {
            if (err){
                console.log(err);
                reject();
            } else {
            let users = JSON.parse(data); 
            users[user_id - 1].reservations.push(reservation); 
            fs.writeFile(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(users), 'utf8', async()=>{
                resolve();
            }); 
        }});
    })
}

// return true if user_id already have a reservation for other station in the same date
const checkUserDateAvailability = (user_id, date) => {
    let users_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'));
    let users =  JSON.parse(users_string);
    let user_reservations_dates = users[user_id-1].reservations.map( reservation => {
        return reservation.date
    })
    if(user_reservations_dates.includes(date)){
        return true
    }
    else{
        return false;
    }
}


const addResevationToUser = async (user_id, date, station_id) => {
        await writeToJsonFile(user_id, date, station_id);
}

const deleteReservationToUser = async (user_id, date, station_id) => {
    let users_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'));
    let users = JSON.parse(users_string);
    let user_to_delete;
    let index_to_delete;
    let reservation_index;

    for(let i = 0; i < users.length; i++){
        if(users[i].id === parseInt(user_id)){
            index_to_delete = i;
        }
    }

    if(index_to_delete !== undefined){
        user_to_delete = users[index_to_delete]
        user_to_delete.reservations.forEach((reservation, index) => {
            if(reservation.date === date && reservation.station_id === station_id){
                reservation_index = index;
            }
        })
        if(reservation_index !== undefined){
            let new_reservations = [ ...user_to_delete.reservations];
            new_reservations[reservation_index] = undefined;
            let deletedReservationsArray = new_reservations.filter( reservation => reservation !== undefined);
            users[index_to_delete].reservations = deletedReservationsArray;
            return users;
        }
    }
    else{
        return [];
    }
    
}


  module.exports = {
    getUsers,
    addResevationToUser,
    checkUserDateAvailability,
    deleteReservationToUser
  }