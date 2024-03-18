import {Stack} from "@mui/material";
import {UseViewLargeImg} from '~/hooks'

export default function Vehicle({license_plates, car_front, car_back, car_left, car_right}){
    return (<div className="shadow rounded h-100 p-4 bg-glass">
        <div className="row g-4">
            <h6>Vehicle</h6>
        </div>
        <hr/>
        <div className="col-sm-12 col-xl-12">
            <div className="mt-3">
                <p className={'title-field-driver-registration rounded'}>License Plates</p>
                <p className="text-dark">{license_plates}</p>
            </div>
            <hr/>
            <Stack
                justifyContent="space-between"
                direction={'column'}>
                <Stack direction={'row'} spacing={2}>
                    <div>
                        <p className={'title-field-driver-registration rounded'}>Front Of Vehicle</p>
                        <img
                            onClick={() => UseViewLargeImg(car_front)}
                            src={car_front}
                            alt="id card"
                            data-bs-toggle="modal"
                            data-bs-target="#image_larger_modal"
                            width={'100%'}
                            className="rounded mt-2 can-zoom"/>
                    </div>
                    <div>
                        <p className={'title-field-driver-registration rounded'}>Back Of Vehicle</p>
                        <img
                            onClick={() => UseViewLargeImg(car_back)}
                            src={car_back}
                            alt="id card"
                            data-bs-toggle="modal"
                            data-bs-target="#image_larger_modal"
                            width={'100%'}
                            className="rounded mt-2 can-zoom"/>
                    </div>
                </Stack>
                <Stack direction={'row'} spacing={2} className={'mt-5'}>
                    <div>
                        <p className={'title-field-driver-registration rounded'}>Left Of Vehicle</p>
                        <img
                            onClick={() => UseViewLargeImg(car_left)}
                            src={car_left}
                            alt="id card"
                            data-bs-toggle="modal"
                            data-bs-target="#image_larger_modal"
                            width={'100%'}
                            className="rounded mt-2 can-zoom"/>
                    </div>
                    <div>
                        <p className={'title-field-driver-registration rounded'}>Right Of Vehicle</p>
                        <img
                            onClick={() => UseViewLargeImg(car_right)}
                            src={car_right}
                            alt="id card"
                            data-bs-toggle="modal"
                            data-bs-target="#image_larger_modal"
                            width={'100%'}
                            className="rounded mt-2 can-zoom"/>
                    </div>
                </Stack>
            </Stack>
        </div>
    </div>)
}