import React, { useContext } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
// import tours from "../router/Routers";
// import UpdateBooking from "../components/Booking/updateBooking";

import "./tour-card.css";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourCard = ({ tour, isBookedTour }) => {
  const { user } = useContext(AuthContext);
  // const user_Id = user._id;
  const { _id, title, city, photo, address, featured, reviews } = tour;

  const tourId = _id;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const handleCancelTour = async (tourId) => {
    try {
      const bookedTourId = tourId.tourId;
      const response = await fetch(`${BASE_URL}/booking/cancel/${user.data._id}/${bookedTourId}`, {
        method: "DELETE",
        credentials: "include"
      });

      const result = await response.json();
      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert('Tour cancelled successfully!');
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling tour:", error);
      alert('Failed to cancel tour.');
    }
  };


  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={photo} alt="tour-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="tour__title">
                <Link to={`/tours/${_id}`}>{title}</Link>
              </h5>

              <span className="tour__rating d-flex align-items-center gap-1">
                <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}{" "}
                {totalRating === 0 ? (
                  "Not rated"
                ) : (
                  <span>({reviews.length})</span>
                )}
              </span>
            </div>
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i> {city}, {address}
            </span>
          </div>

          <div className="card__bottom">

            {isBookedTour ? (
              <>
                <div className="card__bottom-btn">
                  {/* <Link to={`/updateBooking/${_id}`} className="booking__btn update__btn btn">Update Tour Details</Link> */}
                  <Link to="/updateBooking" state={{ tourId: _id }} className="booking__btn update__btn btn">Update Tour Details</Link>

                  <button
                    className="booking__btn btn"
                    onClick={() => handleCancelTour({ tourId: _id })}
                  >
                    Cancel Tour
                  </button>

                </div>
              </>
            ) : (
              <Link to={`/tours/${tour._id}`} className="booking__btn book-now-btn btn ">Book Now</Link>
            )}
          </div>
        </CardBody>
      </Card>
    </div >
  );
};

export default TourCard;
