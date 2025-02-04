import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from "../controllers/tourControllers.js";

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
router.get("/", getAllTour);

router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);
export default router;
