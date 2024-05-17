import user_card_style from './user-card.module.css'
import clsx from 'clsx'
import React from "react";
import {Skeleton, Stack} from "@mui/material";

export default function UserCard() {
    const skeletons = [1,2,3,4,5,6,7,8]
    return (
        skeletons.map((s,index) =>
        <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3 d-inline-block">
            <div className={clsx(user_card_style.nft)}>
                <div className={clsx(user_card_style.main)}>
                    <Stack direction={'column'} spacing={1}>
                        <Skeleton variant="rounded" width={'100%'} height={150} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={30}  width={120} />
                    </Stack>
                    <Stack>
                        <Stack justifyContent="flex-start"
                               alignItems="center"
                               spacing={3}
                               direction={'row'}>
                            <div>
                                <Skeleton variant="rounded" width={20} height={20} />
                            </div>
                            <div style={{width:'100%'}}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={30}  width={'50%'} />
                            </div>
                        </Stack>
                        <Stack justifyContent="flex-start"
                               alignItems="center"
                               spacing={3}
                               direction={'row'}>
                            <div>
                                <Skeleton variant="rounded" width={20} height={20} />
                            </div>
                            <div style={{width:'100%'}}>
                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={30}  width={'50%'} />
                            </div>
                        </Stack>
                    </Stack>
                    <div className={'mt-2'}>
                        <Stack justifyContent="space-between"
                               alignItems="center"
                               direction={'row'}>
                            <div>
                                <Skeleton variant="rounded" width={120} height={20} />
                            </div>
                            <div>
                                <Skeleton variant="rounded" width={60} height={30} />
                            </div>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
        )
    )
}