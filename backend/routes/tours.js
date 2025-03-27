import express from "express";
import { createTour, deleteTour, getAllTour, getAllTourForUser, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, getToursBySeason, updateTour } from "../controllers/tourController.js";
// import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

// create new tour
router.post("/", createTour);

//update Tour
router.put("/:id", updateTour);

//delete Tour
router.delete("/:id", deleteTour);

//getSingle Tour
router.get("/:id", getSingleTour);

//getAll Tour
router.get("/admin/bookedtour", getAllTour);
router.get("/", getAllTourForUser);

router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTours", getFeaturedTour);
router.get("/search/getTourBySeason", getToursBySeason);
router.get("/search/getTourCount", getTourCount);
export default router;
