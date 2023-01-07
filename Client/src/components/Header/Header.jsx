import React from 'react'
import { StoreContext } from '../../store/StoreProvider';
import { useContext } from 'react';

const Header = () => {

    const { user, logout } = useContext(StoreContext)

    return (
        <div>
            {user.username}
            {user.logged && <button onClick={logout}>Logout</button>}
        </div>
    );
}

export default Header;