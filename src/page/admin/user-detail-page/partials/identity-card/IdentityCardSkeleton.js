import {Skeleton, Stack} from "@mui/material";

import React from "react";

export default function IdentityCardSkeleton({front_id_card, back_id_card}){
    return (
        <div className="shadow rounded h-100 p-4 bg-glass">
            <h6>Identity Card</h6>
            <hr/>
            <Stack
                className="mt-3"
                justifyContent="flex-start"
                direction={'row'}
                spacing={3}>
                <div style={{width: '100%'}}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                    <Skeleton variant="rounded" width={'100%'} height={220} />
                </div>
                <div style={{width: '100%'}}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                    <Skeleton variant="rounded" width={'100%'} height={220} />
                </div>
            </Stack>
        </div>
    )
}