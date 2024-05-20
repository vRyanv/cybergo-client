import {Stack} from "@mui/material";
import {PeopleAltTwoToneIcon, TripIcon, VehicleIcon} from "~/assets/icon";
import React, {useEffect, useState} from "react";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, Message} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

export default function GeneralNumber(){

    const [general_statistic, setGeneralStatistic] = useState({
        user: 0,
        trip: 0,
        vehicle: 0
    });
    useEffect(() => {
        GetGeneralStatistic()
    }, [])

    const GetGeneralStatistic = () => {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/api/admin/dashboard/general-statistic`,
            {
                headers: { 'authorization': token}
            }
        ).then((response) => {
            console.log(response.data)
            setGeneralStatistic({
                user: response.data.general_statistic.user,
                trip: response.data.general_statistic.trip,
                vehicle: response.data.general_statistic.vehicle
            })
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar(Message.SOMETHING_WENT_WRONG, {variant: 'error'})
        })
    }
    return (<>
        <div className="col-sm-4 col-xl-4">
            <div className="bg-glass shadow rounded p-4">
                <div className="ms-3">
                    <Stack direction={'row'} alignItems="center" justifyContent="space-between">
                        <PeopleAltTwoToneIcon fontSize="large" color='primary'/>
                        <div>
                            <p className="mb-2">Total user</p>
                            <h6 className="mb-0 text-end ms-5">
                                {general_statistic.user}
                            </h6>
                        </div>
                    </Stack>
                </div>
            </div>
        </div>
        <div className="col-sm-4 col-xl-4">
            <div className="bg-glass shadow rounded p-4">
                <div className="ms-3">
                    <Stack direction={'row'} alignItems="center" justifyContent="space-between">
                        <TripIcon fontSize="large" color='primary'/>
                        <div>
                            <p className="mb-2">Total trip</p>
                            <h6 className="mb-0 text-end">
                                {general_statistic.trip}
                            </h6>
                        </div>
                    </Stack>
                </div>
            </div>
        </div>
        <div className="col-sm-4 col-xl-4">
            <div className="bg-glass shadow rounded p-4">
                <div className="ms-3">
                    <Stack direction={'row'} alignItems="center" justifyContent="space-between">
                        <VehicleIcon fontSize="large" color='primary'/>
                        <div>
                            <p className="mb-2">Total vehicle</p>
                            <h6 className="mb-0 text-end">
                                {general_statistic.vehicle}
                            </h6>
                        </div>
                    </Stack>
                </div>
            </div>
        </div>
    </>)
}