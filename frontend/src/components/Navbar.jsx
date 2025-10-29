

import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { logout } from "../features/auth/authSlice.js";

export default function Navbar() {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // ✅ Determine which dashboard link to show based on role
  const getDashboardLink = () => {
    switch (role) {
      case "admin":
        return { path: "/admin", label: "Admin Dashboard" };
      case "student":
        return { path: "/portal", label: "Student Dashboard" };
      case "teacher":
        return { path: "/teacher", label: "Teacher Dashboard" };
      default:
        return null;
    }
  };

  const dashboardLink = getDashboardLink();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          {/* Brand */}
          {/*<Link className="navbar-brand fw-bold" to="/home">*/}
          <Link className="navbar-brand fw-bold" to="/">
            Greater College
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {/* Show when NOT logged in */}
              {!token && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}

              {/* ✅ Show dashboard based on role */}
              {token && dashboardLink && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active fw-bold text-warning" : ""}`
                    }
                    to={dashboardLink.path}
                  >
                    {dashboardLink.label}
                  </NavLink>
                </li>
              )}

              {/* ✅ Logout button */}
              {token && (
                <li className="nav-item ms-lg-3">
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="fw-semibold"
                    onClick={() => setShowLogoutConfirm(true)}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* ===== LOGOUT CONFIRMATION MODAL ===== */}
      <Modal
        show={showLogoutConfirm}
        onHide={() => setShowLogoutConfirm(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
