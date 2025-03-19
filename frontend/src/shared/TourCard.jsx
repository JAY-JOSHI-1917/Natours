import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import tours from "../router/Routers";

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
          <div className="card__top d-flex align-items-center justify-content-between">
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

          <div className="card__bottom d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i> {city}, {address}
            </span>

            {isBookedTour ? (
                <>
                    <Link to={"/home"} className="btn booking__btn update__btn">Update Tour Details</Link>
                    <Link to={"/home"} className="btn booking__btn">Cancel Tour</Link>
                </>
            ) : (
                <Link to={`/tours/${tour._id}`} className="btn booking__btn">Book Now</Link>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
