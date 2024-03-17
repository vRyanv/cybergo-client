import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {CancelIcon, CheckCircleIcon} from "~/assets/icon";

export default function DriverInformation({   onBtnOpenRefuseDialogClicked,
                                              full_name,
                                              id_number,
                                              phone,
                                              address,
                                              avatar,
                                              cv,
                                              front_id_card,
                                              back_id_card
                                          }) {
    const onViewLargeImg = (img_src) => {
        const preview_img = document.getElementById('large_image')
        preview_img.src = img_src
    }
    return (
        <div className="shadow rounded h-100 p-4 bg-glass">
            <Stack direction={{xs: 'column', sm: 'row'}}
                   justifyContent="space-between"
                   alignItems="center">
                <div className="">
                    <h6 style={{width: 'fit-content'}}>Driver Information</h6>
                </div>
                <Stack direction="row" spacing={3}>
                    <Button startIcon={<CheckCircleIcon/>}
                            variant="outlined"
                            color={'success'}>Accept</Button>
                    <Button startIcon={<CancelIcon/>}
                            onClick={onBtnOpenRefuseDialogClicked }
                            variant="outlined"
                            color={'error'}>Refuse</Button>
                </Stack>
            </Stack>
            <hr/>
            <Stack justifyContent="space-between"
                   direction={{xs: 'column', sm: 'row'}}
                   spacing={3}>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Full Name</p>
                    <p className={`text-bg-secondary`}>{full_name}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Identity Number</p>
                    <p className="text-dark">{id_number}</p>
                </div>
                <div className="mt-3">
                    <p className={'title-field-driver-registration rounded'}>Phone</p>
                    <p className="text-dark">{phone}</p>
                </div>
            </Stack>
            <div className="mt-3">
                <p className={'title-field-driver-registration rounded'}>Address</p>
                <p className="text-dark">{address}</p>
            </div>
            <hr/>
            <Stack
                justifyContent="flex-start"
                direction={'row'}
                spacing={3}>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Driver Avatar</p>
                    <img
                        alt="avatar"
                        onClick={() => onViewLargeImg(avatar)}
                        src={avatar}
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'100%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Curriculum Vitae</p>
                    <img
                        alt="avatar"
                        onClick={() => onViewLargeImg(cv)}
                        src={cv}
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'100%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
            </Stack>
            <hr/>
            <Stack
                className="mt-3"
                justifyContent="flex-start"
                direction={'row'}
                spacing={3}>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Front of ID card</p>
                    <img
                        onClick={() => onViewLargeImg(front_id_card)}
                        src={front_id_card}
                        alt="id card"
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'100%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
                <div>
                    <p className={'title-field-driver-registration rounded'}>Back of ID card</p>
                    <img
                        onClick={() => onViewLargeImg(back_id_card)}
                        src={back_id_card}
                        alt="id card"
                        data-bs-toggle="modal"
                        data-bs-target="#image_larger_modal"
                        width={'100%'}
                        className="rounded mt-2 can-zoom"/>
                </div>
            </Stack>
        </div>
    )
}