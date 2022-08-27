// import {connect} from 'react-redux';
import { Typography, Button } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import BasicDatePicker from './MaterialUI/DatePicker';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import BasicSelect from './MaterialUI/DropDownPicker'
import axios from 'axios';

const ComputerStation = (props) => {
    return(
        <Box
        sx={{
            width:"110px",
            height:"81px",
            border:"1px solid black",
            flex: "0 0 26%",
            marginRight: "20px",
            marginTop: "40px"
        }}
        >
            <Typography variant="h5">{`${props.id}`}</Typography>
        </Box>
    )
}

export default ComputerStation;

