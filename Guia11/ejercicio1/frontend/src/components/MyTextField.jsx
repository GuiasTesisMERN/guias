import React from 'react';

import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';

const MyTextField = ({label, type, value, name, required, half, handleChange, multiline}) => {
  return (
    <Grid item xs={half ? 6 : 12}>
        <TextField 
            onChange={handleChange}
            name={name} type={type} 
            fullWidth required={required}
            value={value} 
            label={label} variant='outlined'
            {...multiline} 
        />
    </Grid>
  )
}

export default MyTextField