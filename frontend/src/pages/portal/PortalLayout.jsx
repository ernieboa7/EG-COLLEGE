
/*
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice.js";
import { useState } from "react";
import { Navbar, Nav, Offcanvas, Container, Button, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useProfileQuery } from "../../services/api.js"; // ✅ ensure this endpoint exists

export default function PortalLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, token } = useSelector((state) => state.auth);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // ✅ Optionally load student data via API
  const { data: student, isLoading } = useProfileQuery(undefined, { skip: !token });

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutConfirm(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      {/* ===== TOP NAVBAR ===== *
      <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm px-3">
        <Container fluid>
          <Navbar.Brand className="fw-bold" onClick={() => navigate("/portal")}>
             Student Portal
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShowSidebar(true)}
          />
        </Container>
      </Navbar>

      {/* ===== OFFCANVAS SIDEBAR (Bootstrap) ===== *
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        responsive="lg"
        className="bg-light border-end"
        style={{ width: "260px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-semibold text-primary">
            {student ? student.firstName + " " + student.lastName : "Student Portal"}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            

            <NavLink
              to="/portal/results"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
              }
            >
              Results
            </NavLink>

            <NavLink
              to="/portal/timetable"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
              }
            >
              Timetable
            </NavLink>

            <NavLink
              to="/portal/courses"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
              }
            >
              Courses
            </NavLink>

            <NavLink
              to="/portal/fees"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
              }
            >
              Fees
            </NavLink>

            <NavLink
              to="/portal/library"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
              }
            >
              Library
            </NavLink>
            <NavLink className="nav-link" to="/portal/my-borrows">
               My Borrowed Books
            </NavLink>


            <NavLink
              to="/portal/projects"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/portal/committees"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
              }
            >
              Committees
            </NavLink>

            {role === "admin" && (
              <>
                <div className="border-top my-3"></div>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-danger" : ""}`
                  }
                >
                  Admin Dashboard
                </NavLink>
              </>
            )}

          
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* ===== MAIN CONTENT ===== *
      <main className="p-4" style={{ marginLeft: "0", marginTop: "1rem" }}>
        <Container fluid>
          {isLoading ? (
            <div className="text-center py-5 text-secondary">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Loading your data...</p>
            </div>
          ) : (
            <Outlet />
          )}
        </Container>
      </main>

      {/* ===== LOGOUT CONFIRMATION MODAL ===== *
      <Modal show={showLogoutConfirm} onHide={() => setShowLogoutConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutConfirm(false)}>
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


*/


/*

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//import { logout } from "../../features/auth/authSlice.js";
//import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";

import { useProfileQuery } from "../../services/api.js";

export default function PortalLayout() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, token } = useSelector((state) => state.auth);

  //const [ setShowLogoutConfirm] = useState(false);

  const { data: student, isLoading } = useProfileQuery(undefined, {
    skip: !token,
  });

  

  return (
    <>
      {/* ===== TOP NAVBAR ===== *
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="shadow-sm sticky-top"
      >
        <Container fluid>
          <Navbar.Brand
            className="fw-bold"
            onClick={() => navigate("/portal")}
            style={{ cursor: "pointer" }}
          >
            🎓 {student ? `${student.firstName} ${student.lastName}` : "Student Portal"}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="portalNavbar" />
          <Navbar.Collapse id="portalNavbar">
            {/* ===== HORIZONTAL NAV LINKS ===== *
            <Nav className="me-auto text-center">
              <NavLink
                to="/portal/results"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                Results
              </NavLink>

              <NavLink
                to="/portal/courses"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                Courses
              </NavLink>

              <NavLink
                to="/portal/timetable"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                Timetable
              </NavLink>

              <NavLink
                to="/portal/fees"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                Fees
              </NavLink>

              <NavLink
                to="/portal/library"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                Library
              </NavLink>

              <NavLink
                to="/portal/my-borrows"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                My Borrows
              </NavLink>

              <NavLink
                to="/portal/projects"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                Projects
              </NavLink>

              <NavLink
                to="/portal/committees"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? "fw-bold text-warning" : "text-white"}`
                }
              >
                Committees
              </NavLink>

              {role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `nav-link mx-2 ${isActive ? "fw-bold text-danger" : "text-white"}`
                  }
                >
                  Admin
                </NavLink>
              )}
            </Nav>

            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ===== MAIN CONTENT AREA ===== *
      <main className="p-4 bg-light min-vh-100">
        <Container fluid>
          {isLoading ? (
            <div className="text-center py-5 text-secondary">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading your profile...</p>
            </div>
          ) : (
            <Outlet />
          )}
        </Container>
      </main>

      
    </>
  );
}

*/

import { Container, Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { useProfileQuery } from "../../services/api.js";
import { useSelector } from "react-redux";

const LinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded ${
        isActive ? "bg-primary text-white fw-semibold" : "text-dark hover:bg-light"
      }`
    }
  >
    {children}
  </NavLink>
);

export default function PortalLayout() {
  const { token } = useSelector((state) => state.auth);
  const { data: student, isLoading } = useProfileQuery(undefined, { skip: !token });

  return (
    <Container className="py-3">
      <h2 className="text-primary fw-bold mb-4">
        {isLoading
          ? "Loading..."
          : student
          ? `${student.firstName} ${student.lastName}`
          : "Student Portal"}
      </h2>

      {/* ====== Navigation Tabs ====== */}
      <Nav variant="tabs" className="mb-3 flex-wrap">
        <LinkItem to="/portal/results">Results</LinkItem>
        <LinkItem to="/portal/courses">Courses</LinkItem>
        <LinkItem to="/portal/timetable">Timetable</LinkItem>
        <LinkItem to="/portal/fees">Fees</LinkItem>
        <LinkItem to="/portal/library">Library</LinkItem>
        <LinkItem to="/portal/my-borrows">My Borrows</LinkItem>
        <LinkItem to="/portal/projects">Projects</LinkItem>
        <LinkItem to="/portal/committees">Committees</LinkItem>
      </Nav>

      {/* ====== Content Area ====== */}
      <Outlet />
    </Container>
  );
}
