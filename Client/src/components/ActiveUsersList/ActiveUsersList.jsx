import { Link } from 'react-router-dom'
import React from 'react'
import { StoreContext } from '../../store/StoreProvider'
import { default as activeuserslistStyles } from './ActiveUsersList.module.scss'
import bemCssModules from 'bem-css-modules'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const style = bemCssModules(activeuserslistStyles)

const ActiveUsersList = () => {
    const { io, user, unreadMessages } = useContext(StoreContext)

    const [usersList, setUsersList] = useState([])
    const { userID } = useParams()
    const refreshUsersList = () => {
        io.emit('getActiveUsers')
        io.on('getActiveUsersResponse', data => setUsersList(data))
        if (user.logged) io.emit('getUnreadMessages', user)
    }

    useEffect(() => {
        setInterval(refreshUsersList, 10000)

        return () => clearInterval(refreshUsersList)
    }, [])


    const listElements = usersList.map(listUser => {
        if (listUser.username === user.username) return null
        const hasUnreadMessage = unreadMessages.filter(message => message.from.id === listUser.id)
        const shouldDisplay = (hasUnreadMessage.length > 0 && hasUnreadMessage[0].from.id !== parseInt(userID))

        return (
            <Link
                className={style('userLink')}
                to={`/${listUser.id}`}
                key={listUser.id}
            >
                <div className={`${style('user')} ${shouldDisplay ? style('hasUnReadMessage') : style('noUnreadMessage')}`}>
                    <p> {listUser.username}</p>
                    <div className={shouldDisplay ? style('messagePreview') : null}>
                        <p>
                            {shouldDisplay ? hasUnreadMessage[hasUnreadMessage.length - 1].text : null}
                        </p>
                    </div>
                </div>
            </Link>
        )
    })

    return (
        <div className={style()}>
            <div className={style('title')}>
                <p>Active users</p>
            </div>
            <div className={style('usersWrapper')}>
                {user.logged && listElements}
            </div>
        </div>
    );
}

export default ActiveUsersList;