import React from 'react';
import {
    ArcElement,
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {TripChart, VehicleChart} from "~/page/admin/dashboard-page/partials";
import {
    FormControl, IconButton,
    InputAdornment,
    InputBase,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack
} from "@mui/material";
import {AccountStatus} from "~/constants";
import {PeopleAltTwoToneIcon, SearchIcon, TripIcon, VehicleIcon} from "~/assets/icon";
import DateUtil from "~/utils/DateUtil";
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
                    <div className="col-sm-12 col-xl-6">
                        <div className="bg-glass shadow text-center rounded p-4">
                            <Stack direction={{xs: 'column', sm: 'row', md: 'row'}}
                                   useFlexGap
                                   justifyContent="space-between"
                                   flexWrap="wrap"
                                   spacing={2}>
                                <h5 style={{textAlign: 'start'}}>Vehicle</h5>
                                <Stack
                                    spacing={2}
                                    direction={{xs: 'column', sm: 'row', md: 'row'}}
                                    justifyContent="space-around"
                                >
                                    <FormControl variant="outlined" size="small">
                                        <InputLabel htmlFor="outlined-adornment-password">From date</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={'date'}
                                            value={DateUtil.GetCurrentDate()}
                                            label="From date"
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined" size="small">
                                        <InputLabel htmlFor="outlined-adornment-password">To Date</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={'date'}
                                            value={DateUtil.GetCurrentDate()}
                                            label="To Date"
                                        />
                                    </FormControl>
                                </Stack>
                                <VehicleChart/>
                            </Stack>
                        </div>
                    </div>
                    <div className="col-sm-12 col-xl-6">
                        <div className="bg-glass shadow text-center rounded p-4">
                            <Stack direction={{xs: 'column', sm: 'row', md: 'row'}}
                                   useFlexGap
                                   justifyContent="space-between"
                                   flexWrap="wrap"
                                   spacing={2}>
                                <h5 style={{textAlign: 'start'}}>Trip</h5>
                                <Stack
                                    spacing={2}
                                    direction={{xs: 'column', sm: 'row', md: 'row'}}
                                    justifyContent="space-around"
                                >
                                    <FormControl variant="outlined" size="small">
                                        <InputLabel htmlFor="outlined-adornment-password">From date</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={'date'}
                                            value={DateUtil.GetCurrentDate()}
                                            label="From date"
                                        />
                                    </FormControl>
                                    <FormControl variant="outlined" size="small">
                                        <InputLabel htmlFor="outlined-adornment-password">To Date</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={'date'}
                                            value={DateUtil.GetCurrentDate()}
                                            label="To Date"
                                        />
                                    </FormControl>
                                </Stack>
                                <TripChart/>
                            </Stack>
                        </div>
                    </div>
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