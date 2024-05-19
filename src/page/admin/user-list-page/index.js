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
import {AccountStatus, FieldName, Http, Int} from "~/constants";
import React, {useEffect, useState} from "react";
import {UseLocalStorage} from "~/hooks";

import {UserCard, UserCardSkeleton} from './partials'
import axios from "axios";

export default function UserListPage() {
    const [is_loading, setIsLoading] = useState(false)
    const [userList, setUserList] = useState([])
    const [userListDisplay, setUserListDisplay] = useState([])

    useEffect(() => {
        GetUserList(AccountStatus.ALL)
    }, [])

    const GetUserList = (status) => {
        setIsLoading(true)
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/admin/user-management/list/${status}`,
            {
                headers: { 'authorization': token}
            }
        ).then((response) => {
            setTimeout(()=>{
                setUserList(response.data.user_list)
                setUserListDisplay(response.data.user_list)
                setIsLoading(false)
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    const [status_selection, setStatusSelection] = useState(AccountStatus.ALL)
    const onChangeAccountStatusFilter = (e) => {
        setStatusSelection(e.target.value)
        GetUserList(e.target.value)
    }
    const [searchName, setSearchName] = useState("")

    const onSearchAccountByName = () => {
        const find_name_list = userList.filter(user => user.full_name.toLowerCase().includes(searchName) || user.phone_number.includes(searchName))
        setUserListDisplay(find_name_list)
    }

    const onRefresh = () => {
        setStatusSelection(AccountStatus.ALL)
        GetUserList(AccountStatus.ALL)
    }

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12 header-body">
                    <div className="container-fluid pb-4 pt-4 px-4 bg-glass rounded"
                         style={{position: 'sticky', zIndex: '1000', top: '82px'}}>
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
                                        onClick={onRefresh}
                                        color={'info'}>Refresh</Button>
                                <FormControl style={{minWidth: '15rem'}} variant="outlined" size="small">
                                    <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={'text'}
                                        value={searchName}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={(e)=>onSearchAccountByName(e)}
                                                    onMouseDown={() => {
                                                    }}
                                                    edge="end"
                                                >
                                                    <SearchIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        onChange={(e) => setSearchName(e.target.value)}
                                        label="Search"
                                    />
                                </FormControl>
                                <FormControl style={{minWidth: '15rem'}} size="small">
                                    <InputLabel id="demo-simple-select-label">
                                        Account status
                                    </InputLabel>
                                    <Select
                                        sx={{width: '100%', border: 'green'}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status_selection}
                                        onChange={(e) => onChangeAccountStatusFilter(e)}
                                        label="Registration Status">
                                        {
                                            Object.keys(AccountStatus).map((key, index) => {
                                                return <MenuItem key={index}
                                                                 value={AccountStatus[key]}>{AccountStatus[key]}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </div>
                    <div className={`bg-glass rounded p-4 mt-3`} style={{minHeight:'100vh'}}>
                            <div className="container-fluid pt-4 px-4">
                                <div className="row">
                                    {
                                        is_loading ? (<UserCardSkeleton/>)
                                            : (
                                                userListDisplay.map((user, index) => {
                                            return (
                                                <UserCard
                                                    key={index}
                                                    user_id={user._id}
                                                    avatar={user.avatar}
                                                    id_number={user.id_number}
                                                    full_name={user.full_name}
                                                    phone={user.country.prefix + user.phone_number}
                                                    email={user.email}
                                                    role={user.role}
                                                    rating={user.rating}
                                                    acc_status={user.account_status}
                                                />
                                            )
                                        })
                                        )
                                    }
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}