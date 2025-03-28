import express from "express";
import {
  checkEmail,
  deletePhoto,
  deleteUser,
  getAllUser,
  getSingleUser,
  updatePassword,
  updateUser,
  updateUserPassword,
  uploadPhoto,
} from "../controllers/userController.js";
import upload from "../middleware/multerConfig.js";
const router = express.Router();

import { verifyUser } from "../utils/verifyToken.js";

//Route to check User's Email is registered or not

router.get("/checkEmail/:email", checkEmail);
// Route to update the user's password
router.put("/updatePassword/:email", updatePassword);
//update user
router.put("/:id", verifyUser, updateUser);
//update password of user
router.patch("/:id", verifyUser, updateUserPassword);

// router.put('/upload-to-cloudinary/:id', upload.single('image'), uploadPhoto);

router.put(
  "/upload-photo/:id",
  upload.single("image"),
  verifyUser,
  uploadPhoto
);

router.delete("/delete-photo/:userId", deletePhoto);

//delete user
router.delete("/:id", deleteUser);

//getSingle user
router.get("/:id", verifyUser, getSingleUser);
router.get("/", getAllUser);

export default router;
