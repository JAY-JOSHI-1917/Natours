import express from "express"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingControllers.js";
const router = express.Router()

router.put('/', createBooking);
router.get('/:id', getBooking);
// router.get('/', verifyUser, getAllBooking);

export default router