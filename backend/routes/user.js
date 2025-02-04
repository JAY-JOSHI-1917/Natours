import express from "express";
import { deleteUser, getAllUser, getSingleUser, updateUser } from "../controllers/userControllers.js";
const router = express.Router()

//update user
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

//getSingle user
router.get("/:id", getSingleUser);

//getAll user
router.get("/", getAllUser);

export default router;