import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch } from 'react-redux'


export default function BasicDatePicker() {
  const [value, setValue] = React.useState(null);
  const dispatch = useDispatch()


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="choose week"
        value={value}
        onChange={async (newValue) => {
          setValue(newValue);
          dispatch({type: "dateUpdate",date: newValue["$d"] })          
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}