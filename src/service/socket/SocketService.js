import {createContext, useContext} from 'react'
import {io} from "socket.io-client";
import {Http} from "~/constants";
import {UseLocalStorage} from "~/hooks";
import {SocketEvent} from "~/service/socket/SocketEvent";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
const socket = io(
    Http.HOST,
    {
        autoConnect: false,
    }
)
export default function SocketService({children }){
    const [getLocal] = UseLocalStorage()
    const token = getLocal(Http.USER_TOKEN)
    if(!socket.connected && token){
        socket.auth = {token}
        socket.autoConnect = true
        socket.connect()
    }
    socket.on('connect', () => {
        console.log('socket connect: ',socket.id)
    })
    socket.on('connect_error', (error) => {
        console.log('socket connect_error: ',error.message)
        socket.off(SocketEvent.NOTIFICATION);
    })

    socket.on('reconnect', (number)=> {
        console.log("socket reconnect: ", number)
    })

    socket.on('disconnect', (reason)=>{
        console.log("socket disconnect reason: ", reason)
        socket.off(SocketEvent.NOTIFICATION);
    })

    return (
        <SocketContext.Provider value={socket}>
            {children }
        </SocketContext.Provider>
    )
}