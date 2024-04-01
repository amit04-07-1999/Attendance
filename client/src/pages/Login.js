import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://attendance-9ifj.onrender.com/api/user/login",
        form
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Storing user info in localStorage
      alert("Login successful!");

      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } 
    //   else if (
    //     error.response &&
    //     error.response.data === "IP address does not match"
    //   ) {
    //     setError("IP address does not match");
    //   } 
      else {
        setError("An error occurred. Please try again later.");
        console.error(error);
      }
    }
  };

  return (
    <div className="container-1">
      <div className="logoImage-1" style={{ marginTop: "70px" }}>
        <img src="attendanceImage/logo.png" className="logo-1" alt="Logo" />
      </div>
      <div className="logoImage-1 my-2">
        <img
          src="attendanceImage/Group 10.png"
          className="logo1-1"
          alt="Logo 1"
        />
      </div>
      <div className="logoImage-1">
        <img
          className="RectangleImg-1"
          src="/attendanceImage/Rectangle1.svg"
          alt="Rectangle"
        />
      </div>
      <h6 className="welcome-1 text-white mt-4">Welcome !</h6>
      <p className="ldesc-1 my-3">Login with your Account</p>

      <form className="form-login-1" onSubmit={handleSubmit}>
        <div className="logoImage-1">
          <div className="fake-input-1 my-3">
            <img
              className="rounded-circle"
              src="attendanceImage/email.svg"
              width="22"
              alt="Email icon"
            />
            <input
              type="email"
              className="form-control-1 px-5"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="fake-input-1">
            <img
              className="rounded-circle"
              src="attendanceImage/password.svg"
              width="22"
              alt="Password icon"
            />
            <input
              type="password"
              className="form-control-1 px-5"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="logoImage-1 my-3">
            <button className="buttonLogin-1" type="submit">
              Login
            </button>
          </div>
          {error && <p className="error-1">{error}</p>}
        </div>
      </form>

      <div className="logoImage-1 mt-2">
        <Link
          to="/signup"
          className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100"
        >
          Register
        </Link>
      </div>
      <div className="logoImage-1">
        <p className="footer-1 mt-4">Techninza ©</p>
      </div>
    </div>
  );
};

export default Login;
