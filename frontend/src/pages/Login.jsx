// import React, { useState, useContext } from "react";
// import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/login.css";

// import loginImg from "../assets/images/login.png";
// import userIcon from "../assets/images/user.png";

// import { AuthContext } from "./../context/AuthContext"
// import { BASE_URL } from "./../utils/config"

// const Login = () => {
//   const [credentials, setCredentials] = useState({
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

//     dispatch({ type: "LOGIN_START" })

//     try {

//       const res = await fetch(`${BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(credentials),
//       });
//       const result = await res.json();
//       if (!res.ok) { alert(result.message) }
//       console.log(result);
//       dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
//       navigate("/");

//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.message });

//     }
//   };

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="8" className="m-auto">
//             <div className="login__container d-flex justify-content-between">
//               <div className="login__img">
//                 <img src={loginImg} alt="" />
//               </div>

//               <div className="login__form">
//                 <div className="user">
//                   <img src={userIcon} alt="" />
//                 </div>
//                 <h2>Login</h2>
//                 <form onSubmit={handleClick}>
//                   <FormGroup>
//                     <input
//                       type="text"
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
//                     Login
//                   </Button>
//                 </form>
//                 <p>
//                   Don't have an account? <Link to="/register">Create</Link>
//                 </p>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { Container, Row, Col, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Simple email format check
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
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
    let newErrors = { email: "", password: "" };

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
      return; // Stop login if validation fails
    }

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
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
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </FormGroup>

                  <Link to="/forgetPass">Forget Password ?</Link>

                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Login
                  </Button>
                </form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
