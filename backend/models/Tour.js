import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    // distance: {
    //   type: Number,
    //   required: true,
    // },
    photo: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalGuestSize: {
      type: Number,
      required: true,
      default: 30,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    season: {
      type: String,
      // required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],

    featured: {
      type: Boolean,
      default: false,
    },
    visibility: {
      type: String,
      enum: ["enable", "disable"],
      default: "enable",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
