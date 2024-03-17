import Button from "@mui/material/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';

import {
    ForwardToInboxTwoToneIcon,
    CancelIcon
} from '~/assets/icon'
import {useState} from "react";

export default function RefuseDialog({is_open, onClose}) {
    const [is_loading, setIsLoading] = useState(false)

    //send mail
    const [is_send_mail, setIsSendMail] = useState(false)
    const onBtnSendMailClicked = () => {
        setIsLoading(true)
        setTimeout(() => {
            onClose()
            setIsLoading(false)

        }, 1500)
    }
    const [reason_refuse, setReasonRefuse] = useState('')
    return (
        <Dialog
            fullWidth
            open={is_open}
            onClose={is_loading ? null : onClose}>
            <DialogTitle>Refuse</DialogTitle>
            <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <TextField
                    value={reason_refuse}
                    onChange={(e) => setReasonRefuse(e.target.value)}
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
                        startIcon={<CancelIcon/>}
                        onClick={onClose}
                        variant='outlined'
                        color={'error'}>
                    Cancel
                </Button>
                <LoadingButton
                    color={'success'}
                    onClick={onBtnSendMailClicked}
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