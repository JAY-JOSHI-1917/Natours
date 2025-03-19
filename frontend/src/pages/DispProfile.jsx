import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

import './../styles/profile.css';

import userIcon from '../assets/images/user.png';
import { BASE_URL } from '../utils/config';
import { Link } from 'react-router-dom';
import TourCard from '../shared/TourCard';

const DisplayProfile = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [username, setUsername] = useState(user.username || '');
    const [email, setEmail] = useState(user.email || '');
    const [contact, setContact] = useState(user.contact || '');
    const [address, setAddress] = useState(user.address || '');
    const [photo, setPhoto] = useState(user.photo || '');

    const [bookedTours, setBookedTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookedTours = async () => {
            try {
                const userId = user._id;
                const res = await fetch(`${BASE_URL}/booking/${userId}`);

                if (!res.ok) {
                    setError('Failed to fetch the data.');
                    return;
                }

                const result = await res.json();
                const finalResult = result.data || [];

                const tours = await Promise.all(finalResult.map(async (booking) => {
                    const tourId = booking.tourId;
                    if (!tourId) return null;

                    try {
                        const tourRes = await fetch(`${BASE_URL}/tours/${tourId}`);
                        if (tourRes.ok) {
                            const tourData = await tourRes.json();
                            return tourData.data || null;
                        }
                    } catch (error) {
                        console.error('Failed to fetch tour data:', error);
                    }
                    return null;
                }));

                setBookedTours(tours.filter(tour => tour !== null));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookedTours();
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

                    <div className="Username disp-box"><span className='username'>Name: </span><span>{username}</span></div>
                    <div className="Email disp-box"><span className='email'>Email: </span><span>{email}</span></div>
                    <div className="Contact disp-box"><span className='contact'>Contact No: </span><span>{contact}</span></div>
                    <div className="Address disp-box"><span>Address: </span><span className='address'>{address || "Not Provided"}</span></div>
                </div>

                <Link to="/editProfile" className='edit-profile-btn btn primary__btn'>
                    <b>Edit Profile</b>
                </Link>
            </section>

            <section className='booked-tours'>
                <h1>Booked Tours</h1>
                {loading && <p>Loading booked tours...</p>}
                {error && <p>Error: {error}</p>}

                {bookedTours.length > 0 ? (
                    <div className="tour-list">
                        {bookedTours.map((tour, index) => (
                            tour && tour._id ? <TourCard key={tour._id} tour={tour} /> : <p key={index}>Failed to load tour data.</p>
                            // <div>{ tour.title}</div>
                            // <div>{ tour}</div>
                        ))}
                    </div>
                ) : (
                    !loading && <p>No booked tours found.</p>
                )}
            </section>
        </div>
    );
};

export default DisplayProfile;