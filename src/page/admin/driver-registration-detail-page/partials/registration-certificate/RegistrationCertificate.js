import {Stack} from "@mui/material"
import {UseViewLargeImg} from '~/hooks'

export default function RegistrationCertificate({front_certificate, back_certificate}){

    return(
        <div className="shadow rounded h-100 p-4 bg-glass">
            <div className="row g-4">
                <h6>Registration Certificate</h6>
            </div>
            <div className="col-sm-12 col-xl-12">
                <hr/>
                <Stack
                    className="mt-3"
                    justifyContent="space-between"
                    direction={'row'}
                    spacing={3}>
                    <div>
                        <p className={'title-field-driver-registration rounded'}>Front of Registration Certificate</p>
                        <img
                            onClick={() => UseViewLargeImg(front_certificate)}
                            src={front_certificate}
                            alt="id card"
                            data-bs-toggle="modal"
                            data-bs-target="#image_larger_modal"
                            width={'100%'}
                            className="rounded mt-2 can-zoom"/>
                    </div>

                    <div>
                        <p className={'title-field-driver-registration rounded'}>Back Of Registration Certificate</p>
                        <img
                            onClick={() => UseViewLargeImg(back_certificate)}
                            src={back_certificate}
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