import axios from 'axios'

import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {CheckIcon, HighlightOffTwoToneIcon} from "~/assets/icon";
import {DriverRegistrationStatus, FieldName, Http, Int, Message, StatusCode} from "~/constants";
import {UseLocalStorage} from "~/hooks";
import {enqueueSnackbar} from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ic_success from '~/assets/images/ic_success.svg'
import ic_refused from '~/assets/images/ic_refused.svg'

export default function DriverInformation({
                                              vehicle_id,
                                              onBtnOpenRefuseDialogClicked,
                                              full_name,
                                              gender,
                                              id_number,
                                              phone,
                                              address,
                                              avatar,
                                              front_id_card,
                                              back_id_card,
                                              vehicle_status
                                          }) {
    const navigate = useNavigate();
    const onViewLargeImg = (img_src) => {
        const preview_img = document.getElementById('large_image')
        preview_img.src = img_src
    }
    const [is_loading, setIsLoading] = useState(false);
    const onAcceptBtnCLicked = () => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        const headers = {'authorization': token}
        const data = {vehicle_id}
        axios.put(
            `${Http.HOST}/api/admin/driver-registration/accept`,
            data,
            {headers}
        ).then((response) => {
            setTimeout(() => {
                setIsLoading(false)
                switch (response.data.code) {
                    case StatusCode.NOT_FOUND:
                        enqueueSnackbar('Not found registration', {variant: 'warning'})
                        break
                    case StatusCode.UPDATED:
                        navigate('/driver-registration')
                        enqueueSnackbar('Registration has been approved', {variant: 'success'})
                        break
                    default:
                        enqueueSnackbar(Message.INVALID_YOUR_REQUEST, {variant: 'error'})
                }
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }

    return (
        <div className="shadow rounded h-100 p-4 bg-glass">
            <Stack direction={{xs: 'column', sm: 'row'}}
                   justifyContent="space-between"
                   alignItems="center">
                <div className="">
                    <h6 style={{width: 'fit-content'}}>Driver Information</h6>
                </div>
                {
                    vehicle_status === DriverRegistrationStatus.QUEUE ?
                        (<Stack direction="row" spacing={3}>
                            <LoadingButton color={'success'}
                                           variant="outlined"
                                           loading={is_loading}
                                           onClick={onAcceptBtnCLicked}
                                           loadingPosition="start"
                                           startIcon={<CheckIcon/>}>
                                Accept
                            </LoadingButton>
                            <Button startIcon={<HighlightOffTwoToneIcon/>}
                                    onClick={onBtnOpenRefuseDialogClicked}
                                    variant="outlined"
                                    color={'error'}>Refuse</Button>
                        </Stack>)
                        :
                        (<img
                            src={vehicle_status === DriverRegistrationStatus.ACCEPTED ? ic_success : ic_refused}
                            alt="registration status"
                            width={'70px'}
                            height={'auto'}
                            />
                        )
                }

            </Stack>
            <hr/>
            <Stack justifyContent="space-between"
                   direction={{xs: 'column', sm: 'row'}}
                   spacing={3}>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Full Name</p>
                    <p className={`text-bg-secondary`}>{full_name}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Gender</p>
                    <p className={`text-bg-secondary`}>{gender}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Identity Number</p>
                    <p className="text-dark">{id_number ? id_number : 'Not update'}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Phone</p>
                    <p className="text-dark">{phone}</p>
                </div>
            </Stack>
            <div className="mt-3">
                <p className={'title-field-driver-registration rounded'}>Address</p>
                <p className="text-dark">{address ? address : 'Not update'}</p>
            </div>
            <Stack
                justifyContent="flex-start"
                direction={'row'}
                spacing={3}>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Driver Avatar</p>
                    <img
                        alt="avatar"
                        onClick={() => onViewLargeImg(avatar)}
                        src={avatar}
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'50%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
            </Stack>
            <hr/>
            <Stack
                className="mt-3"
                justifyContent="flex-start"
                direction={'row'}
                spacing={3}>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Front of ID card</p>
                    <img
                        onClick={() => onViewLargeImg(front_id_card)}
                        src={front_id_card}
                        alt="id card"
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'100%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Back of ID card</p>
                    <img
                        onClick={() => onViewLargeImg(back_id_card)}
                        src={back_id_card}
                        alt="id card"
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'100%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
            </Stack>
        </div>
    )
}