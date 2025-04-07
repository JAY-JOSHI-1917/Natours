import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import { formatDate } from "../../utils/dateUtils";
import './updateBooking.css';

const UpdateBooking = () => {
    const location = useLocation();
    const tourId = location.state?.tourId;
    const { user } = useContext(AuthContext);
    const [bookingData, setBookingData] = useState({
        tourName: '',
        fullName: '',
        userEmail: '',
        phone: 1,
        date: '',
        guests: 1,

    });
    const [updatedBookingData, setupdatedBookingData] = useState({
        // fullName: '',
        // userEmail: '',
        // phone: 1,
        // date: '',
        // guests: 1,
        name: '',
        email: '',
        date: '',
        guests: 1,
        paymentMode: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [minDate, setMinDate] = useState("");

    useEffect(() => {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        const minDateStr = today.toISOString().split("T")[0];
        setMinDate(minDateStr);
    }, []);

    const handleCheckboxClick = (checkboxId, paymentMode) => {
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => (checkbox.checked = false));

        const clickedCheckbox = document.getElementById(checkboxId);
        if (clickedCheckbox) {
            clickedCheckbox.checked = true;
            setupdatedBookingData((prev) => ({ ...prev, paymentMode }));
        }
    };

    const fetchBookingData = async () => {
        try {
            const userId = user.data._id;
            const res = await fetch(`${BASE_URL}/booking/getBooking/${userId}?bookedtourId=${tourId}`);

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

    useEffect(() => {
        fetchBookingData();
    }, [tourId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setupdatedBookingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/booking/updateBooking/${user.data._id}/${tourId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBookingData)
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to update booking.');
            }

            alert('Booking updated successfully!');

            // 🔄 Refresh the BookedTourInformation
            fetchBookingData();

        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Failed to update booking.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='updateBooking-Container'>
            <button className='back-btn' onClick={() => window.history.back()}><i class="ri-arrow-left-s-fill"></i>
                <b>Back</b>
            </button>
            <div className="BookedTourInformation">
                <div className="update-title-box">
                    <h2>Booked Tour Information</h2>
                </div>
                <div className="disp-details">
                    <h5><b>Tour Title</b> <span>{bookingData.tourName}</span></h5>
                    <h5><b>Full Name</b> <span>{bookingData.fullName}</span></h5>
                    <h5><b>User Email</b> <span>{bookingData.userEmail}</span></h5>
                    <h5><b>Total guest Size</b> <span>{bookingData.guestSize}</span></h5>
                    <h5><b>Contact</b> <span>{bookingData.phone}</span></h5>
                    <h5><b>Tour confirm date</b> <span>{formatDate(bookingData.tourStartingDate)}</span></h5>
                    <h5><b>Payment Mode~</b> <span>{bookingData.paymentMode}</span></h5>
                </div>
            </div>
            <div className="updateBooking">
                <div className="update-title-box">
                    <h2>Update Booking</h2>
                </div>
                <div className="update-details">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" value={updatedBookingData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={updatedBookingData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input type="date" name="date" value={formatDate(updatedBookingData.date)} onChange={handleChange} required min={minDate} />
                        </div>
                        <div>
                            <label>Guests:</label>
                            <input type="number" name="guests" value={updatedBookingData.guests} onChange={handleChange} min="1" required />
                        </div>

                        <div className="payment">
                            <label className='payment-title'>Payment Options:</label>
                            <div className="payment__options">
                                <div><input type="checkbox" id="checkbox1" onClick={() => handleCheckboxClick("checkbox1", "Paytm")} /> <button className="payment-btn paytm-btn"></button></div>
                                <div><input type="checkbox" id="checkbox2" onClick={() => handleCheckboxClick("checkbox2", "UPI")} /> <button className="payment-btn upi-btn"></button></div>
                                <div><input type="checkbox" id="checkbox3" onClick={() => handleCheckboxClick("checkbox3", "PayPal")} /> <button className="payment-btn paypal-btn"></button></div>
                                <div><input type="checkbox" id="checkbox4" onClick={() => handleCheckboxClick("checkbox4", "PhonePe")} /> <button className="payment-btn phonepe-btn"></button></div>
                            </div>
                            <button type="submit">Update Booking</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default UpdateBooking;