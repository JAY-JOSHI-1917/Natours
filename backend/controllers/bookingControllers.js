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