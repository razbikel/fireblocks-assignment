import * as React from 'react';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker() {
  const [value, setValue] = React.useState(null);

  console.log('value', value && value["$d"] ? value["$d"] : "" )
  if(value && value["$d"]){
  console.log(moment(value["$d"]).add(1, 'day').format("DD/MM/YYYY"))

  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="choose date"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}