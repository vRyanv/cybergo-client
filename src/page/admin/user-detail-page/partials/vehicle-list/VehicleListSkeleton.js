import React from "react";
import data from '~/data/driver-registration.json'
import {Box, Skeleton} from "@mui/material";

export default function VehicleList(){

    return (
        <div className="col-sm-12 col-xl-12">
            <div className="shadow rounded h-100 p-4 bg-glass">
                <h6>Vehicle</h6>
                <hr/>
                {
                    data.map((d, index)=> {
                        return (
                                <Box sx={{display: 'flex', alignItems: 'center'}} key={index}>
                                    <Box sx={{margin: 1}}>
                                        <Skeleton variant="rounded"
                                                  width={150}
                                                  sx={{bgcolor: 'grey.400'}}
                                                  height={'15vmin'}>
                                        </Skeleton>
                                    </Box>
                                    <Box sx={{width: '100%'}}>
                                        <Skeleton
                                            sx={{bgcolor: 'grey.400'}}
                                            variant="rounded"
                                            width={'100'}
                                            height={'15vmin'}>
                                        </Skeleton>
                                    </Box>
                                </Box>
                        )
                    })
                }
            </div>
        </div>
    )
}