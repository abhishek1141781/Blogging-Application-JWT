import React, { useEffect, useState } from 'react'
import userContext from './userContext'
import { getCurrentUserDetail, isLoggedIn } from '../auth/authIndex'

function UserProvider({ children }) {

    const [user, setUser] = useState({
        data: {},
        login: false
    })
    useEffect(() => {
        setUser({
            data: getCurrentUserDetail(),
            login: isLoggedIn()
        })
    }, [])

    return (

        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>

    )
}

export default UserProvider