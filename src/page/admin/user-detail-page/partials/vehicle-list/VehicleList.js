import React from "react";
import {Stack} from "@mui/material";

import truck from '~/assets/images/ic_truck.svg'
import moto from '~/assets/images/ic_moto.svg'
import car from '~/assets/images/ic_car.svg'
import Button from "@mui/material/Button";

import {VisibilityTwoToneIcon} from '~/assets/icon'
import {Http, ResourcePath} from "~/constants";
const type_list = {
    "Truck":truck,
    "Motorcycle":moto,
    "Car":car
}


export default function VehicleList({vehicles}){
    return (
        <div className="col-sm-12 col-xl-12">
            <div className="shadow rounded h-100 p-4 bg-glass">
                <h6>Vehicles</h6>
                <hr/>
                <ul className={'px-5'}>
                {
                    vehicles.map((vehicle, index)=> {
                        return (
                            <li key={index}
                                style={{cursor: 'default'}}
                                className={`member driver-registration-status bg-green-light`}>
                                <div className="thumb">
                                    <img src={String(Http.HOST + ResourcePath.DRIVER_REGISTRATION_RES_PATH + vehicle.front_vehicle)} alt="front vehicle"/>
                                </div>
                                <div className="description">
                                    <Stack
                                        style={{marginTop: '1rem'}}
                                        justifyContent="space-around"
                                        direction={{xs: 'column', sm: 'row'}}>
                                        <div className="mb-3">
                                            <label className="form-label title-info-driver">Name</label>
                                            <div>{vehicle.vehicle_name}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label title-info-driver">License Plates</label>
                                            <div>{vehicle.license_plates}</div>
                                        </div>
                                        <div className="mb-3">
                                            <div style={{textAlign: 'center'}}>
                                                <img
                                                    style={{width: '50px', height: '50px'}}
                                                    src={type_list[vehicle.vehicle_type]}
                                                    alt="transport-type"/>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <Button
                                                variant={'outlined'}
                                                color={'info'}
                                                startIcon={<VisibilityTwoToneIcon/>}
                                            >View more</Button>
                                        </div>
                                    </Stack>
                                </div>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
}