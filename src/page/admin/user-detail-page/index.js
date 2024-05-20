import {IconButton, Stack} from "@mui/material";
import {KeyboardReturnIcon} from "~/assets/icon";
import React, {useEffect, useState} from "react";

import {UseHistoryBack, UseLocalStorage} from '~/hooks'
import {
    AccountStatusButton,
    IdentityCard,
    IdentityCardSkeleton,
    UserInformation,
    UserInformationSkeleton,
    VehicleList,
    VehicleListSkeleton
} from './partials'


import {FieldName, Http, Int, StatusCode} from '~/constants'

import {useParams} from "react-router-dom";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

export default function AccountDetail() {
    const [is_loading, setIsLoading] = useState(true)
    const [user_detail, setUserDetail] = useState()

    const {user_id} = useParams()
    useEffect(()=> {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/api/admin/user-management/detail/${user_id}`,
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            console.log(response.data)
            if(response.data.code !== StatusCode.OK){
                setUserDetail(undefined)
                console.log(user_detail)
                setIsLoading(false)
                enqueueSnackbar('Not found - 404', {variant: 'error'})
                return
            }
            setTimeout(() => {
                setUserDetail({
                    user: response.data.user,
                    vehicles: response.data.vehicles,
                })
                setIsLoading(false)
            }, Int.DELAY_TIMEOUT_API)
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="container-fluid pt-4 px-4 mb-3">
            <div className="row g-4">
                <div className="col-sm-12 col-xl-12 header-body">
                    <div className="container-fluid pb-4 pt-4 px-4 bg-glass rounded"
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
                            <h5>User Detail</h5>
                            {
                               user_detail ?
                                  <AccountStatusButton user_id={user_detail.user._id} account_status={user_detail.user.account_status}/>
                                   :
                                   (<div></div>)
                            }

                        </Stack>
                    </div>
                </div>
                <div className="col-sm-12 col-xl-12">
                    <div className="container-fluid px-4 container-fluid-body">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-6 ">
                                {
                                    is_loading ? (<UserInformationSkeleton/>)
                                        : (
                                            user_detail ?
                                                (<UserInformation
                                            id_number={user_detail.user.id_number}
                                            full_name={user_detail.user.full_name}
                                            phone={user_detail.user.country.prefix + user_detail.user.phone_number}
                                            address={user_detail.user.address}
                                            avatar={user_detail.user.avatar}
                                            start={user_detail.user.rating} />)
                                            :
                                                (<div></div>)
                                        )
                                }
                            </div>
                            <div className="col-sm-12 col-xl-6">
                                {
                                    is_loading ? (<IdentityCardSkeleton/>)
                                        : ( user_detail ? (<IdentityCard
                                            front_id_card={user_detail.user.front_id_card}
                                            back_id_card={user_detail.user.back_id_card}
                                        />) : (<div></div>)
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    is_loading ? (<VehicleListSkeleton/>) : ( user_detail ? (<VehicleList vehicles={user_detail.vehicles}/>) : (<div></div>))
                }
            </div>
        </div>
    )
}