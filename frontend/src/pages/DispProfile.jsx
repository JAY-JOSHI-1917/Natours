import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

import './../styles/profile.css';

import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';
import { Link } from 'react-router-dom';

const DisplayProfile = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState(user.address || '');
    const [photo, setPhoto] = useState(user.photo || '');

    // useEffect(() => {
    //   const fetchUserData = async () => {
    //     try {
    //       const response = await fetch('/api/user/profile'); // Adjust the endpoint as needed
    //       console.log('Response:', response); // Log the response for debugging
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const data = await response.json();
    //       setUserData(data);
    //     } catch (err) {
    //       setError(err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchUserData();
    // }, []);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <div className='Profile-Container'>
            <section className='Profile'>
            <div>
                <h1>Your Profile</h1>
            </div>
            <div className="Profile-Form">
                <div className="Photo-box">

                    {photo ? (
                        <img
                            src={user.photo}
                            alt="Profile"
                            className="Photo"
                        />
                    ) : (
                        <div className="Photo">
                            <img
                                src={userIcon}
                                alt="Profile"
                            />
                        </div>
                    )}

                </div>

                <div className="Username disp-box">
                    <span className='username'>Name: </span>
                    <span>{username}</span>
                </div>
                <div className="Email disp-box">
                    <span className='email'>Email: </span>
                    <span>{email}</span>
                </div>
                <div className="Password disp-box">
                    <span className='password'>Password: </span>
                    <span>{password}</span>
                </div>
                <div className="Address disp-box">
                    <span>Address: </span>
                    <span  className='address'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam maiores possimus aperiam? Quos molestias quas architecto error, illo, consectetur quaerat, impedit tenetur quod quae autem beatae voluptatum nemo esse doloremque?{address ? !address : "Not Provided"}</span>
                </div>
            </div>

            <Link to={"/editProfile"} className='edit-profile-btn btn primary__btn' ><b>Edit Profile</b></Link>
        </section>
        

        <section className='booked-tours'>
            <h1>Booked Tours</h1>
        </section>
        </div>

    );
};

export default DisplayProfile;