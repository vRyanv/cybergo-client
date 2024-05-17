import qr_code from '~/assets/images/qr_code.png'
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {CheckIcon} from "~/assets/icon";
import React from "react";

export default function EnableF2APage() {
    return (
        <Stack style={{width: 'fit-content', margin: 'auto', textAlign: 'center', marginTop: '5rem'}}>
            <h3>Two-Factor Authentication (2FA)</h3>
            <p>Scan this QR code and then click enable button</p>
            <p>Your email: <strong>admin@gmail.com</strong></p>
            <img src={qr_code} alt="qr code" width={'m'} height={250} style={{margin: 'auto', marginBottom: '3rem', marginTop: '2rem'}} />
            <Button startIcon={<CheckIcon/>}
                    style={{marginLeft: '5rem', marginRight: '5rem'}}
                    variant="outlined"
                    color={'success'}>Enable 2FA</Button>
        </Stack>)
}