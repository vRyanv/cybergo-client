import React from "react";
import data from '~/data/driver-registration.json'
import {Stack} from "@mui/material";

import car_front from '~/assets/images/car-front.png'
import vehicle_type from '~/assets/images/ic_truck.svg'
import Button from "@mui/material/Button";

import {VisibilityTwoToneIcon} from '~/assets/icon'
export default function VehicleList(){

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="shadow rounded h-100 p-4 bg-glass">
                <h6>Vehicle</h6>
                <hr/>
                <ul className={'px-5'}>
                {
                    data.map((d, index)=> {
                        return (
                            <li key={index}
                                style={{cursor: 'default'}}
                                className={`member driver-registration-status bg-green-light`}>
                                <div className="thumb">
                                    <img src={car_front} alt="avatar"/>
                                </div>
                                <div className="description">
                                    <Stack
                                        style={{marginTop: '1rem'}}
                                        justifyContent="space-around"
                                        direction={{xs: 'column', sm: 'row'}}>
                                        <div className="mb-3">
                                            <label className="form-label title-info-driver">License Plates</label>
                                            <div>license_plates</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label title-info-driver">Type</label>
                                            <div style={{textAlign: 'center'}}>
                                                <img
                                                    style={{width: '50px', height: '50px'}}
                                                    src={vehicle_type}
                                                    alt="transport-type"/>
                                            </div>
                                        </div>
                                        <div className="mb-3">
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