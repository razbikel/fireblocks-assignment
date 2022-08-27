// import {connect} from 'react-redux';
import { Typography, Button } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import BasicDatePicker from './MaterialUI/DatePicker';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import BasicSelect from './MaterialUI/DropDownPicker'
import axios from 'axios';


const Home = () => {
    const date = useSelector((state) => state.date).date
    const user = useSelector((state) => state.user).user
    const dispatch = useDispatch()


    const [users, setUsers] = useState([]);


    const fetchUsers = useCallback(async () => {
        let users = await axios.get('http://localhost:8000/users');
        setUsers(users.data)
    }, [])


    const fetchReservations = async (date, user) => {
        let res = await axios.post('http://localhost:8000/reservations/get-reservations', {
          user_id: user.id.toString(),
          date
        })
        dispatch({type: "reservationsUpdate",data:res })
      }


    useEffect(() => {
        fetchUsers()
    }, [])


    return(
        <Box 
        sx={{
            height: "680px",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            paddingTop: "50px",
            alignItems: "center"
            
            
        }}
        >
            <Typography variant="h1">Computers Room</Typography>
            <Box
            sx={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent: "space-between",
                width: "575px",
                marginBottom: "25px"
            }}
            >
                <BasicSelect label="user" data={users}/>
                <Button 
                    variant="contained"
                    sx={{width:"140px"}}
                    onClick={() => fetchReservations(date, user)}
                    >load reservations</Button>
                <BasicDatePicker />

            </Box>
            <Box
            sx={{
                height:"500px",
                width: "500px",
                border: "1px solid black"
            }}
            >
            </Box>
        </Box>
    )
}

export default Home;
