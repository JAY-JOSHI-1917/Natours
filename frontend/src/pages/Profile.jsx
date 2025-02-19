import { React, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    return (
        <>
            <div className="Username">{user.username}</div>
            <div className="email">{user.email}</div>
        </>
    )
}

export default Profile