import {Scrollbars} from "react-custom-scrollbars-2";
import React, {useEffect, useState} from "react";

import NotificationItem from "./NotificationItem";
import {UseLocalStorage} from "~/hooks";
import {FieldName, Http, ResourcePath, StatusCode} from "~/constants";
import axios from "axios";
import {enqueueSnackbar} from "notistack";
import {useSocket} from "~/service/socket/SocketService";
import {SocketEvent} from "~/service/socket/SocketEvent";
import {KeyboardArrowDownIcon, NotificationsNoneTwoToneIcon} from "~/assets/icon";
import clsx from "clsx";
import notification_audio from '~/assets/audio/notification.mp3'

export default function Notifications() {
    const socket = useSocket();
    const [notifications, setNotifications] = useState([]);
    const [has_notification, setHasNotification] = useState(false);
    useEffect(() => {
        const [getLocal] = UseLocalStorage()
        const token = getLocal(FieldName.USER_TOKEN)
        axios.get(
            `${Http.HOST}/notification/admin`,
            {
                headers: {'authorization': token}
            }
        ).then((response) => {
            if (response.data.code !== StatusCode.OK) {
                return
            }
            setNotifications(response.data.notifications)
        }).catch((error) => {
            console.log(error)
            enqueueSnackbar('Something went wrong, get notifications failed', {variant: 'error'})
        })

        const onReceiveNotification = (data) => {
            let notification = JSON.parse(data)
            setNotifications(prevNotifications => [notification].concat(prevNotifications));
            setHasNotification(true)
            try{
                const audio = new Audio(notification_audio);
                audio.play()
            } catch (error){
                console.log(error)
            }
        }
        socket.on(SocketEvent.NOTIFICATION, onReceiveNotification)
        return () => {
            socket.off(SocketEvent.NOTIFICATION, onReceiveNotification);
        };
    }, [])

    const onNotifyContainerClicked = () => {
        setHasNotification(false)
    }

    return (
        <div className="nav-item dropdown" onClick={onNotifyContainerClicked}>
            <a href="#" style={{color: 'black'}} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                <div className={clsx('d-inline-block div-icon-dropdown', has_notification && 'has-notification')}>
                    <NotificationsNoneTwoToneIcon/>
                </div>
                <span className="d-none d-lg-inline-flex" style={{marginLeft: '1rem'}}>Notification</span>
                <KeyboardArrowDownIcon className="i con-arrow"/>
            </a>
            <div
                className="dropdown-menu dropdown-menu-end border-0 rounded m-0"
                data-bs-popper="none" style={{minWidth: '17rem'}}>
                <Scrollbars style={{minWidth: '10rem', height: 300}} autoHide>
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
            </div>
        </div>
    )
}