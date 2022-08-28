import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import moment from "moment";
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const ComputerStation = (props) => {
    const date = useSelector((state) => state.date).date
    const user = useSelector((state) => state.user).user
    const reservations = useSelector((state) => state.reservations).reservations
    const day = useSelector((state) => state.day).day

    const dispatch = useDispatch()

    const default_style = {
        width:"110px",
        height:"81px",
        border:"1px solid black",
        flex: "0 0 26%",
        marginRight: "20px",
        marginTop: "40px",
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline"
    }

    const fetchReservations = async (date, user) => {
        dispatch({type: "reservationsUpdate",data: {} })
        let res = await axios.post('http://localhost:8000/reservations/get-reservations', {
          user_id: user.id.toString(),
          date
        })
        dispatch({type: "reservationsUpdate",data:res.data })
      }

    const isStationAvailable = (station_id) => {
        let res = { available: true }

        if(reservations.weekReservations){
            let day_reservations = reservations.weekReservations[day];
            console.log(`***BP2 day_reservations in ${day}`, day_reservations)
            if(day_reservations){
                day_reservations.forEach(reservation => {
                    if(reservation.station_id === station_id){
                        res["available"] = false;
                        res["user_id"] = reservation["user_id"]
                    }
                })
            }
            console.log(`***BP1 ${station_id} is available in ${day}`, res);
            return res;
        }
    }

    const addReservation = async (station_id, is_available) => {
        if(is_available.available ){
            let user_id = user.id.toString();
            let choosen_date = moment(day , 'DD/MM/YYYY').add(1, 'day').format();
            try{
                await axios.post('http://localhost:8000/reservations/add-reservation',{
                    user_id,
                    date: choosen_date,
                    station_id,
                });
                await fetchReservations(date, user)   
            }
            catch(e){
                console.log(e);
            }
        }
    }


    const deleteReservation = async (station_id, user_id) => {
        let choosen_date = moment(day , 'DD/MM/YYYY').add(1, 'day').format();
        try{
            await axios.post('http://localhost:8000/reservations/delete-reservation',{
                user_id,
                date: choosen_date,
                station_id,
            });
            await fetchReservations(date, user)   
        }
        catch(e){
            console.log(e);
        }

    }

    const isUserDayReservation = () => {
        let res = true;
        if(reservations && reservations.userWeekReservations){
            reservations.userWeekReservations.forEach(reservation => {
                if(reservation.date === day){
                    res = false;
                }
            })
        }
        return res;
    }

    console.log('***reservations', reservations);


    let is_available = isStationAvailable(props.id)

    let style = is_available && is_available.available ? {...default_style, backgroundColor: "lightGreen", cursor: "pointer"} :
                is_available && is_available.user_id === user.id.toString() ? {...default_style, backgroundColor: "lightBlue"} :
                {...default_style, backgroundColor: "#E55451"}

    let icon = is_available && is_available.available ? <EventAvailableIcon /> :
                is_available && is_available.user_id === user.id.toString() ? <EventSeatIcon /> :
                <EventBusyIcon />

    let station_footer = is_available && is_available.available ? <Typography sx={{fontSize:"10px", color:"blue", textDecoration: "underline"}}>click to reserve</Typography> :
                is_available && is_available.user_id === user.id.toString() ? <Typography sx={{fontSize:"10px"}}>reserved by you</Typography> :
                <Typography sx={{fontSize:"10px"}}>station unavailable</Typography>

    let show_delete_icon = user.name === "admin" && is_available && !is_available.available && is_available.user_id !== user.id.toString();


    return(
        <Box
        sx={style}
        onClick={() => addReservation(props.id, is_available)}
        >
            {
                show_delete_icon ?
                <DeleteForeverIcon
                    sx={{width:"15px", paddingLeft:"3px", cursor:"pointer"}}
                    onClick={() => deleteReservation(props.id, is_available.user_id)}
                 /> : null
            }
            <Box sx={{margin: !show_delete_icon ? 'auto': ''}}>
                <Typography variant="h5">{`${props.id}`}</Typography>
                {icon}
                {station_footer}
            </Box>
        </Box>
    )
}

export default ComputerStation;

