import {Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function NotificationItem({content, full_name, avatar, vehicle_id}) {
    const navigate = useNavigate();
    const onItemClicked = () => {
        navigate(`/driver-registration/detail/${vehicle_id}`)
    }
    return (
        <div className="cursor-pointer dropdown-item" onClick={onItemClicked}>
            <div>
                <Stack direction={'row'}    justifyContent="flex-start"  spacing={2}>
                    <img className="rounded-circle" src={avatar} alt="avatar"
                         style={{width: '40px', height: '40px'}}/>
                    <div>
                        <h6 className="mb-0">{full_name}</h6>
                        <small>{content}</small>
                    </div>
                </Stack>
            </div>
            <hr className="dropdown-divider"/>
        </div>
    )
}