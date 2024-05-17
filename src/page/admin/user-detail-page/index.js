import {
    IconButton,
    Stack
} from "@mui/material";
import Button from "@mui/material/Button";
import {KeyboardReturnIcon, BlockTwoToneIcon} from "~/assets/icon";
import React, {useEffect, useState} from "react";

import {UseHistoryBack, UseLocalStorage} from '~/hooks'
import {
    UserInformation,
    UserInformationSkeleton,
    IdentityCard,
    IdentityCardSkeleton,
    VehicleList,
    VehicleListSkeleton
} from './partials'


import {Http, Int, Message, StatusCode} from '~/constants'

import avatar from '~/assets/images/avatar/truc.jpg'
import front_id_card from '~/assets/images/front-id-card.jpg'
import back_id_card from '~/assets/images/back-id-card.png'
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {enqueueSnackbar} from "notistack";

export default function AccountDetail() {
    const navigate = useNavigate()
    const [is_loading, setIsLoading] = useState(true)
    const [user_detail, setUserDetail] = useState()

    const {user_id} = useParams()
    useEffect(()=> {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(Http.USER_TOKEN)
        axios.get(
            `${Http.HOST}/admin/user-management/detail/${user_id}`,
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            if(response.data.code !== StatusCode.OK){
                navigate('/not-found')
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
                            <h5>User Details</h5>
                            <Button startIcon={<BlockTwoToneIcon/>}
                                    variant="outlined"
                                    disabled={is_loading}
                                    color={'danger'}>
                                Ban user
                            </Button>
                        </Stack>
                    </div>
                </div>
                <div className="col-sm-12 col-xl-12">
                    <div className="container-fluid px-4 container-fluid-body">
                        <div className="row g-4">
                            <div className="col-sm-12 col-xl-6 ">
                                {
                                    is_loading ? (<UserInformationSkeleton/>)
                                        : (<UserInformation
                                            id_number={user_detail.user.id_number}
                                            full_name={user_detail.user.full_name}
                                            phone={user_detail.user.country.prefix + user_detail.user.phone_number}
                                            address={user_detail.user.address}
                                            avatar={user_detail.user.avatar}
                                            start={user_detail.user.rating}
                                        />)
                                }
                            </div>
                            <div className="col-sm-12 col-xl-6">
                                {
                                    is_loading ? (<IdentityCardSkeleton/>)
                                        : (<IdentityCard
                                            front_id_card={user_detail.user.front_id_card}
                                            back_id_card={user_detail.user.back_id_card}
                                        />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    is_loading ? (<VehicleListSkeleton/>) : (<VehicleList vehicles={user_detail.vehicles}/>)
                }
            </div>
        </div>
    )
}