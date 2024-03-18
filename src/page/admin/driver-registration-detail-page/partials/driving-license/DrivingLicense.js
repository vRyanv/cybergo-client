import {Stack} from "@mui/material"
import {UseViewLargeImg} from '~/hooks'

export default function DrivingLicense({front_driving_license, back_driving_license}){

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
                    <div>
                        <p className={'title-field-driver-registration rounded'}>Front of Driving License</p>
                        <img
                            onClick={() => UseViewLargeImg(front_driving_license)}
                            src={front_driving_license}
                            alt="id card"
                            data-bs-toggle="modal"
                            data-bs-target="#image_larger_modal"
                            width={'100%'}
                            className="rounded mt-2 can-zoom"/>
                    </div>

                    <div>
                        <p className={'title-field-driver-registration rounded'}>Back Of Driving License</p>
                        <img
                            onClick={() => UseViewLargeImg(back_driving_license)}
                            src={back_driving_license}
                            alt="id card"
                            data-bs-toggle="modal"
                            data-bs-target="#image_larger_modal"
                            width={'100%'}
                            className="rounded mt-2 can-zoom"/>
                    </div>
                </Stack>
            </div>
        </div>
    )
}