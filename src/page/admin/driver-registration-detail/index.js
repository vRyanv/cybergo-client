import {useParams} from "react-router-dom";
import { KeyboardReturnIcon} from '~/assets/icon'

import {useState} from "react";

import user_list from '~/data/driver-registration.json'
import avatar from '~/assets/images/thumb.jpg'
import front_id_card from '~/assets/images/front-id-card.jpg'
import back_id_card from '~/assets/images/back-id-card.png'
import cv from '~/assets/images/cv.png'

import front_driving_license from '~/assets/images/front-driving-license.jpg'
import back_driving_license from '~/assets/images/back-driving-license.jpg'


import car_front from '~/assets/images/car-front.png'
import car_back from '~/assets/images/car-back.png'
import car_left from '~/assets/images/car-left.png'
import car_right from '~/assets/images/car-right.png'

import {IconButton} from "@mui/material";

import {
    DriverInformation, DriverInformationSkeleton,
    DrivingLicense, DrivingLicenseSkeleton,
    Vehicle, VehicleSkeleton,
    RefuseDialog
} from './partials'

import {Int} from '~/constants'
export default function DriverRegisterPage() {
    const {driver_registration_id} = useParams()
    const [is_loading, setIsLoading] = useState(true)
    setTimeout(() => {
        setIsLoading(false)
    }, Int.DELAY_TIMEOUT_API)
    const onBackButtonClicked = () => {
        window.history.back()
    }
    const onViewLargeImg = (img_src) => {
        const preview_img = document.getElementById('large_image')
        preview_img.src = img_src
    }

    //refuse dialog
    const [is_open_refuse_dialog, setIsOpenRefuseDialog] = useState(false)
    const openRefuseDialogClicked = () => {
        setIsOpenRefuseDialog(true)
    }
    const onCloseRefuseDialog = () => {
        setIsOpenRefuseDialog(false)
    }

    const [driver_detail, setDriverDetail] = useState(user_list[0])


    return (

        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12 header-body">
                    <div
                        className="d-flex flex-row flex-wrap p-4 shadow rounded justify-content-between align-items-center bg-glass">
                        <IconButton
                            onClick={() => onBackButtonClicked()}
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
                                        full_name={driver_detail.full_name}
                                        id_number={driver_detail.id_number}
                                        phone={driver_detail.phone}
                                        address={driver_detail.address}
                                        avatar={avatar}
                                        cv={cv}
                                        front_id_card={front_id_card}
                                        back_id_card={back_id_card}
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
                                                        front_driving_license={front_driving_license}
                                                        back_driving_license={back_driving_license}/>)
                                            }

                                        </div>
                                        <div className="col-sm-12 col-xl-12">
                                            {
                                                is_loading ? (<VehicleSkeleton/>)
                                                    : (<Vehicle
                                                        license_plates={driver_detail.license_plates}
                                                        car_front={car_front}
                                                        car_back={car_back}
                                                        car_left={car_left}
                                                        car_right={car_right}/>)
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