import {useParams} from "react-router-dom";
import { KeyboardReturnIcon} from '~/assets/icon'
import {useEffect, useState} from "react";
import {UseHistoryBack, UseLocalStorage} from '~/hooks'
import {IconButton} from "@mui/material";
import axios from 'axios'
import {enqueueSnackbar} from 'notistack'

import {
    DriverInformation, DriverInformationSkeleton,
    DrivingLicense, DrivingLicenseSkeleton,
    Vehicle, VehicleSkeleton,
    RefuseDialog
} from './partials'

import {Http, ResourcePath, Int, Message} from '~/constants'
export default function DriverRegisterPage() {
    const [is_loading, setIsLoading] = useState(true)
    //refuse dialog
    const [is_open_refuse_dialog, setIsOpenRefuseDialog] = useState(false)
    const openRefuseDialogClicked = () => {
        setIsOpenRefuseDialog(true)
    }
    const onCloseRefuseDialog = () => {
        setIsOpenRefuseDialog(false)
    }

    const {driver_registration_id} = useParams()
    const [registration_detail, setRegistrationDetail] = useState()
    useEffect(()=> {
        console.log('load data detail')
        const [getLocal] = UseLocalStorage()
        const token = getLocal(Http.USER_TOKEN)
        axios.get(
            `${Http.HOST}/admin/driver-registration/detail/${driver_registration_id}`,
            {
                headers: { 'authorization': token}
            }
        ).then((response) => {
            setRegistrationDetail(response.data.driver_registration_detail)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG,{ variant: 'error' })
        })
    }, [])

    return (
        <div className="container-fluid pt-4 px-4 mb-3">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12 header-body">
                    <div
                        className="d-flex flex-row flex-wrap p-1 shadow rounded justify-content-between align-items-center bg-glass">
                        <IconButton
                            onClick={UseHistoryBack}
                            color={'secondary'}
                            size="large">
                            <KeyboardReturnIcon/>
                        </IconButton>
                        <h5>Driver Registration Details</h5>
                        <div>
                            <RefuseDialog is_open={is_open_refuse_dialog} onClose={onCloseRefuseDialog}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-xl-12">
                    <div className="container-fluid px-4 container-fluid-body">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-6 ">
                                {
                                    is_loading ? (<DriverInformationSkeleton/>) : (<DriverInformation
                                        onBtnOpenRefuseDialogClicked={openRefuseDialogClicked}
                                        full_name={registration_detail.driver.full_name}
                                        gender={registration_detail.driver.gender}
                                        id_number={registration_detail.driver.id_number}
                                        phone={`${registration_detail.driver.country.prefix + registration_detail.driver.phone_number}`}
                                        address={registration_detail.driver.address}
                                        avatar={`${Http.HOST + ResourcePath.AVATAR_RES_PATH + registration_detail.driver.avatar}`}
                                        front_id_card={`${Http.HOST + ResourcePath.ID_CARD_RES_PATH + registration_detail.driver.front_id_card}`}
                                        back_id_card={`${Http.HOST + ResourcePath.ID_CARD_RES_PATH + registration_detail.driver.back_id_card}`}
                                    />)
                                }
                            </div>
                            <div className="col-sm-12 col-xl-6">
                                <div className="container-fluid px-4 container-fluid-body">
                                    <div className="row g-4">
                                        <div className="col-sm-12 col-xl-12">
                                            {
                                                is_loading ? (<DrivingLicenseSkeleton/>)
                                                    : (<DrivingLicense
                                                        front_driving_license={`${Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + registration_detail.front_driving_license}`}
                                                        back_driving_license={`${Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + registration_detail.back_driving_license}`}/>)
                                            }

                                        </div>
                                        <div className="col-sm-12 col-xl-12">
                                            {
                                                is_loading ? (<VehicleSkeleton/>)
                                                    : (<Vehicle
                                                        license_plates={registration_detail.license_plates}
                                                        car_front={`${Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + registration_detail.front_vehicle}`}
                                                        car_back={`${Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + registration_detail.back_vehicle}`}
                                                        car_left={`${Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + registration_detail.left_vehicle}`}
                                                        car_right={`${Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + registration_detail.right_vehicle}`}/>)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}