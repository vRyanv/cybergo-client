import {Skeleton, Stack} from "@mui/material";

export default function DriverInformation() {
    return (
        <div className="shadow rounded h-100 p-4 bg-glass">
            <Stack direction={'row'}
                   justifyContent="space-between" >
                <h6 style={{width: 'fit-content'}}>User Information</h6>
                <div>
                    <Skeleton variant="rounded" width={90} height={35} />
                </div>
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
                <div style={{width: '40%'}}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                    <Skeleton variant="rounded" width={'100%'} height={220} />
                </div>
            </Stack>
        </div>
    )
}