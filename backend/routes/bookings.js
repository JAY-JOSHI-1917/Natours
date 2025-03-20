import express from "express"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createBooking, getAllBooking, getBooking, getBookingByTourId, updateBookingByTourId } from "../controllers/bookingControllers.js";
const router = express.Router()

router.put('/', createBooking);
router.get('/:id', getBooking);

router.get('/getBooking/:id', getBookingByTourId);

// // Update specific booking for a user and tour
router.put('/updateBooking/:userId/:tourId', updateBookingByTourId);
// router.get('/', verifyUser, getAllBooking);

export default router