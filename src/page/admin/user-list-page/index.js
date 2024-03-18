import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack
} from "@mui/material";
import {RefreshTwoToneIcon, SearchIcon} from "~/assets/icon";

import Button from "@mui/material/Button";
import {DriverRegistrationStatus, Int} from "~/constants";
import {Scrollbars} from "react-custom-scrollbars-2";
import React, {useState} from "react";
import {UseNavIsClose} from "~/hooks";

import {UserCard, UserCardSkeleton} from './partials'

import avatar1 from '~/assets/images/avatar/avatar1.jpg'
import avatar2 from '~/assets/images/avatar/avatar2.jpeg'
import avatar3 from '~/assets/images/avatar/avatar3.jpg'
import avatar4 from '~/assets/images/avatar/avatar4.jpg'
import avatar5 from '~/assets/images/avatar/avatar5.jpg'

const avatar_list = [avatar1, avatar2, avatar3, avatar4, avatar5]

export default function UserListPage() {
    const is_nav_close = UseNavIsClose()
    const [is_loading, setIsLoading] = useState(true)
    setTimeout(()=>{
        setIsLoading(false)
    }, Int.DELAY_TIMEOUT_API)

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
                            <h5>Accounts</h5>
                            <Stack direction={{xs: 'column', sm: 'column', md: 'row'}}
                                   useFlexGap
                                   flexWrap="wrap"
                                   spacing={2}>
                                <Button startIcon={<RefreshTwoToneIcon/>}
                                        variant="outlined"
                                        color={'info'}>Refresh</Button>
                                <FormControl style={{minWidth: '15rem'}} variant="outlined" size="small">
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
                                        label="Search"
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: '15rem'}} size="small">
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
                                <FormControl style={{minWidth: '15rem'}} size="small">
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
                            <div className="container-fluid pt-4 px-4">
                                <div className="row">
                                    {
                                        is_loading ? (<UserCardSkeleton/>)
                                            : (
                                            avatar_list.map((avatar, index) => {
                                            return (
                                                <UserCard
                                                    key={index}
                                                    avatar={avatar}
                                                    id_number={'1230237123'}
                                                    full_name={'Ryan G'}
                                                    phone={'0374463592'}
                                                    email={'khangok1610@gmail.com'}
                                                    role={'USER'}
                                                    acc_status={'VERIIFY'}
                                                />
                                            )
                                        })
                                        )
                                    }
                                </div>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    )
}