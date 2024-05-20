import {IconButton, Stack} from "@mui/material";
import {UseHistoryBack, UseLocalStorage, UseViewLargeImg} from "~/hooks";
import React, {useEffect, useState} from "react";
import {FieldName, Http, Int, Message, ResourcePath, StatusCode, VehicleImage} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {useParams} from "react-router-dom";
import DateUtil from "~/utils/DateUtil";
import {KeyboardReturnIcon} from "~/assets/icon";

export default function VehicleDetailPage() {
    const {vehicle_id} = useParams();
    const [is_loading, setIsLoading] = useState(true);
    const [vehicle, setVehicle] = useState({});
    useEffect(() => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/api/user/vehicle/vehicle-detail/${vehicle_id}`,
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            setTimeout(() => {
                setIsLoading(false)
                if (response.data.code !== StatusCode.OK) {
                    enqueueSnackbar('Not found vehicle', {variant: 'error'})
                    return
                }
                setVehicle(response.data.vehicle)
                console.log(response.data)
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }, [vehicle_id])

    return (
        <div className="container-fluid pt-4 px-4 mb-3">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12 header-body">
                    <div className="container-fluid pb-2 pt-2 px-4 bg-glass rounded"
                         style={{position: 'sticky', zIndex: '1000', top: '64px'}}>
                        <Stack direction={{xs: 'column', sm: 'row', md: 'row'}}
                               justifyContent="space-between"
                               alignItems="center"
                               spacing={3}>
                            <IconButton
                                onClick={UseHistoryBack}
                                color={'secondary'}
                                size="medium">
                                <KeyboardReturnIcon/>
                            </IconButton>
                            <h5>Vehicle Detail</h5>
                        </Stack>
                    </div>
                </div>
                {is_loading ? (<div></div>) :  <div className={`col-sm-12 col-xl-12`}>
                    <div className="container-fluid pb-4 pt-4 px-4 bg-glass rounded" style={{minHeight: '100vh'}}>
                        <Stack justifyContent="space-between"
                               direction={{xs: 'column', sm: 'row'}}
                               spacing={3}>
                            <div className="mt-3">
                                <p className={'title-field-driver-registration rounded'}>vehicle type</p>
                                <div style={{textAlign: 'center'}}>
                                    <img
                                        style={{width: '50px', height: '50px'}}
                                        src={VehicleImage[vehicle.vehicle_type]}
                                        alt="transport-type"/>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className={'title-field-driver-registration rounded'}>License Plates</p>
                                <p className="text-dark">{vehicle.license_plates}</p>
                            </div>
                            <div className="mt-3">
                                <p className={'title-field-driver-registration rounded'}>Name</p>
                                <p className="text-dark">{vehicle.vehicle_name}</p>
                            </div>
                            <div className="mt-3">
                                <p className={'title-field-driver-registration rounded'}>Created at</p>
                                <p className="text-dark">{DateUtil.IOStringToDate(vehicle.createdAt)}</p>
                            </div>
                            <div className="mt-3">
                                <p className={'title-field-driver-registration rounded'}>Status</p>
                                <p className="text-dark">{vehicle.status}</p>
                            </div>
                        </Stack>
                        <hr/>

                        <Stack direction={{md: 'row', sm: 'column'}} spacing={2}>
                            <div>
                                <p className={'title-field-driver-registration rounded'}>Registration Certificate</p>
                                <Stack direction={'row'} spacing={2}>

                                    <div>
                                        <img
                                            onClick={() => UseViewLargeImg(String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.back_vehicle_registration_certificate))}
                                            src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.back_vehicle_registration_certificate)}
                                            alt="back_vehicle_registration_certificate"
                                            data-bs-toggle="modal"
                                            data-bs-target="#image_larger_modal"
                                            width={'100%'}
                                            className="rounded mt-2 can-zoom"/>
                                    </div>
                                    <div>
                                        <img
                                            onClick={() => UseViewLargeImg(String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.front_vehicle_registration_certificate))}
                                            src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.front_vehicle_registration_certificate)}
                                            alt="id card"
                                            data-bs-toggle="modal"
                                            data-bs-target="#image_larger_modal"
                                            width={'100%'}
                                            className="rounded mt-2 can-zoom"/>
                                    </div>
                                </Stack>
                            </div>

                            <div>
                                <p className={'title-field-driver-registration rounded'}>Driving License</p>
                                <Stack direction={'row'} spacing={2}>
                                    <div>
                                        <img
                                            onClick={() => UseViewLargeImg(String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.front_driving_license))}
                                            src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.front_driving_license)}
                                            alt="back_vehicle_registration_certificate"
                                            data-bs-toggle="modal"
                                            data-bs-target="#image_larger_modal"
                                            width={'100%'}
                                            className="rounded mt-2 can-zoom"/>
                                    </div>
                                    <div>
                                        <img
                                            onClick={() => UseViewLargeImg(String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.back_driving_license))}
                                            src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.back_driving_license)}
                                            alt="id card"
                                            data-bs-toggle="modal"
                                            data-bs-target="#image_larger_modal"
                                            width={'100%'}
                                            className="rounded mt-2 can-zoom"/>
                                    </div>
                                </Stack>
                            </div>
                        </Stack>
                        <hr/>
                        <Stack
                            justifyContent="space-between"
                            direction={'column'}>
                            <Stack direction={'row'} spacing={2}>
                                <div>
                                    <p className={'title-field-driver-registration rounded'}>Front Of
                                        Vehicle</p>
                                    <img
                                        onClick={() => UseViewLargeImg(String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.front_vehicle))}
                                        src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.front_vehicle)}
                                        alt="id card"
                                        data-bs-toggle="modal"
                                        data-bs-target="#image_larger_modal"
                                        width={'100%'}
                                        className="rounded mt-2 can-zoom"/>
                                </div>
                                <div>
                                    <p className={'title-field-driver-registration rounded'}>Back Of Vehicle</p>
                                    <img
                                        onClick={() => UseViewLargeImg(
                                            String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.back_vehicle)
                                        )}
                                        src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.back_vehicle)}
                                        alt="id card"
                                        data-bs-toggle="modal"
                                        data-bs-target="#image_larger_modal"
                                        width={'100%'}
                                        className="rounded mt-2 can-zoom"/>
                                </div>
                            </Stack>
                            <Stack direction={'row'} spacing={2} className={'mt-5'}>
                                <div>
                                    <p className={'title-field-driver-registration rounded'}>Left Of Vehicle</p>
                                    <img
                                        onClick={() => UseViewLargeImg(String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.left_vehicle))}
                                        src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.back_vehicle)}
                                        alt="id card"
                                        data-bs-toggle="modal"
                                        data-bs-target="#image_larger_modal"
                                        width={'100%'}
                                        className="rounded mt-2 can-zoom"/>
                                </div>
                                <div>
                                    <p className={'title-field-driver-registration rounded'}>Right Of
                                        Vehicle</p>
                                    <img
                                        onClick={() => UseViewLargeImg(String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.right_vehicle))}
                                        src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.right_vehicle)}
                                        alt="id card"
                                        data-bs-toggle="modal"
                                        data-bs-target="#image_larger_modal"
                                        width={'100%'}
                                        className="rounded mt-2 can-zoom"/>
                                </div>
                            </Stack>
                        </Stack>
                    </div>
                </div>}
            </div>
        </div>
    )
}