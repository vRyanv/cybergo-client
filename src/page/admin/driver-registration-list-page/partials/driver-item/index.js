import './driver-item.css'
import {DriverRegistrationStatus} from '~/constants'
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";

export default function Index({vehicle_id, avatar, full_name, id_number, phone, license_plates, vehicle_type, status}) {
    let status_classes;
    console.log(vehicle_id)
    if (status === DriverRegistrationStatus.QUEUE) {
        status_classes = 'queue-driver-registration-status bg-blue-sky-light'
    } else if (status === DriverRegistrationStatus.ACCEPTED) {
        status_classes = 'accept-driver-registration-status bg-green-light'
    } else if (status === DriverRegistrationStatus.REFUSED) {
        status_classes = 'refuse-driver-registration-status bg-red-light'
    }

    const navigate = useNavigate()
    const onDriverRegistrationClicked = (e, vehicle_id) => {
        navigate(`/driver-registration/detail/${vehicle_id}`)
    }

    return (
        <li onClick={(e) => onDriverRegistrationClicked(e, vehicle_id)}
            className={`member driver-registration-status ${status_classes}`}>
            <div className="thumb">
                <img src={avatar} alt="avatar"/>
            </div>
            <div className="description">
                <h3 className="driver-name-item">{full_name}</h3>
                <Stack
                    style={{marginTop: '1rem'}}
                    justifyContent="space-around"
                    direction={{xs: 'column', sm: 'row'}}>
                    <div className="mb-3">
                        <label className="form-label title-info-driver">Identity Number</label>
                        <div>{id_number}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label title-info-driver">Phone Number</label>
                        <div>{phone}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label title-info-driver">License Plates</label>
                        <div>{license_plates}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label title-info-driver">Transport Type</label>
                        <div style={{textAlign: 'center'}}>
                            <img
                                style={{width: '50px', height: '50px'}}
                                src={vehicle_type}
                                alt="transport-type"/>
                        </div>
                    </div>
                </Stack>
            </div>
        </li>
    )
}