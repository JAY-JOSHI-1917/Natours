import Booking from "../models/Booking.js"
import User from "../models/User.js"


// create a Booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await newBooking.save()
        res.status(200).json({
            success: true,
            message: "Your Tour is Booked",
            data: savedBooking
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

// Getting single booking 

export const getBooking = async (req, res) => {
    const id = req.params.id

    try {
        const bookings = await Booking.find({ userId: id });
        res.status(200).json({
            success: true,
            message: "successful",
            data: bookings,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        })
    }
}

// export const getBookingByTourId = async (req, res) => {
//     const { userId, tourId } = req.params;

//     try {
//         const booking = await Booking.findOne({ userId, tourId });

//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found.' });
//         }

//         res.status(200).json({ data: booking });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error.', error: error.message });
//     }
// };

// // Update Booking By Tour ID and User ID
// export const updateBookingByTourId = async (req, res) => {
//     const { userId, tourId } = req.params;
//     const { name, email, date, guests } = req.body;

//     try {
//         const booking = await Booking.findOneAndUpdate(
//             { userId, tourId },
//             { name, email, date, guests },
//             { new: true }
//         );

//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found.' });
//         }

//         res.status(200).json({ message: 'Booking updated successfully.', data: booking });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error.', error: error.message });
//     }
// }


// Getting all booking 

export const getAllBooking = async (req, res) => {
    try {
        const books = await Booking.find()
        res.status(200).json({
            success: true,
            message: "successful",
            data: books,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}