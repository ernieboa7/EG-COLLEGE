// src/pages/Landing.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import schoolImage from "../../public/schoolBackground.jpg";
import "../index.css";

export default function Landing() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <div
        className="landing-page"
        style={{ backgroundImage: `url(${schoolImage})` }}
      >
        <div className="landing-overlay"></div>

        <div className="landing-content container">
          <h1 className="landing-title">Greater College Abuja</h1>
          <p className="landing-subtitle">
            Student Portal and Admin Dashboard
          </p>

          <div className="landing-buttons d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
            <Link to="/register" className="btn btn-light btn-lg text-primary">
              Register
            </Link>
          </div>

          <footer className="landing-footer">
            © {new Date().getFullYear()} Greater College
          </footer>
        </div>
      </div>
    </>
  );
}


