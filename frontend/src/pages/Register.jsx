import React, { useState, useContext } from "react";
import { Container, Row, Col, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext"
import { BASE_URL } from "./../utils/config"

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log("🟡 Sending Data:", credentials); // Debugging

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed content-type
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log("🟢 Server Response:", result); // Debugging

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      console.error("🔴 Fetch Error:", err);
      alert(err.message);
    }
  };


  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
                <form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Username"
                      required
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Create Account
                  </Button>
                </form>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
