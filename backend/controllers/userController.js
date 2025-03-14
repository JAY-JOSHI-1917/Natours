import User from "../models/User.js";
import bcrypt from "bcryptjs"
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