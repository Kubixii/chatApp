import { Navigate } from 'react-router-dom';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useContext } from 'react';

const NoChat = () => {
    const { user } = useContext(StoreContext)

    return (
        <div>
            {!user.logged && <Navigate to='/login' />}
            Select users from the users list to start chatting
        </div>
    );
}

export default NoChat;