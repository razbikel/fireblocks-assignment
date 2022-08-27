
const {getReservations, addReservation, deleteResevation} = require('../../models/reservations.model');


const httpGetReservations = async (req, res) => {
    const {user_id, date} = req.body
    const reservations = getReservations(user_id, date);
    if(reservations.success){
        return res.status(200).json(reservations);
    }
    else{
        return res.status(500).json({
            message: reservations.message
        })
    }
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

const httpDeleteReservations = async (req, res) => {
    let { date, station_id, user_id } = req.body;
    let result = await deleteResevation(date, station_id, user_id);
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
    httpAddReservations,
    httpDeleteReservations
};