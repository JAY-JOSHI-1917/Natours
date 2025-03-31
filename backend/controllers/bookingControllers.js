import Booking from "../models/Booking.js";
import User from "../models/User.js";

// create a Booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    // Create starting date object
    const startDate = new Date(newBooking.tourStartingDate);
    // Calculate ending date
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 3);

    // Set the ending date
    newBooking.tourEndingDate = endDate;

    console.log(newBooking);
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your Tour is Booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// Getting single booking

export const getBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const bookings = await Booking.find({ userId: id });
    res.status(200).json({
      success: true,
      message: "successful",
      data: bookings,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

export const getBookingByTourId = async (req, res) => {
  try {
    const userId = req.params.id;
    const { bookedtourId } = req.query;
    // console.log(bookedtourId);
    if (!bookedtourId) {
      return res.status(400).json({ error: "tourId is required" });
    }

    // Fetch booking by userId and tourId

    const booking = await Booking.find({
      userId: userId,
      tourId: bookedtourId,
    });
    // console.log(booking)
    if (booking) {
      res.status(200).json({ data: booking });
    } else {
      res.status(404).json({ error: "Booking not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update Booking By Tour ID and User ID
export const updateBookingByTourId = async (req, res) => {
  const { userId, tourId } = req.params;
  const { name, email, date, guests, paymentMode } = req.body;

  try {
    const booking = await Booking.findOneAndUpdate(
      { userId, tourId },
      {
        fullName: name,
        userEmail: email,
        bookAt: date,
        guestSize: guests,
        paymentMode: paymentMode,
      },
      { new: true }
    );
    console.log(booking);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res
      .status(200)
      .json({ message: "Booking updated successfully.", data: booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error.", error: error.message });
  }
};

//Deleting the BookedTour

export const cancelBooking = async (req, res) => {
  try {
    const { userId, tourId } = req.params;

    // Find and delete the booking
    const deletedBooking = await Booking.findOneAndDelete({ userId, tourId });

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.status(200).json({ message: "Tour cancelled successfully!" });
  } catch (error) {
    console.error("Error cancelling tour:", error);
    res.status(500).json({ message: "Failed to cancel tour." });
  }
};

// Getting all booking

export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find();
    res.status(200).json({
      success: true,
      message: "successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params; // Renamed to bookingId (since it's an _id)

    // Find and delete the booking by its _id
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully!" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete booking." });
  }
};

export const updateBookingStatus = async () => {
    try {
        const bookings = await Booking.find({});
        const currentDate = new Date();

        for (let booking of bookings) {
            const startDate = new Date(booking.tourStartingDate);
            const endDate = new Date(booking.tourEndingDate);
            const daysSinceEnd = (currentDate - endDate) / (1000 * 60 * 60 * 24); // Days since end date
            const daysUntilStart = (startDate - currentDate) / (1000 * 60 * 60 * 24); // Days until start

            let newStatus;
            if (daysUntilStart > 0) {
                newStatus = "Pending"; // Tour hasn't started yet
            } else if (currentDate >= startDate && currentDate <= endDate) {
                newStatus = "Ongoing"; // Tour is currently happening
            } else if (daysSinceEnd > 3) {
                newStatus = "Completed"; // Tour ended more than 3 days ago
            } else {
                newStatus = booking.status; // Keep current status
            }

            if (booking.status !== newStatus) {
                booking.status = newStatus;
                await booking.save();
            }
        }

        console.log("Booking statuses updated.");
    } catch (error) {
        console.error("Error updating booking statuses:", error);
    }
};

// // Run this function when the server starts
// updateBookingStatus();

// module.exports = updateBookingStatus;
