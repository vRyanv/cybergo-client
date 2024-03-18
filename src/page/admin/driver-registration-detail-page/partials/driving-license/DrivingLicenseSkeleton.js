import {Skeleton, Stack} from "@mui/material"
import {UseViewLargeImg} from '~/hooks'

export default function DrivingLicense(){

    return(
        <div className="shadow rounded h-100 p-4 bg-glass">
            <div className="row g-4">
                <h6>Driving License</h6>
            </div>
            <div className="col-sm-12 col-xl-12">
                <hr/>
                <Stack
                    className="mt-3"
                    justifyContent="space-between"
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
        </div>
    )
}