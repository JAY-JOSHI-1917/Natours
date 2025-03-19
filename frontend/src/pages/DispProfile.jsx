import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import './../styles/profile.css';

import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';
import { Link } from 'react-router-dom';
import TourCard from '../shared/TourCard';  // Import your TourCard component to display tours
import useFetch from '../hooks/useFetch';

const DisplayProfile = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState(user.password || '');
    const [contact, setContact] = useState(user.contact || '');
    const [address, setAddress] = useState(user.address || '');
    const [photo, setPhoto] = useState(user.photo || '');

    // const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [bookedTours, setBookedTours] = useState();
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const user_id = user._id;
                const res = await fetch(`${BASE_URL}/booking/${user_id}`, {
                    method: 'GET',
                    headers: { "Content-type": "application/json" },
                    credentials: "include",
                });

                // console.log("dofjgfipo", res);
                if (!res.ok) {
                    // setError('failed to fetch');
                    alert('failed to fetch');
                }
                const result = await res.json();
                // console.log("dofjgfipo", result.data);
                const finalResult = result.data[0]
                console.log("qwertyui", finalResult);
                setBookedTours(result);
                // console.log(bookedTours);
                setLoading(false)
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [user._id]);

    return (
        <div className='Profile-Container'>
            <section className='Profile'>
                <div>
                    <h1>Your Profile</h1>
                </div>
                <div className="Profile-Form">
                    <div className="Photo-box">
                        {photo ? (
                            <img src={user.photo} alt="Profile" className="Photo" />
                        ) : (
                            <div className="Photo">
                                <img src={userIcon} alt="Profile" />
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
                    <div className="Contact disp-box">
                        <span className='contact'>Contact No: </span>
                        <span>{contact}</span>
                    </div>
                    <div className="Address disp-box">
                        <span>Address: </span>
                        <span className='address'>{address ? address : "Not Provided"}</span>
                    </div>
                </div>

                <Link to={"/editProfile"} className='edit-profile-btn btn primary__btn'>
                    <b>Edit Profile</b>
                </Link>
            </section>

            <section className='booked-tours'>
                <h1>Booked Tours</h1>

                {loading && <p>Loading booked tours...</p>}
                {error && <p>Error: {error}</p>}

                {Array.isArray(bookedTours) && bookedTours.length > 0 ? (
                    // <div className="tour-list">
                    //     {bookedTours.map(tour => (
                    //         <TourCard key={tour._id} tour={tour} />
                    //     ))}
                    // </div>
                    bookedTours.tourname
                ) : (
                    !loading && <p>No booked tours found.</p>
                )}
            </section>
        </div>
    );
};

export default DisplayProfile;
