import {FormControl, InputLabel, OutlinedInput, Stack} from "@mui/material";
import {CheckIcon} from "~/assets/icon";
import React from "react";
import Button from "@mui/material/Button";

export default function VerifyF2APage(){
    return (<div className="container-fluid">
        <div className="row justify-content-center" style={{padding: '3rem'}}>
            <div className="col-sm-12 col-md-3 col-lg-3 mt-3" style={{textAlign: 'center'}}>
                <h3>Two-Factor Authentication (2FA)</h3>
                <p>Your email: <strong>admin@gmail.com</strong></p>
                <Stack direction={'column'} spacing={5} style={{marginTop: '3rem'}}>
                    <FormControl style={{minWidth: '15rem'}} variant="outlined" size="small">
                        <InputLabel htmlFor="outlined-adornment-password">Token</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'number'}
                            label="Token"
                        />
                    </FormControl>
                    <Button startIcon={<CheckIcon/>}
                            variant="outlined"
                            color={'success'}>Verify</Button>
                </Stack>
            </div>
        </div>
    </div>)
}