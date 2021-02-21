import React, {useEffect, useState} from 'react'
import {Socket} from 'phoenix';
import SocketContext from './SocketContext';
import {getToken} from "../../utils";
import {WEB_SOCKET_URL} from "../../constants";

const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const fetchData = async ()=> {
            console.log('socket', socket);
            const token = await getToken();
            console.log('token',token);
            const params = {token};
            const s = new Socket(WEB_SOCKET_URL, {params});
            s.onOpen( () => console.log("connection open!") )
            s.onError( () => console.log("there was an error with the connection!") )
            s.onClose( () => console.log("the connection dropped") )
            s.connect();
            setSocket(s);
        }
        fetchData();
        return () => {
            socket && socket.disconnect();
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider