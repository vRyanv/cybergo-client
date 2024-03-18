import {Skeleton, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {CancelIcon, CheckCircleIcon} from "~/assets/icon";

export default function DriverInformation() {
    return (
        <div className="shadow rounded h-100 p-4 bg-glass">
            <Stack direction={{xs: 'column', sm: 'row'}}
                   justifyContent="space-between"
                   alignItems="center">
                <div className="">
                    <h6 style={{width: 'fit-content'}}>Driver Information</h6>
                </div>
                <Stack direction="row" spacing={3}>
                    <Skeleton variant="rounded" width={100} height={40} />
                    <Skeleton variant="rounded" width={100} height={40} />
                </Stack>
            </Stack>
            <hr/>
            <Stack justifyContent="space-between"
                   direction={{xs: 'column', sm: 'row'}}
                   spacing={3}>
                <div className="mt-3">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={120}/>
                </div>
                <div className="mt-3">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={120}/>
                </div>
                <div className="mt-3">
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={120}/>
                </div>
            </Stack>
            <div className="mt-3">
                <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={120}/>
            </div>
            <hr/>
            <Stack
                justifyContent="space-between"
                direction={'row'}
                spacing={3}>
                <div style={{width: '50%'}}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                    <Skeleton variant="rounded" width={'100%'} height={220} />
                </div>
            </Stack>
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