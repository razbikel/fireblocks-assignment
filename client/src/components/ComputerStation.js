import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {isStationAvailable} from './helper_functions';
import {deleteReservation, addReservation} from "./requests";

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


    let is_available = isStationAvailable(props.id, reservations, day)

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
        onClick={() => addReservation(props.id, is_available, reservations, user, day, date, dispatch)}
        >
            {
                show_delete_icon ?
                <DeleteForeverIcon
                    sx={{width:"15px", paddingLeft:"3px", cursor:"pointer"}}
                    onClick={() => deleteReservation(props.id, is_available.user_id, day, date, dispatch, user)}
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

