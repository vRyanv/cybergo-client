import {Scrollbars} from "react-custom-scrollbars-2";
import {useEffect, useState} from "react";

import NotificationItem from "./NotificationItem";
import {UseLocalStorage} from "~/hooks";
import {Http, ResourcePath, StatusCode} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {useSocket} from "~/service/socket/SocketService";
import {SocketEvent} from "~/service/socket/SocketEvent";

export default function Notifications(){
    const socket = useSocket();
    const [notifications, setNotifications] = useState([]);
    useEffect(()=> {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(Http.USER_TOKEN)
        axios.get(
            `${Http.HOST}/notification/admin`,
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            if(response.data.code !== StatusCode.OK){
                return
            }
            setNotifications(response.data.notifications)
            console.log(response.data.notifications)
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar('Something went wrong, get notifications failed', {variant: 'error'})
        })

        const onReceiveNotification = (data) => {
            let notification = JSON.parse(data)
            setNotifications(prevNotifications => [notification].concat(prevNotifications));
        }
        socket.on(SocketEvent.NOTIFICATION, onReceiveNotification)
        return () => {
            socket.off(SocketEvent.NOTIFICATION, onReceiveNotification);
        };
    }, [])
    return (
        <Scrollbars style={{minWidth: '10rem', height: 300}}  autoHide>
            {
                notifications.map((notification, index) =>
                    <NotificationItem
                        key={index}
                        full_name={notification.full_name}
                        avatar={String(Http.HOST + ResourcePath.AVATAR_RES_PATH + notification.avatar)}
                        content={notification.content}
                        vehicle_id={notification.vehicle_id}/>
                )
            }
        </Scrollbars>
    )
}