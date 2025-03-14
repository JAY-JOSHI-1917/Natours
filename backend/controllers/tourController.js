import Tour from "../models/Tour.js";

// create new tour
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Create. Try Again" });
  }
};

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
    await Tour.findByIdAndDelete(id);
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
//getAll Tour
export const getAllTour = async (req, res) => {
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
  const city = new RegExp(req.query.city, "i");
  //cause we are only finding the tour based on the Location name so we do not need this
  // const distance = parseInt(req.query.distance)
  // const maxGroupSize = parseInt(req.query.maxGroupSize)
  try {
    const tours = await Tour.find({ city }).populate("reviews");
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
//getAll Tour

// export const getTourBySearch = async (req, res) => {
//   try {
//     const { city, title, state } = req.query;

//     // Prioritize only one search field
//     let filter = {};
//     if (city) filter.city = new RegExp(city, "i");
//     else if (title) filter.title = new RegExp(title, "i");
//     else if (state) filter.state = new RegExp(state, "i");
//     else {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide city, title, or state for searching.",
//       });
//     }

//     const tours = await Tour.find(filter).populate("reviews");

//     if (!tours.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No matching tours found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Search successful.",
//       data: tours,
//     });
//   } catch (error) {
//     console.error("🔴 Search Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Please try again.",
//     });
//   }
// };


export const getFeaturedTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({ featured: true })
      .populate("reviews").limit(4);
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
