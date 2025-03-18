import User from "../models/User.js";
import bcrypt from "bcryptjs"
import multer from 'multer';
import cloudinary from "../Cloudinary/cloudinary.js";


// create new User
export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedUser,
        });
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: "Failed to Create. Try Again" });
    }
};

//update User
export const updateUser = async (req, res) => {
    const id = req.params.id
    // try {
    //     const updatedUser = await User.findByIdAndUpdate(id, {
    //         $set: req.body
    //     }, { new: true })
    //     res.status(200).json({
    //         success: true,
    //         message: "Successfully updated",
    //         data: updatedUser,
    //     });
    // }

    try {
        const updateData = { ...req.body };

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to update ",
        });
    }
}
export const updateUserPassword = async (req, res) => {
    // const id = req.params.id
    // try {
    //     const updatedUser = await User.findByIdAndUpdate(id, {
    //         $set: req.body
    //     }, { new: true })
    //     res.status(200).json({
    //         success: true,
    //         message: "Successfully updated",
    //         data: updatedUser,
    //     });
    // }

    // try {
    //     const updateData = { ...req.body };
    //     console.log(updateData);
    //     if (updateData) {
    //         const salt = await bcrypt.genSalt(10);
    //         updateData = await bcrypt.hash(updateData, salt);
    //     }

    //     const updatedUser = await User.findByIdAndUpdate(
    //         id,
    //         { $set: updateData },
    //         { new: true }
    //     );

    //     res.status(200).json({
    //         success: true,
    //         message: "Successfully updated",
    //         data: updatedUser,
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: "failed to update ",
    //     });
    // }
    const id = req.params.id;

    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the user with the hashed password
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { password: hashedPassword } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Password successfully updated",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update password",
        });
    }
}


// uploadPhoto


export const uploadPhoto = async (req, res) => {
    const { image } = req.body;
    const userId = req.params.id;
    console.log(userId);// Assuming user ID is passed as a URL parameter

    if (!image) {
        return res.status(400).json({ error: "Image is required" });
    }

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
            upload_preset: "Natour_User_Profile",
            allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"]
        });

        console.log("Upload Successful:", result);

        // Update user in the database with the uploaded image URL
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { photo: result.secure_url } },  // Assuming you have a 'profileImage' field in your User model
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Image received successfully!",
            url: result.secure_url,
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Image upload failed" });
    }
};



//delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Successfully deleted ",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to delete ",
        });
    }
}
//getSingle User
export const getSingleUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await user.findById(id)
        res.status(200).json({
            success: true,
            message: "Successfully founded the user. ",
            data: user
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found ",
        });
    }
}
//getAll User
export const getAllUser = async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Successfully. ",
            data: users,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found ",
        });
    }
}