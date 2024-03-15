import {createContext, useEffect, useState} from "react";
import {Http} from '~/constants'
export const UserTokenContext = createContext("user_token_context")

function UserTokenProvider({children}) {
    const [user_token, setUserToken] = useState("hello")

    useEffect(()=> {
        localStorage.setItem(Http.USER_TOKEN, user_token);
    },[user_token])
    return (
        <UserTokenContext.Provider value={[user_token, setUserToken]}>
            {children}
        </UserTokenContext.Provider>
    )
}

export default UserTokenProvider