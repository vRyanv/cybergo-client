import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, IconButton, InputAdornment,
    InputLabel, OutlinedInput,
    Stack
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {CheckIcon, ForwardToInboxTwoToneIcon, HighlightOffTwoToneIcon, Pencil, SearchIcon} from "~/assets/icon";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useState} from "react";
import avatar_admin from "~/assets/images/avatar/admin_avatar.jpg";

export default function ProfileDialog({is_open, onClose}){
    const [is_loading, setIsLoading] = useState(false)

    return (
        <Dialog
            fullWidth
            open={is_open}
            onClose={is_loading ? null : onClose}>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
                <div className="position-relative m-auto" style={{width: 'fit-content'}}>
                    <Pencil color={'primary'} className="position-absolute" style={{bottom:'0', right:'0'}}/>
                    <img className="rounded-circle me-lg-2" src={avatar_admin} alt="avatar"
                         style={{width: '10rem', height: '10rem'}}/>
                </div>
                <Stack direction={'column'} style={{marginTop:'2rem'}} spacing={3}>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Full name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'text'}
                            label="Full name"
                            value={'Admin'}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'text'}
                            label="Email"
                            value={'Admin@gmail.com'}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Phone</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'text'}
                            label="Phone"
                            value={'0362345123'}
                        />
                    </FormControl>
                </Stack>
                <Stack  alignItems="flex-end">
                    <LoadingButton
                        style={{marginTop:'2rem'}}
                        color={'success'}
                        startIcon={<CheckIcon/>}
                        loading={false}
                        loadingPosition="start"
                        variant="outlined"
                    >
                        <span>Update</span>
                    </LoadingButton>
                </Stack>
                <Stack direction={'column'} style={{marginTop:'2rem'}} spacing={3}>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Current password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'password'}
                            label="Full name"
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'password'}
                            label="onfirm password"
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={'password'}
                            label="onfirm password"
                        />
                    </FormControl>
                </Stack>
                <Stack  alignItems="flex-end">
                    <LoadingButton
                        style={{marginTop:'2rem'}}
                        color={'success'}
                        startIcon={<CheckIcon/>}
                        loading={false}
                        loadingPosition="start"
                        variant="outlined"
                    >
                        <span>Update</span>
                    </LoadingButton>
                </Stack>
            </DialogContent>
            <DialogActions style={{padding: '0 1.5rem 1rem 0'}}>
                {/*<LoadingButton*/}
                {/*    color={'grey'}*/}
                {/*    startIcon={<ForwardToInboxTwoToneIcon/>}*/}
                {/*    loading={is_loading}*/}
                {/*    loadingPosition="start"*/}
                {/*    variant="outlined"*/}
                {/*>*/}
                {/*    <span>Send</span>*/}
                {/*</LoadingButton>*/}
            </DialogActions>
        </Dialog>
    )
}