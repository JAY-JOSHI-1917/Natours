import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },

    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
