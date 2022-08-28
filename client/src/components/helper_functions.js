export const isStationAvailable = (station_id, reservations, day) => {
    let res = { available: true }

    if(reservations.weekReservations){
        let day_reservations = reservations.weekReservations[day];
        if(day_reservations){
            day_reservations.forEach(reservation => {
                if(reservation.station_id === station_id){
                    res["available"] = false;
                    res["user_id"] = reservation["user_id"]
                }
            })
        }
        return res;
    }
}

export const isUserDayReservation = (reservations, user, day) => {
    let res = false;
    let dayReservations = reservations.weekReservations[day];
    dayReservations.forEach(reservation => {
        if(reservation.user_id === user.id.toString()){
            res = true;
        }
    })
    return res;
}