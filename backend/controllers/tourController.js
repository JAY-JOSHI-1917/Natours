import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../Cloudinary/cloudinary.js";
// create new tour

export const createTour = async (req, res) => {
  const photo = req.file;
  console.log(photo);
  try {
    if (!photo) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const fileUri = getDataUri(photo);
    const result = await cloudinary.uploader.upload(fileUri.content);
    const newTour = new Tour({
      ...req.body,
      photo: result.secure_url,
    });
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Tour successfully created",
      data: savedTour,
    });
  } catch (err) {
    console.error("Error creating tour:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again." });
  }
};

// export const createTour = async (req, res) => {
//   const imagefile = req.body;
//   console.log(imagefile); // Assuming the image file is sent in the request
//   if (!imagefile) {
//     return res.status(400).json({ error: "Image is required" });
//   }

//   const fileUri = getDataUri(imagefile);
//   try {
//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload(fileUri.content);

//     // Create a new tour with the uploaded image URL
//     const newTour = new Tour({
//       ...req.body,
//       image: result.secure_url, // Assuming you have an 'image' field in your Tour model
//     });

//     const savedTour = await newTour.save();

//     res.status(200).json({
//       success: true,
//       message: "Successfully created",
//       data: savedTour,
//     });
//   } catch (err) {
//     console.error("Error creating tour:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to Create. Try Again" });
//   }
// };

// export const createTour = async (req, res) => {
//   const newTour = new Tour(req.body);

//   try {
//     const savedTour = await newTour.save();

//     res.status(200).json({
//       success: true,
//       message: "Successfully created",
//       data: savedTour,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to Create. Try Again" });
//   }
// };

//update Tour
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to update ",
    });
  }
};

//delete Tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    // Check if tour has any bookings
    const existingBooking = await Booking.findOne({ tourId: id });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete tour as it has active bookings",
      });
    }

    // If no bookings exist, proceed with deletion
    await Tour.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};
//getSingle Tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfully founded the tour. ",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found ",
    });
  }
};


// Filter 

// Get unique cities
export const getUniqueCities = async (req, res) => {
  try {
    const cities = await Tour.distinct("city");
    res.status(200).json(cities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unique cities" });
  }
};

// Get unique addresses
export const getUniqueAddresses = async (req, res) => {
  try {
    const addresses = await Tour.distinct("address");
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch unique addresses" });
  }
};

//getAll Tour

export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({});
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully. ",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found ",
    });
  }
};

export const getAllTourForUser = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);
    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully. ",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found ",
    });
  }
};

// get tour by search
export const getTourBySearch = async (req, res) => {
  const query = req.query.query.toLowerCase();
  const tours = await Tour.find({
    $or: [
      { city: { $regex: query, $options: "i" } },
      { title: { $regex: query, $options: "i" } },
    ],
  });
  // const city = new RegExp(req.query.city, "i");
  //cause we are only finding the tour based on the Location name so we do not need this
  // const distance = parseInt(req.query.distance)
  // const maxGroupSize = parseInt(req.query.maxGroupSize)
  try {
    // const tours = await Tour.find({ city }).populate("reviews");
    //As of now we are finding the tour based on the location so we do not have to use
    // const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } })
    res.status(200).json({
      success: true,
      message: "Successfully.",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found ",
    });
  }
};
export const getFeaturedTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews")
      .limit(4);
    res.status(200).json({
      success: true,
      message: "Successfully. ",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Not Found ",
    });
  }
};

export const getToursBySeason = async (req, res) => {
  const { season } = req.query; // Get season from query params

  if (!season) {
    return res.status(400).json({
      success: false,
      message: "Season query parameter is required.",
    });
  }

  try {
    const tours = await Tour.find({ season })
      .populate("reviews") // Populate reviews if needed
      .limit(4); // Adjust limit as needed

    res.status(200).json({
      success: true,
      message: `Successfully fetched tours.`,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch tours.",
    });
  }
};

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: tourCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};

//Seasonal Tour
