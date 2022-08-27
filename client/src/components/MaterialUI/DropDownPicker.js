import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux'



export default function BasicSelect(props) {
  const [choosenData, setchoosenData] = React.useState('');
  const dispatch = useDispatch()

  

  const handleChange = async (event) => {
    setchoosenData(event.target.value);
    let userObject = {}
    if(props.label === "user"){
        props.data.forEach(user => {
            if(user.name === event.target.value){
                userObject = user;
            }
        })
    }
    dispatch({type: "userUpdate",data:userObject })
  };

  const getItems = () => {
    return props.data.map((item, index) => {
        return <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
    })
  }



  return (
    <Box sx={{ width: "140px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={choosenData}
          label="User"
          onChange={handleChange}
        >
          {getItems()};
        </Select>
      </FormControl>
    </Box>
  );
}