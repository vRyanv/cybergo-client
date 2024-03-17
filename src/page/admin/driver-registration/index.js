import {Scrollbars} from "react-custom-scrollbars-2";
import React, {useRef, useState} from "react";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    Stack,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import data_seed from '~/data/driver-registration.json'
import {DriverRegistrationStatus, Int} from '~/constants'
import DriverItem from './partials/driver-item'
import DriverRegistrationSkeleton from './partials/DriverRegistrationSkeleton'

import avatar from '~/assets/images/thumb.jpg'
import car from '~/assets/images/ic_car.svg'
import moto from '~/assets/images/ic_moto.svg'
import truck from '~/assets/images/ic_truck.svg'
import {Search} from "@mui/icons-material";

import {SearchIcon} from '~/assets/icon'
import {UseNavIsClose} from "~/hooks";

export default function DriverRegisterPage() {
    const is_nav_close = UseNavIsClose()
    const [is_loading, setIsLoading] = useState(false)

    const [status_selection, setStatusSelection] = useState(DriverRegistrationStatus.QUEUE)
    const onChangeRegistrationFilter = (e) => {
        setStatusSelection(e.target.value)
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, Int.DELAY_TIMEOUT_API)
    }

    const user_list_box = useRef()

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12 header-body">
                    <div className="container-fluid pb-4 pt-4 px-4 bg-glass rounded"
                         style={{position: 'sticky', zIndex: '1000', top: '64px'}}>
                        <Stack direction={{ xs: 'column', sm: 'column', md:'row'}}
                               justifyContent="space-between"
                                spacing={3}>
                            <h5>Driver registration</h5>
                            <Stack direction={{ xs: 'column', sm: 'row' }}
                            spacing={3}>
                                <FormControl fullWidth style={{minWidth: '15rem'}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>{}}
                                                    onMouseDown={()=>{}}
                                                    edge="end"
                                                >
                                                    <SearchIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl fullWidth style={{minWidth: '15rem'}}>
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
                    <div className={`bg-glass rounded p-4 mt-3 body-page ${is_nav_close ? 'full-width-body-page' : ''}`}>
                        <Scrollbars style={{minWidth: '10rem', height: '100%'}} autoHide>
                            {
                                is_loading ? (<DriverRegistrationSkeleton/>)
                                    : (<ul className="team" ref={user_list_box}>
                                        {
                                            Array.from(data_seed).map((user, index) =>
                                                <DriverItem
                                                    avatar={avatar}
                                                    vehicle_type={moto}
                                                    driver_registration_id={index}
                                                    status={user.status}
                                                    full_name={user.full_name}
                                                    id_number={user.id_number}
                                                    phone={user.phone}
                                                    license_plates={user.license_plates}
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