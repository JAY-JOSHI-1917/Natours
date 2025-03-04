import React, { useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews } = tour;
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    userId: "01",
    userEmail: "example@gmail.com",
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const totalAmount = Number(price) * Number(credentials.guestSize);

  const handleClick = (e) => {
    e.preventDefault();

    const name = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const bookAt = document.getElementById("bookAt").value;
    const guestSize = document.getElementById("guestSize").value;

    // Check if fields are empty
    if (!name || !phone || !bookAt || !guestSize) {
      alert("Please fill in all required fields.");
      return;
    }
    navigate("/thank-you");
  };

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
        <Form className="booking__info-form" onSubmit={handleClick}>
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
              <i class="ri-close-line"></i>1 Person
            </h5>
            <span>
              <i class="bx bx-rupee"></i> {price}
            </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>
              <i class="bx bx-rupee"></i> {totalAmount}
            </span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
