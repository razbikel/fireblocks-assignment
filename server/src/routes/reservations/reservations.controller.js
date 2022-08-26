
const {getReservations, addReservation} = require('../../models/reservations.model');


const httpGetReservations = async (req, res) => {
    const reservations = getReservations();
    return res.status(200).json(reservations);
}

const httpAddReservations = async (req, res) => {
    let {date, user_id, station_id} = req.body;
    let result = await addReservation(user_id, date, station_id);
    if(result.sucess){
        return res.status(200).json({
            message: result.message
        });
    }
    else{
        return res.status(500).json({
            message: result.message
        })
    }
}


module.exports = {
    httpGetReservations,
    httpAddReservations
};