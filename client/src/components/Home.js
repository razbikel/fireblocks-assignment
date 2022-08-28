import { Typography, Button } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import BasicDatePicker from './MaterialUI/DatePicker';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import BasicSelect from './MaterialUI/DropDownPicker'
import axios from 'axios';
import ComputerStation from './ComputerStation';
import {container_style, selectors_style, room_container_style} from './styles';


const NUMBER_OF_STATIONS = 8;

const Home = () => {
    const date = useSelector((state) => state.date).date
    const user = useSelector((state) => state.user).user
    const reservations = useSelector((state) => state.reservations).reservations
    const day = useSelector((state) => state.day).day
    const reservationError = useSelector((state) => state.reservationError).showError

    const dispatch = useDispatch()

    const [users, setUsers] = useState([]);
    const [currentWeek, setCurrentWeek] = useState([]);
    const [message, setMessage] = useState("select a user and a week to continue");

    const fetchUsers = useCallback(async () => {
        let users = await axios.get('http://localhost:8000/users');
        setUsers(users.data)
    }, [])

    const fetchReservations = async (date, user) => {
        dispatch({type: "reservationsUpdate",data: {} })
        dispatch({type: "dayUpdate",data: undefined })

        let res = await axios.post('http://localhost:8000/reservations/get-reservations', {
          user_id: user.id.toString(),
          date
        })
        dispatch({type: "reservationsUpdate",data:res.data })
        setCurrentWeek(Object.keys(res.data.weekReservations));
        setMessage("select a day to see its stations availability")
      }

    const renderComputers = () => {
        let computers =  Array(NUMBER_OF_STATIONS).fill(0).map(( _ , index) => {
            return (
                <ComputerStation key={index} id={index + 1}/>
            )
        })
        return(
            <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                paddingLeft: "60px"
            }}
            >
                {computers}
            </Box>
        )

    }

    const handleErrorMessage = () => {
        setTimeout(() => {
            dispatch({type: "reservationErrorUpdate",data:false })
        }, 3000)
        return <Typography sx={{fontSize:"14px", color:"red"}}>You have already reserved a station for this day!</Typography>
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return(
        <Box 
        sx={container_style}
        >
            <Typography variant="h1">Computers Room</Typography>
            <Box
            sx={selectors_style}
            >
                <BasicSelect label="user" data={users}/>
                <Button 
                    variant="contained"
                    sx={{width:"140px"}}
                    disabled={date && Object.keys(user).length > 0 ? false : true}
                    onClick={() => fetchReservations(date, user)}
                    >load reservations</Button>
                <BasicDatePicker />
            </Box>
            <Box
            sx={room_container_style}
            >
                <Typography variant="h6">{day}</Typography>
                {
                    Object.keys(reservations).length > 0 && reservations.success ? 
                    <BasicSelect label="day" data={currentWeek}/> :
                    null
                }
                { reservationError? handleErrorMessage() : null }
                {
                    day ? 
                    renderComputers() : 
                    <Typography variant="h5" sx={{marginTop:"150px"}}>{message}</Typography>
                }
            </Box>
        </Box>
    )
}

export default Home;
