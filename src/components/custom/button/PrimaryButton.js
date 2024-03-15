import React from 'react';
import Button from '@mui/material/Button'

const PrimaryButton = ({text, color, style, type, onclick, className}) => {
    return (
        <Button
            color={color}
            type={type}
            variant="contained"
            className={className}
            style={style}
            onClick={onclick}
            sx={{color: '#ffffff', fontFamily: 'round_black_semibold'}}>
            {text}
        </Button>
    );
};

export default PrimaryButton;