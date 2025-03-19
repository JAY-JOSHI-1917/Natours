import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateBooking = ({ bookingId }) => {
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        date: '',
        guests: 1,
    });

    useEffect(() => {
        // Fetch the booking data when the component mounts
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`/api/bookings/${bookingId}`);
                setBookingData(response.data);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        fetchBookingData();
    }, [bookingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/bookings/${bookingId}`, bookingData);
            alert('Booking updated successfully!');
        } catch (error) {
            console.error('Error updating booking:', error);
            alert('Failed to update booking.');
        }
    };

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