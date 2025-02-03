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
  try {
    
  } catch (error) {
    
  }
}
//delete Tour
export const deleteTour = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}
//getSingle Tour
export const getSingleTour = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}
//getAll Tour
export const getAllTour = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}