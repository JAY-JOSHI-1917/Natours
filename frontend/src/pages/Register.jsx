// import React, { useState, useContext } from "react";
// import { Container, Row, Col, FormGroup, Button } from "reactstrap";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/login.css";

// import registerImg from "../assets/images/register.png";
// import userIcon from "../assets/images/user.png";

// import { AuthContext } from "./../context/AuthContext"
// import { BASE_URL } from "./../utils/config"

// const Register = () => {
//   const [credentials, setCredentials] = useState({
//     username: undefined,
//     email: undefined,
//     password: undefined,
//   });

//   const { dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();

//     try {

//       const res = await fetch(`${BASE_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         alert(result.message);
//         return;
//       }

//       dispatch({ type: "REGISTER_SUCCESS" });
//       navigate("/login");
//     } catch (err) {
//       alert(err.message);
//     }
//   };


//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="8" className="m-auto">
//             <div className="login__container d-flex justify-content-between">
//               <div className="login__img">
//                 <img src={registerImg} alt="" />
//               </div>

//               <div className="login__form">
//                 <div className="user">
//                   <img src={userIcon} alt="" />
//                 </div>
//                 <h2>Register</h2>
//                 <form onSubmit={handleClick}>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Username"
//                       required
//                       id="username"
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       required
//                       id="email"
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       required
//                       id="password"
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                   <Button
//                     className="btn secondary__btn auth__btn"
//                     type="submit"
//                   >
//                     Create Account
//                   </Button>
//                 </form>
//                 <p>
//                   Already have an account? <Link to="/login">Login</Link>
//                 </p>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Register;

import React, { useState, useContext } from "react";
import { Container, Row, Col, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ username: "", email: "", password: "" });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
  };


  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const validateUsername = (username) => {
    return username.length >= 5; // Minimum 3 characters
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    // Clear errors when user types
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { username: "", email: "", password: "" };

    if (!validateUsername(credentials.username)) {
      newErrors.username = "Username must be at least 5 characters";
      valid = false;
    }

    if (!validateEmail(credentials.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!validatePassword(credentials.password)) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return; // Stop registration if validation fails
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
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
                      value={credentials.username}
                      className={errors.username ? "input-error" : ""}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                      value={credentials.email}
                      className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                      value={credentials.password}
                      className={errors.password ? "input-error" : ""}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                  </FormGroup>

                  <Button className="btn secondary__btn auth__btn" type="submit">
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
