import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';

import {HighlightOffTwoToneIcon, Lock} from '~/assets/icon'
import {useState} from "react";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, Int, Message, StatusCode} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

export default function BanDialog({is_open, setOpen, user_id, callback}) {
    const [is_loading, setIsLoading] = useState(false)
    const [ban_reason, setBanReason] = useState("")
    const onSendMailBanUser = () => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.put(
            `${Http.HOST}/api/admin/user-management/ban-user`,
            {user_id, ban_reason},
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            console.log(response.data)
            setTimeout(() => {
                if(response.data.code !== StatusCode.UPDATED){
                    setIsLoading(false)
                    enqueueSnackbar('Not found user', {variant: 'error'})
                    return
                }
                enqueueSnackbar('User banned successfully', {variant: 'success'})
                setIsLoading(false)
                callback()
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }

    return (
        <Dialog
            fullWidth
            open={is_open}
            onClose={is_loading ? null : () => setOpen(false)}>
            <DialogTitle>Ban user</DialogTitle>
            <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <TextField
                    value={ban_reason}
                    onChange={(e) => setBanReason(e.target.value)}
                    maxRows={10}
                    fullWidth
                    autoFocus
                    required
                    type="text"
                    margin="dense"
                    id="outlined-textarea"
                    label="Ban Reason"
                    placeholder="Reason"
                    multiline
                />
            </DialogContent>
            <DialogActions style={{padding: '0 1.5rem 1rem 0'}}>
                <Button disabled={is_loading}
                        startIcon={<HighlightOffTwoToneIcon/>}
                        onClick={() => {setOpen(false)}}
                        variant='outlined'
                        color={'error'}>
                    Cancel
                </Button>
                <LoadingButton
                    color={'success'}
                    onClick={onSendMailBanUser}
                    startIcon={<Lock/>}
                    loading={is_loading}
                    loadingPosition="start"
                    variant="outlined"
                >
                    <span>Ban</span>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}