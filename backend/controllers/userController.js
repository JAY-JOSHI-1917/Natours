import User from "../models/User.js";
import bcrypt from "bcryptjs"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../Cloudinary/cloudinary.js";
// const cloudinary = require("./cloudinary/cloudinary");


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
    const id = req.params.id;
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
}

////////////////////////    User Photo Logics starts   ////////////////////////////


//cloudinarry upload

// export const uploadToCloudinary = async (image) => {
//     try {
//         const result = await cloudinary.uploader.upload(image, {
//             upload_preset: 'NatoursUserProfile',
//             allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp']
//         });
//         console.log('Upload Successful:', result);
//         return result.secure_url;
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error);
//         throw new Error('Image upload to Cloudinary failed');
//     }
// };

// uploadPhoto


// export const uploadPhoto = async (req, res) => {
//     const { image } = req.body;
//     console.log(req.body);
//     const userId = req.params.id;

//     if (!image) {
//         return res.status(400).json({ error: 'Image is required' });
//     }

//     try {
//         // Update user profile image in the database
//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { $set: { photo: image } },
//             { new: true }
//         );

//         res.status(200).json({
//             success: true,
//             message: 'Image received successfully!',
//             url: image,
//             data: updatedUser
//         });
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         res.status(500).json({ error: 'Profile update failed' });
//     }
// };




export const uploadPhoto = async (req, res) => {
    const imagefile = req.file;// Assuming user ID is passed as a URL parameter
    // console.log(req.params.id);
    if (!imagefile) {
        return res.status(400).json({ error: "Image is required" });
    }

    const fileUri = getDataUri(imagefile);
    try {
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(fileUri.content);


        // console.log("Upload Successful:", result);
        const userId = req.params.id;
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


export const deletePhoto = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user has a photo to delete
        if (!user.photo) {
            return res.status(400).json({ message: 'No photo found to delete.' });
        }

        // Extract public_id from the photo URL
        const photoUrl = user.photo;
        const publicId = photoUrl.split('/').pop().split('.')[0];

        // Delete photo from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Remove photo URL from user dataset
        user.photo = '';
        await user.save();

        res.status(200).json({ message: 'Photo deleted successfully!' });

    } catch (error) {
        console.error("Error deleting photo:", error);
        res.status(500).json({ message: 'Failed to delete photo.' });
    }
};

////////////////////////    User Photo Logics ends   ////////////////////////////

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

//////forgot password logic

export const checkEmail = async (req, res) => {
    try {
        const { email } = req.params; // Extract email from query parameters
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await User.findOne({ email: email });

        if (user) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

// Update user's password
export const updatePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};



//getSingle User
export const getSingleUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await user.findById(id);
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