import React, { useContext, useState, useEffect } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { _id, price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourId: _id,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    paymentMode: "",
  });

  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const minDateStr = today.toISOString().split("T")[0];
    setMinDate(minDateStr);
  }, []);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckboxClick = (checkboxId, paymentMode) => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.id !== checkboxId) {
        checkbox.checked = false;
      }
    });
    setBooking((prev) => ({ ...prev, paymentMode }));
  };

  const totalAmount = Number(price) * Number(booking.guestSize);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Booking Data before submission:", booking);

    if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
      return alert("Please fill in all required fields before proceeding.");
    }

    if (!booking.paymentMode) {
      return alert("Please select a payment mode.");
    }

    if (!user || user === undefined || user === null) {
      return alert("Please sign in ");
    }

    try {
      const user_id = user._id;

      console.log(user)
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message);

      alert("Your Tour successfully booked. 😊");
      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>₹{price} <span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} min={minDate} />
            <input type="number" placeholder="Number of Guest" id="guestSize" required onChange={handleChange} />
          </FormGroup>
        </Form>

        <h5 className="payment-title">Payment Options</h5>
        <div className="payment__options">
          <div>
            <input type="checkbox" id="checkbox1" onClick={() => handleCheckboxClick("checkbox1", "Paytm")} />
            <button className="payment-btn paytm-btn"></button>
          </div>
          <div>
            <input type="checkbox" id="checkbox2" onClick={() => handleCheckboxClick("checkbox2", "UPI")} />
            <button className="payment-btn upi-btn"></button>
          </div>
          <div>
            <input type="checkbox" id="checkbox3" onClick={() => handleCheckboxClick("checkbox3", "PayPal")} />
            <button className="payment-btn paypal-btn"></button>
          </div>
          <div>
            <input type="checkbox" id="checkbox4" onClick={() => handleCheckboxClick("checkbox4", "PhonePe")} />
            <button className="payment-btn phonepe-btn"></button>
          </div>
        </div>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> {booking.guestSize} Person(s)
            </h5>
            <span>₹{price}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{totalAmount}</span>
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