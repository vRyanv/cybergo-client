import {
    IconButton,
    Stack
} from "@mui/material";
import Button from "@mui/material/Button";
import {KeyboardReturnIcon, BlockTwoToneIcon} from "~/assets/icon";
import React, {useState} from "react";

import {UseHistoryBack} from '~/hooks'
import {
    UserInformation,
    UserInformationSkeleton,
    IdentityCard,
    IdentityCardSkeleton,
    VehicleList,
    VehicleListSkeleton
} from './partials'


import {Int} from '~/constants'

import avatar from '~/assets/images/avatar/avatar1.jpg'
import front_id_card from '~/assets/images/front-id-card.jpg'
import back_id_card from '~/assets/images/back-id-card.png'

export default function AccountDetail() {
    const [is_loading, setIsLoading] = useState(true)

    setTimeout(() => {
        setIsLoading(false)
    }, Int.DELAY_TIMEOUT_API)

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
                                            id_number={'12378465123'}
                                            full_name={'Ryan G'}
                                            phone={'0374463592'}
                                            address={'somewhere'}
                                            avatar={avatar}
                                            front_id_card={front_id_card}
                                            back_id_card={back_id_card}
                                        />)
                                }
                            </div>
                            <div className="col-sm-12 col-xl-6">
                                {
                                    is_loading ? (<IdentityCardSkeleton/>)
                                        : (<IdentityCard
                                            front_id_card={front_id_card}
                                            back_id_card={back_id_card}
                                        />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    is_loading ? (<VehicleListSkeleton/>) : (<VehicleList/>)
                }
            </div>
        </div>
    )
}