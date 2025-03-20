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
    // console.log(tourId);
    const { user } = useContext(AuthContext); // Get the tourId from URL
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        date: '',
        guests: 1,
    });
    const [updatedBookingData, setupdatedBookingData] = useState({
        name: '',
        email: '',
        date: '',
        guests: 1,
    });



    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const handleCheckboxClick = (checkboxId, paymentMode) => {
        console.log(`Clicked Checkbox ID: ${checkboxId}, Payment Mode: ${paymentMode}`);

        // Get all checkboxes in the page
        const checkboxes = document.querySelectorAll("input[type='checkbox']");

        // Uncheck all checkboxes
        checkboxes.forEach((checkbox) => (checkbox.checked = false));

        // Check the clicked checkbox
        const clickedCheckbox = document.getElementById(checkboxId);
        if (clickedCheckbox) {
            clickedCheckbox.checked = true;

            // Update the booking state with the selected payment mode
            setupdatedBookingData((prev) => ({ ...prev, paymentMode }));
            console.log(`Booking State Updated: `, { ...updatedBookingData, paymentMode });
        }
    };

    useEffect(() => {
        // Fetch the booking data when the component mounts
        const fetchBookingData = async () => {
            try {
                const userId = user._id;
                const res = await fetch(`${BASE_URL}/booking/getBooking/${userId}?bookedtourId=${tourId}`);  // Sending tourId as a query parameter

                if (!res.ok) {
                    setError('Failed to fetch the data.');
                    return;
                }

                const result = await res.json();
                const finalResult = result.data || {};

                setBookingData(finalResult[0]);

                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }

        };

        fetchBookingData();
    }, [tourId]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const NewUpdatedDataofBooking = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        };

        try {
            // const response = await fetch(`${BASE_URL}/booking/updateBooking/${user._id}/${tourId}`, NewUpdatedDataofBooking);
            console.log(updatedBookingData)
            // if (!response.ok) {
            //     throw new Error('Failed to update booking.');
            // }

            alert('Booking updated successfully!');
        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Failed to update booking.');
        }

    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='d-flex justify-content-around'>
            <div className="BookedTourInformation">
                <h5>
                    <b><u>Tour Title</u></b> : {bookingData.tourName}
                </h5>
                <h5>
                    <b><u>Full Name</u></b> : {bookingData.fullName}
                </h5>
                <h5>
                    <b><u>User Email</u></b> : {bookingData.userEmail}
                </h5>
                <h5>
                    <b><u>Total guest Size</u></b> : {bookingData.guestSize}
                </h5>
                <h5>
                    <b><u>Contact </u></b> : {bookingData.phone}
                </h5>
                <h5>
                    <b><u>Tour confirm date</u></b> : {bookingData.bookAt}
                </h5>
                <h5>
                    <b><u>Payment Mode~</u></b> : {bookingData.paymentMode}
                </h5>
            </div>
            <div>
                <h2>Update Booking</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedBookingData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={updatedBookingData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={updatedBookingData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Guests:</label>
                        <input
                            type="number"
                            name="guests"
                            value={updatedBookingData.guests}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>
                    <div className="payment__options">
                        <div>
                            <input type="checkbox" id="checkbox1" onClick={() => handleCheckboxClick("checkbox1", "Paytm")} />
                            <button className="payment-btn paytm-btn"></button>
                        </div>
                        <div>
                            <input type="checkbox" id="checkbox2" onClick={() => handleCheckboxClick("checkbox2", "UPI")} />
                            <button className="payment-btn upi-btn"></button>
                        </div>
                        <div>
                            <input type="checkbox" id="checkbox3" onClick={() => handleCheckboxClick("checkbox3", "PayPal")} />
                            <button className="payment-btn paypal-btn"></button>
                        </div>
                        <div>
                            <input type="checkbox" id="checkbox4" onClick={() => handleCheckboxClick("checkbox4", "PhonePe")} />
                            <button className="payment-btn phonepe-btn"></button>
                        </div>
                    </div>
                    <button type="submit">Update Booking</button>
                </form>

            </div>
        </div>
    );
};

export default UpdateBooking;
