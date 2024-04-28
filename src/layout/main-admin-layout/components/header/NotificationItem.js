import avatar_admin from "~/assets/images/avatar/admin_avatar.jpg";
import {Stack} from "@mui/material";

export default function NotificationItem({content, avatar, from}) {
    return (
        <a href="#">
            <div className="dropdown-item">
                <Stack direction={'row'}    justifyContent="flex-start"  spacing={2}>
                    <img className="rounded-circle" src={avatar} alt="avatar"
                         style={{width: '40px', height: '40px'}}/>
                    <div>
                        <h6 className="mb-0">{from}</h6>
                        <small>{content}</small>
                    </div>
                </Stack>
            </div>
            <hr className="dropdown-divider"/>
        </a>
    )
}