import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton  from '@mui/material/IconButton';

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { Controller } from "react-hook-form";

const MyTextInput = ({ name, rules, control, label, half, autoFocus, type, handleShowPassword, handleOnChange }) => {
    
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({
                    field: { onChange },
                    fieldState: { error },
                    formState,
                }) => (
                    <TextField
                        helperText={error ? error.message : null}
                        error={!!error}
                        onChange={handleOnChange}
                        fullWidth
                        label={label}
                        autoFocus={autoFocus}
                        variant="outlined"
                        type={type}
                        InputProps={name === 'password' ? {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleShowPassword}>
                                        {type === "password" ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        } : null}
                    />
                )}
            />
        </Grid>
    )
}

export default MyTextInput;