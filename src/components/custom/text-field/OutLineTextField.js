import React from 'react';
import TextField from "@mui/material/TextField";

const OutLineTextField = ({label, helperText, is_error, style, value, type, onChange}) => {
    return (
        <TextField
            type={type}
            onChange={onChange}
            value={value}
            style={style}
            label={label}
            variant="outlined"
            error={is_error}
            helperText={helperText}/>
    );
};

export default OutLineTextField;