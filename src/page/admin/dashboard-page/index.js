import React from 'react';
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {TripChart, VehicleChart} from "~/page/admin/dashboard-page/partials";
import {Stack} from "@mui/material";
import {PeopleAltTwoToneIcon, TripIcon, VehicleIcon} from "~/assets/icon";
import {RatingChart} from "~/page/admin/dashboard-page/partials/RatingChart";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function DashboardPage() {
    return (
        <>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-4 col-xl-4">
                        <div className="bg-glass shadow rounded p-4">
                            <div className="ms-3">
                                <Stack direction={'row'} alignItems="center" justifyContent="space-between">
                                    <PeopleAltTwoToneIcon fontSize="large" color='primary'/>
                                    <div>
                                        <p className="mb-2">Total user</p>
                                        <h6 className="mb-0 text-end ms-5">
                                            2
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
                                            4
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
                                            3
                                        </h6>
                                    </div>
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <VehicleChart/>
                    <TripChart/>
                </div>
            </div>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-12 col-xl-12">
                        <div className="bg-glass shadow text-center rounded p-4">
                            <h5 style={{textAlign: 'start'}}>Rating</h5>
                            <RatingChart/>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}