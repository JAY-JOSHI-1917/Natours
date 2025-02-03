import express from "express";
import { createTour, deleteTour, getAllTour, getSingleTour, updateTour } from "../../controllers/tourControllers.js";

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
export default router;
