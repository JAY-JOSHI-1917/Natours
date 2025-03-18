import express from "express";
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
  updateUserPassword,
  uploadPhoto,
} from "../controllers/userController.js";
const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//update user
router.put("/:id", verifyUser, updateUser);
//update password of user
router.patch("/:id", verifyUser, updateUserPassword);

router.put('/upload-photo/:id', verifyUser, uploadPhoto);
//delete user
router.delete("/:id", verifyUser, deleteUser);

//getSingle user
router.get("/:id", verifyUser, getSingleUser);

//getAll user
router.get("/", verifyAdmin, getAllUser);

export default router;
