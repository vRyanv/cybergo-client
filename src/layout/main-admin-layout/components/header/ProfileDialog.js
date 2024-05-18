import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack
} from "@mui/material";
import {CheckIcon, Pencil} from "~/assets/icon";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useEffect, useState, useRef} from "react";
import {FieldName, Http, Message, ResourcePath, StatusCode, Int} from "~/constants";
import {UseLocalStorage} from "~/hooks";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import DateUtil from "~/utils/DateUtil";

export default function ProfileDialog({is_open, onClose}) {
    const [is_loading_update_profile, setIsLoadingUpdateProfile] = useState(false)
    const [is_loading_update_pass, setIsLoadingUpdatePass] = useState(false)
    const [user, setUser] = useState()
    const [user_default, setUserDefault] = useState()

    useEffect(() => {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/user/profile`,
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            setUserDefault(response.data)
            setUser(response.data)
            setAvatar({
                preview: String(Http.HOST + ResourcePath.AVATAR_RES_PATH + response.data.avatar)
            })
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar('Load profile failed!', {variant: 'error'})
        })
    }, [])

    const onCloseDialog = () => {
        setAvatar({
            preview: String(Http.HOST + ResourcePath.AVATAR_RES_PATH + user_default.avatar)
        })
        setUser(user_default)
        setUserPass({
            current_password: '',
            new_password: '',
            confirm_password: '',
        })
        onClose()
    }

    const onChangeGender = (e) => {
        const gender = e.target.value
        setUser({...user, gender})
    }

    const [avatar, setAvatar] = useState()
    const onChangeAvatar = (e) => {
        if (!e.target.files[0]) {
            return;
        }

        setAvatar({
            preview: URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })

    }
    const file_ref = useRef(null)
    const onEditAvatarClicked = () => {
        file_ref.current.click()
    }

    const onUpdateProfile = () => {
        setIsLoadingUpdateProfile(true)
        const form_profile = new FormData()
        if (avatar?.file) {
            form_profile.append('avatar', avatar.file)
        }

        form_profile.append(FieldName.FULL_NAME, user.full_name)
        form_profile.append(FieldName.GENDER, user.gender)
        form_profile.append(FieldName.BIRTHDAY, user.birthday)
        form_profile.append(FieldName.ADDRESS, user.address ?? "")

        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.put(
            `${Http.HOST}/user/profile/update`,
            form_profile,
            {
                headers: {
                    'authorization': token,
                    'Content-type': 'multipart/form-data'
                },
            }
        ).then(res => {
            setTimeout(()=>{
                setIsLoadingUpdateProfile(false)
                if (res.data.code !== StatusCode.UPDATED) {
                    enqueueSnackbar('Update profile failed!', {variant: 'error'})
                    return
                }

                enqueueSnackbar('Update profile successfully!', {variant: 'success'})
                const [getLocal, saveLocal] = UseLocalStorage()
                saveLocal(FieldName.FULL_NAME, user.full_name)
                const full_name_element = document.getElementById('full_name_current_user')
                full_name_element.innerText = user.full_name
                if(res.data.avatar){
                    saveLocal(FieldName.AVATAR, res.data.avatar)
                    const avatar_element =  document.getElementById('avatar_current_user')
                    avatar_element.src = Http.HOST + ResourcePath.AVATAR_RES_PATH + res.data.avatar
                }

                setUserDefault(user)
                setAvatar({...avatar, file: null})
            }, Int.DELAY_TIMEOUT_API)

        }).catch(err => {
            setIsLoadingUpdateProfile(false)
            console.log(err);
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }

    const [user_pass, setUserPass] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    })
    const onUpdatePassword = () => {
        if(!user_pass.current_password){
            enqueueSnackbar('Enter current password!', {variant: 'warning'})
            return
        }

        if(!user_pass.new_password){
            enqueueSnackbar('Enter new password!', {variant: 'warning'})
            return
        }

        if(user_pass.new_password !== user_pass.confirm_password){
            enqueueSnackbar('New password and confirm password not match!', {variant: 'warning'})
            return
        }

        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        setIsLoadingUpdatePass(true)
        axios.put(
            `${Http.HOST}/security/update-password`,
            {...user_pass},
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            setTimeout(()=> {
                setIsLoadingUpdatePass(false)
                if(response.data.code !== StatusCode.UPDATED){
                    enqueueSnackbar('Invalid current password!', {variant: 'error'})
                    return
                }
                enqueueSnackbar('Update password successfully', {variant: 'success'})

            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            setIsLoadingUpdatePass(false)
            console.log(error)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })


    }
    return (
        <Dialog
            fullWidth
            open={is_open}
            onClose={is_loading_update_profile || is_loading_update_pass ? null : onCloseDialog}>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
                <div className="position-relative m-auto" style={{width: 'fit-content'}}>
                    <Pencil color={'primary'}
                            onClick={onEditAvatarClicked}
                            className="position-absolute cursor-pointer"
                            style={{bottom: '0', right: '0'}}/>
                    <img className="rounded-circle me-lg-2"
                         src={avatar?.preview}
                         alt="avatar"
                         style={{width: '10rem', height: '10rem'}}/>
                </div>
                <Stack direction={'column'} style={{marginTop: '2rem'}} spacing={3}>
                    <input ref={file_ref} type="file" hidden={true} name={'avatar'} onChange={onChangeAvatar}/>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="input_email">Email</InputLabel>
                        <OutlinedInput
                            readOnly={true}
                            id="input_email"
                            type={'text'}
                            label="Email"
                            value={user?.email}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="input_full_name">Full name</InputLabel>
                        <OutlinedInput
                            id="input_full_name"
                            type={'text'}
                            label="Full name"
                            value={user?.full_name}
                            onChange={(e) => setUser({...user, full_name: e.target.value})}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="input_phone">Phone</InputLabel>
                        <OutlinedInput
                            id="input_phone"
                            type={'text'}
                            label="Phone"
                            readOnly={true}
                            value={String(user?.country.prefix + user?.phone_number)}
                        />
                    </FormControl>
                    <FormControl style={{minWidth: '15rem'}} size="small">
                        <InputLabel id="input_gender">
                            Gender
                        </InputLabel>
                        <Select
                            sx={{width: '100%', border: 'green'}}
                            labelId="input_gender"
                            onChange={(e) => onChangeGender(e)}
                            id="demo-simple-select"
                            value={user?.gender}
                            label="Gender">
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" size="small">
                        <InputLabel htmlFor="input_birthday">Birth date</InputLabel>
                        <OutlinedInput
                            id="input_birthday"
                            type={'date'}
                            onChange={(e)=> {
                                setUser({...user, birthday:  DateUtil.ConvertStringDateToDateForm(e.target.value)})
                            }}
                            label="Birth date"
                            value={
                               user ? (user.birthday != "" ? user.birthday : " " ) : " "
                            }
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="input_address">Address</InputLabel>
                        <OutlinedInput
                            id="input_birthday"
                            type={'text'}
                            label="Address"
                            onChange={(e) => setUser({...user, address: e.target.value})}
                            value={user?.address}
                        />
                    </FormControl>
                </Stack>
                <Stack alignItems="flex-end">
                    <LoadingButton
                        onClick={onUpdateProfile}
                        style={{marginTop: '2rem'}}
                        color={'success'}
                        startIcon={<CheckIcon/>}
                        loading={is_loading_update_profile}
                        loadingPosition="start"
                        variant="outlined"
                    >
                        <span>Update</span>
                    </LoadingButton>
                </Stack>
                <Stack direction={'column'} style={{marginTop: '2rem'}} spacing={3}>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="input_curent_pass">Current password</InputLabel>
                        <OutlinedInput
                            id="input_curent_pass"
                            type={'password'}
                            label="Current password"
                            onChange={(e)=>setUserPass({...user_pass, current_password: e.target.value})}
                            value={user_pass.current_password}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="input_new_pass">New password</InputLabel>
                        <OutlinedInput
                            id="input_new_pass"
                            type={'password'}
                            label="New password"
                            onChange={(e)=>setUserPass({...user_pass, new_password: e.target.value})}
                            value={user_pass.new_password}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth style={{minWidth: '15rem'}}
                        size="small"
                        variant="outlined">
                        <InputLabel htmlFor="input_confirm_pass">Confirm password</InputLabel>
                        <OutlinedInput
                            id="input_confirm_pass"
                            type={'password'}
                            label="Confirm password"
                            onChange={(e)=>setUserPass({...user_pass, confirm_password: e.target.value})}
                            value={user_pass.confirm_password}
                        />
                    </FormControl>
                </Stack>
                <Stack alignItems="flex-end">
                    <LoadingButton
                        style={{marginTop: '2rem'}}
                        color={'success'}
                        startIcon={<CheckIcon/>}
                        loading={is_loading_update_pass}
                        loadingPosition="start"
                        variant="outlined"
                        onClick={onUpdatePassword}
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