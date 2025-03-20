import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
// import tours from "../router/Routers";
// import UpdateBooking from "../components/Booking/updateBooking";

import "./tour-card.css";

const TourCard = ({ tour, isBookedTour }) => {
  const { _id, title, city, photo, price, address, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

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

                  <Link to={"/home"} className="booking__btn btn">Cancel Tour</Link>
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
