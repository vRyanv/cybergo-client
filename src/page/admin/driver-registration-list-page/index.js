import {Scrollbars} from "react-custom-scrollbars-2";
import React, {useEffect, useState} from "react";
import axios from 'axios'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import {
    DriverRegistrationStatus,
    Int,
    Http,
    ResourcePath
} from '~/constants'
import DriverItem from './partials/driver-item'
import DriverRegistrationSkeleton from './partials/DriverRegistrationSkeleton'

import car from '~/assets/images/ic_car.svg'
import moto from '~/assets/images/ic_moto.svg'
import truck from '~/assets/images/ic_truck.svg'

import {SearchIcon, RefreshTwoToneIcon} from '~/assets/icon'
import {UseLocalStorage, UseNavIsClose} from "~/hooks";
import Button from "@mui/material/Button";

export default function DriverRegisterPage() {
    const is_nav_close = UseNavIsClose()
    const [is_loading, setIsLoading] = useState(false)

    const vehicle_types = {
        Moto: moto,
        Car: car,
        Truck: truck
    }
    const [driver_registrations, setDriverRegistrations] = useState([])
    useEffect(() => {
        console.log('load data list')
        GetDriverRegistrationList('ALL')
    }, [])

    const GetDriverRegistrationList = (status) => {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(Http.USER_TOKEN)
        axios.get(
            `${Http.HOST}/admin/driver-registration`,
            {
                headers: { 'authorization': token}
            }
        ).then((response) => {
            setDriverRegistrations(response.data.driver_registration_list)
            console.log(response.data.driver_registration_list)
        }).catch((error) => {
            console.log(error)
        })
    }

    const [status_selection, setStatusSelection] = useState(DriverRegistrationStatus.QUEUE)
    const onChangeRegistrationFilter = (e) => {
        setStatusSelection(e.target.value)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, Int.DELAY_TIMEOUT_API)
    }


    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12 header-body">
                    <div className="container-fluid pb-4 pt-4 px-4 bg-glass rounded"
                         style={{position: 'sticky', zIndex: '1000', top: '64px'}}>
                        <Stack direction={{xs: 'column', sm: 'column', md: 'row'}}
                               justifyContent="space-between"
                               spacing={3}>
                            <h5>Driver Registration</h5>
                            <Stack direction={{xs: 'column', sm: 'row'}}
                                   spacing={3}>
                                <Button startIcon={<RefreshTwoToneIcon/>}
                                        fullWidth
                                        variant="outlined"
                                        color={'info'}>Refresh</Button>
                                <FormControl
                                    fullWidth style={{minWidth: '15rem'}}
                                    size="small"
                                    variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => {
                                                    }}
                                                    onMouseDown={() => {
                                                    }}
                                                    edge="end"
                                                >
                                                    <SearchIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl
                                    size="small"
                                    fullWidth
                                    style={{minWidth: '15rem'}}>
                                    <InputLabel id="demo-simple-select-label">
                                        Registration Status
                                    </InputLabel>
                                    <Select
                                        sx={{width: '100%', border: 'green'}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status_selection}
                                        onChange={(e) => onChangeRegistrationFilter(e)}
                                        label="Registration Status">
                                        <MenuItem value={'ALL'}>ALL</MenuItem>
                                        {
                                            Object.keys(DriverRegistrationStatus).map((key, index) => {
                                                return <MenuItem key={index}
                                                                 value={DriverRegistrationStatus[key]}>{DriverRegistrationStatus[key]}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </div>
                    <div
                        className={`bg-glass rounded p-4 mt-3 body-page ${is_nav_close ? 'full-width-body-page' : ''}`}>
                        <Scrollbars style={{minWidth: '10rem', height: '100%'}} autoHide>
                            {
                                is_loading ? (<DriverRegistrationSkeleton/>)
                                    : (<ul className="team">
                                        {
                                            driver_registrations.map((registration, index) =>
                                                <DriverItem
                                                    avatar={`${Http.HOST + ResourcePath.AVATAR_RES_PATH + registration.driver.avatar}`}
                                                    vehicle_type={vehicle_types[registration.vehicle_type]}
                                                    vehicle_id={registration._id}
                                                    status={registration.status}
                                                    full_name={registration.driver.full_name}
                                                    id_number={registration.driver.id_number}
                                                    phone={registration.driver.phone_number}
                                                    license_plates={registration.license_plates}
                                                    key={index}/>)
                                        }
                                    </ul>)
                            }
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>

    )
}