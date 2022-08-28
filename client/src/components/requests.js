import moment from "moment";
import axios from 'axios';
import {isUserDayReservation} from './helper_functions';

const BASE_URL = 'http://localhost:8000/reservations'


export const deleteReservation = async (station_id, user_id, day, date, dispatch, user) => {
    let choosen_date = moment(day , 'DD/MM/YYYY').add(1, 'day').format();
    try{
        await axios.post(`${BASE_URL}/delete-reservation`,{
            user_id,
            date: choosen_date,
            station_id,
        });
        await fetchReservations(date, user, dispatch)   
    }
    catch(e){
        console.log(e);
    }
}

export const fetchReservations = async (date, user, dispatch) => {
    dispatch({type: "reservationsUpdate",data: {} })
    let res = await axios.post(`${BASE_URL}/get-reservations`, {
      user_id: user.id.toString(),
      date
    })
    dispatch({type: "reservationsUpdate",data:res.data })
  }

  export const addReservation = async (station_id, is_available, reservations, user, day, date, dispatch) => {
    let userAlreadyHasReservationToday = isUserDayReservation(reservations, user, day);
    if(userAlreadyHasReservationToday){
        dispatch({type: "reservationErrorUpdate",data:true })
    }
    else{
        if(is_available.available ){
            let user_id = user.id.toString();
            let choosen_date = moment(day , 'DD/MM/YYYY').add(1, 'day').format();
            try{
                await axios.post(`${BASE_URL}/add-reservation`,{
                    user_id,
                    date: choosen_date,
                    station_id,
                });
                await fetchReservations(date, user, dispatch)   
            }
            catch(e){
                console.log(e);
            }
        }
    }
}