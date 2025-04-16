import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getAllTourForUser,
  getFeaturedTour,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  getToursBySeason,
  updateTour,
} from "../controllers/tourController.js";
import upload from "../middleware/multerConfig.js";

import { getUniqueCities, getUniqueAddresses } from "../controllers/tourController.js";
// import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

// create new tour
router.post("/", upload.single("photo"), createTour);

//update Tour
router.put("/:id", upload.single('photo'), updateTour);

//delete Tour
router.delete("/:id", deleteTour);

//getSingle Tour
router.get("/:id", getSingleTour);

//getAll Tour
router.get("/admin/tour", getAllTour);
router.get("/", getAllTourForUser);

router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourBySeason", getToursBySeason);
router.get("/search/getTourCount", getTourCount);


router.get("/unique-cities", getUniqueCities); // Endpoint for unique cities
router.get("/unique-addresses", getUniqueAddresses); // Endpoint for unique addresses
export default router;
