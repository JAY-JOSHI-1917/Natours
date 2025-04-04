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
    const { bookingId } = req.params;

    // First, find the booking to check its status
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found." });
    }

    // Check if the booking status is "Completed"
    if (booking.status !== "Completed") {
      return res.status(403).json({
        success: false,
        message:
          "Only completed tours can be deleted. Current status: pending | On Going",
      });
    }

    // If status is "Completed", proceed with deletion
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

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

export const updateBookingStatus = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const currentDate = new Date();
    let updatedCount = 0;

    console.log("Starting status update...");
    console.log(`Found ${bookings.length} bookings`);

    for (const booking of bookings) {
      try {
        // Validate dates before creating Date objects
        if (!booking.tourStartingDate || !booking.tourEndingDate) {
          console.log(`Skipping booking ${booking._id} - Missing date values`);
          continue;
        }

        // Safely create Date objects
        const startDate = new Date(booking.tourStartingDate);
        const endDate = new Date(booking.tourEndingDate);
        const today = new Date(currentDate);

        // Validate that dates are valid
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.log(`Skipping booking ${booking._id} - Invalid date values`);
          continue;
        }

        // Remove time parts for date-only comparison
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(0, 0, 0, 0);
        today.setUTCHours(0, 0, 0, 0);

        console.log("\n------------------------");
        console.log(`Processing Booking: ${booking._id}`);
        console.log(`Tour Name: ${booking.tourName}`);
        console.log(`Start Date: ${startDate}`); // Using toString() instead of toISOString()
        console.log(`End Date: ${endDate}`);
        console.log(`Current Status: ${booking.status}`);

        let newStatus;
        // Determine new status
        if (today < startDate) {
          newStatus = "pending";
        } else if (today >= startDate && today <= endDate) {
          newStatus = "Ongoing";
        } else if (today > endDate) {
          newStatus = "Completed";
        }

        console.log(`Calculated New Status: ${newStatus}`);

        // Update if status has changed
        if (booking.status !== newStatus && newStatus) {
          const updatedBooking = await Booking.findByIdAndUpdate(
            booking._id,
            { status: newStatus },
            { new: true }
          );
          updatedCount++;
          console.log(`Successfully updated booking to ${newStatus}`);
          console.log("Updated Booking:", {
            id: updatedBooking._id,
            status: updatedBooking.status,
            startDate: updatedBooking.tourStartingDate,
            endDate: updatedBooking.tourEndingDate,
          });
        } else {
          console.log("No status update needed");
        }
      } catch (bookingError) {
        console.error(`Error processing booking ${booking._id}:`, bookingError);
        continue; // Skip to next booking if there's an error
      }
    }

    console.log(`\nUpdate complete. Updated ${updatedCount} bookings`);

    res.status(200).json({
      success: true,
      message: `Updated ${updatedCount} booking statuses`,
      currentTime: currentDate.toString(),
    });
  } catch (error) {
    console.error("Error in updateBookingStatus:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update booking statuses",
      error: error.message,
    });
  }
};

// // Run this function when the server starts
// updateBookingStatus();

// module.exports = updateBookingStatus;
