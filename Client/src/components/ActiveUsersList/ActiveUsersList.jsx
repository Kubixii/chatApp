import { Link } from 'react-router-dom'
import React from 'react'
import { StoreContext } from '../../store/StoreProvider'
import { default as activeuserslistStyles } from './ActiveUsersList.module.scss'
import bemCssModules from 'bem-css-modules'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const style = bemCssModules(activeuserslistStyles)

const ActiveUsersList = () => {
    const { io, user } = useContext(StoreContext)

    const [usersList, setUsersList] = useState([])

    const refreshUsersList = () => {
        io.emit('getActiveUsers')
        io.on('getActiveUsersResponse', data => setUsersList(data))
    }

    useEffect(() => {
        setInterval(refreshUsersList, 10000)

        return () => clearInterval(refreshUsersList)
    }, [])


    const listElements = usersList.map(listUser => {
        if (listUser.username === user.username) return null
        return <Link
            key={listUser.id}
            to={`/${listUser.id}`}
        >{listUser.username}</Link>
    })

    return (
        <div className={style()}>
            {user.logged && listElements}
        </div>
    );
}

export default ActiveUsersList;