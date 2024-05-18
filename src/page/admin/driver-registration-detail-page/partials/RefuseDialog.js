import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';

import {ForwardToInboxTwoToneIcon, HighlightOffTwoToneIcon} from '~/assets/icon'
import {useState} from "react";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, Int, Message, StatusCode} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";

export default function RefuseDialog({is_open, CloseDialog, vehicle_id}) {
    const navigate = useNavigate();
    const [is_loading, setIsLoading] = useState(false)
    const [refuse_reason, setRefuseReason] = useState("")
    const onBtnSendReasonRefuse = () => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        const body = {vehicle_id, refuse_reason}
        axios.put(
            `${Http.HOST}/admin/driver-registration/refuse`,
            body,
            {
                headers: { 'authorization': token}
            }
        ).then((response) => {
            setTimeout(() => {
                CloseDialog()
                setIsLoading(false)
                switch (response.data.code){
                    case StatusCode.NOT_FOUND:
                        enqueueSnackbar('Not found registration', {variant: 'warning'})
                        break
                    case StatusCode.UPDATED:
                        navigate('/driver-registration')
                        enqueueSnackbar('Registration has been denied', {variant: 'success'})
                        break
                    default:
                        enqueueSnackbar(Message.INVALID_YOUR_REQUEST, {variant: 'error'})
                }
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG,{ variant: 'error' })
        })
    }

    return (
        <Dialog
            fullWidth
            open={is_open}
            onClose={is_loading ? null : CloseDialog}>
            <DialogTitle>Refuse</DialogTitle>
            <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <TextField
                    value={refuse_reason}
                    onChange={(e) => setRefuseReason(e.target.value)}
                    maxRows={10}
                    fullWidth
                    autoFocus
                    required
                    type="text"
                    margin="dense"
                    name="email"
                    id="outlined-textarea"
                    label="Refuse Reason"
                    placeholder="Placeholder"
                    multiline
                />
            </DialogContent>
            <DialogActions style={{padding: '0 1.5rem 1rem 0'}}>
                <Button disabled={is_loading}
                        startIcon={<HighlightOffTwoToneIcon/>}
                        onClick={CloseDialog}
                        variant='outlined'
                        color={'error'}>
                    Cancel
                </Button>
                <LoadingButton
                    color={'success'}
                    onClick={onBtnSendReasonRefuse}
                    startIcon={<ForwardToInboxTwoToneIcon/>}
                    loading={is_loading}
                    loadingPosition="start"
                    variant="outlined"
                >
                    <span>Send</span>
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}