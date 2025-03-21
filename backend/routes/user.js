import express from "express";
import {
  checkEmail,
  deletePhoto,
  deleteUser, getSingleUser, updatePassword, updateUser, updateUserPassword, uploadPhoto,
} from "../controllers/userController.js";
import upload from "../middleware/multerConfig.js";
const router = express.Router();

import { verifyUser } from "../utils/verifyToken.js";

router.get('/check-email:email', checkEmail);
//update user
router.put("/:id", verifyUser, updateUser);
//update password of user
router.patch("/:id", verifyUser, updateUserPassword);

// router.put('/upload-to-cloudinary/:id', upload.single('image'), uploadPhoto);

router.put('/upload-photo/:id', upload.single('image'), verifyUser, uploadPhoto);

router.delete('/delete-photo/:userId', deletePhoto);

//delete user
router.delete("/:id", verifyUser, deleteUser);

//getSingle user
router.get("/:id", verifyUser, getSingleUser);


// Route to update the user's password
router.post('/update-password', updatePassword);


export default router;
