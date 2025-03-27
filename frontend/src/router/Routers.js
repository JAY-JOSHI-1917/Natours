import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./../pages/Home";
import About from "../pages/About";
import Tours from "./../pages/Tours";
import Seasons from "../pages/Seasonal_tour";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import EditProfile from "../pages/EditProfile";
import DisplayProfile from "../pages/DispProfile";
import UpdateBooking from "../components/Booking/updateBooking";
import ForgetPass from "../pages/forgetPass";
import AdminPanel from "../pages/AdminPanel";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home " />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/gallery" element={<MasonryImagesGallery />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/seasons" element={<Seasons />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/displayProfile" element={<DisplayProfile />} />
      <Route path="/updateBooking" element={<UpdateBooking />} />
      <Route path="/forgetPass" element={<ForgetPass />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};

export default Routers;
