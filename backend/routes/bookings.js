import express from "express"
// import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { cancelBooking, createBooking, deleteBooking, getAllBooking, getBooking, getBookingByTourId, updateBookingByTourId } from "../controllers/bookingControllers.js";
const router = express.Router()

router.put('/', createBooking);
router.get('/:id', getBooking);

router.get('/getBooking/:id', getBookingByTourId);

// // Update specific booking for a user and tour
router.put('/updateBooking/:userId/:tourId', updateBookingByTourId);
router.delete('/cancel/:userId/:tourId', cancelBooking);
router.delete("/deleteBookedtour/:bookingId", deleteBooking);
router.get('/', getAllBooking);

export default router