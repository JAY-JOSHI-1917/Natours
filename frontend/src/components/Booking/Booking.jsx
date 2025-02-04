import React from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const handleChange = (e) => {};

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          <i class="bx bx-rupee"></i> {price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} (
          {reviews?.length})
        </span>
      </div>

      {/* ============= Booking Form ============== */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Number of Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ============= Booking Form End ============== */}

      {/* ============= Booking Bottom ============ */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              <i class="bx bx-rupee"></i>
              {price}
              <i class="ri-close-line"> 1 person</i>
            </h5>
            <span>
              <i class="bx bx-rupee"></i> {price}
            </span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>
              <i class="bx bx-rupee"></i> 100
            </span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>
              <i class="bx bx-rupee"></i> 199
            </span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
