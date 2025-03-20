// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import { BASE_URL } from '../../utils/config';

// const UpdateBooking = ({ bookingId }) => {
//     const { user } = useContext(AuthContext);
//     const [bookingData, setBookingData] = useState({
//         name: '',
//         email: '',
//         date: '',
//         guests: 1,
//     });

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     useEffect(() => {
//         // Fetch the booking data when the component mounts
//         const fetchBookingData = async () => {
//             try {
//                 const userId = user._id;
//                 const res = await fetch(`${BASE_URL}/booking/${userId}`);

//                 if (!res.ok) {
//                     setError('Failed to fetch the data.');
//                     return;
//                 }

//                 const result = await res.json();
//                 const finalResult = result.data || [];

//                 setBookingData(finalResult);
//                 bookingDatashow(finalResult)
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }

//             // try {
//             //     const userId = user._id;
//             //     const response = await axios.get(`/api/bookings/${userId}`);
//             //     setBookingData(response.data);
//             // } catch (error) {
//             //     console.error('Error fetching booking data:', error);
//             // }
//         };

//         fetchBookingData();
//     }, [bookingId]);

//     function bookingDatashow(data) {
//         console.log(data);
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setBookingData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`/api/bookings/${bookingId}`, bookingData);
//             alert('Booking updated successfully!');
//         } catch (error) {
//             console.error('Error updating booking:', error);
//             alert('Failed to update booking.');
//         }
//     };

//     return (
//         <div>
//             <h2>Update Booking</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Name:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={bookingData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={bookingData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Date:</label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={bookingData.date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Guests:</label>
//                     <input
//                         type="number"
//                         name="guests"
//                         value={bookingData.guests}
//                         onChange={handleChange}
//                         min="1"
//                         required
//                     />
//                 </div>
//                 <button type="submit">Update Booking</button>
//             </form>
//         </div>
//     );
// };

// export default UpdateBooking;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const UpdateBooking = () => {

    const location = useLocation();
    const tourId = location.state?.tourId;
    console.log(tourId);
    const { user } = useContext(AuthContext); // Get the tourId from URL
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        date: '',
        guests: 1,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the booking data when the component mounts
        const fetchBookingData = async () => {
            try {
                const userId = user._id;
                const res = await fetch(`${BASE_URL}/booking/${userId}`);  // Modified URL to include tourId

                if (!res.ok) {
                    setError('Failed to fetch the data.');
                    return;
                }

                const result = await res.json();
                const finalResult = result.data || {};

                setBookingData(finalResult);
                bookingDatashow(finalResult)
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [tourId]);
    function bookingDatashow(data) {
        console.log(data);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     await axios.put(`${BASE_URL}/booking/updateBooking/${user._id}/${tourId}`, bookingData);
        //     alert('Booking updated successfully!');
        // } catch (error) {
        //     console.error('Error updating booking:', error);
        //     alert('Failed to update booking.');
        // }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Update Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={bookingData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={bookingData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Guests:</label>
                    <input
                        type="number"
                        name="guests"
                        value={bookingData.guests}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
};

export default UpdateBooking;
