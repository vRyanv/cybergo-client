import {Skeleton, Stack} from "@mui/material";

export default function Vehicle(){
    return (<div className="shadow rounded h-100 p-4 bg-glass">
        <div className="row g-4">
            <h6>Vehicle</h6>
        </div>
        <hr/>
        <div className="col-sm-12 col-xl-12">
            <div className="mt-3">
                <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={120}/>
            </div>
            <hr/>
            <Stack
                justifyContent="space-between"
                direction={'column'}>
                <Stack direction={'row'} spacing={2}>
                    <div style={{width: '100%'}}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                        <Skeleton variant="rounded" width={'100%'} height={220} />
                    </div>
                    <div style={{width: '100%'}}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                        <Skeleton variant="rounded" width={'100%'} height={220} />
                    </div>
                </Stack>
                <Stack direction={'row'} spacing={2} className={'mt-5'}>
                    <div style={{width: '100%'}}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                        <Skeleton variant="rounded" width={'100%'} height={220} />
                    </div>
                    <div style={{width: '100%'}}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }}  width={60} />
                        <Skeleton variant="rounded" width={'100%'} height={220} />
                    </div>
                </Stack>
            </Stack>
        </div>
    </div>)
}