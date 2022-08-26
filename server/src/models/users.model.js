const fs = require('fs');
const path = require('path')

// let next_id = 1


// const load_users = () => {
//     return new Promise((resolve, reject) => {
//         try{
//             let users_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'));
//             users = JSON.parse(users_string).map(user => {
//                 if(!user.id){
//                     let id = next_id;
//                     next_id += 1;
//                     return { ...user, id}
//                 }
//                 else{
//                     return user
//                 }
//             })
//             resolve();
//         }
//         catch(e){
//             reject(e);
//         }
//     })
// }


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


  module.exports = {
    getUsers,
    // load_users,
    addResevationToUser,
    checkUserDateAvailability
  }