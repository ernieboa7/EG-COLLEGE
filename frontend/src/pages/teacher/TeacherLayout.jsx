import { Outlet, NavLink } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

export default function TeacherLayout() {
  return (
    <Container className="py-3">
      <h2 className="text-primary fw-bold mb-4">Teachers</h2>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item><NavLink className="nav-link" to="departments">Departments</NavLink></Nav.Item>
        <Nav.Item><NavLink className="nav-link" to="courses">Courses</NavLink></Nav.Item>
        <Nav.Item><NavLink className="nav-link" to="timetables">Timetables</NavLink></Nav.Item>
        <Nav.Item><NavLink className="nav-link" to="results">Results</NavLink></Nav.Item>
        <Nav.Item><NavLink className="nav-link" to="library">Library</NavLink></Nav.Item>
        <Nav.Item><NavLink className="nav-link" to="projects">Projects</NavLink></Nav.Item>
        <Nav.Item><NavLink className="nav-link" to="committees">Committees</NavLink></Nav.Item>
      </Nav>

      <Outlet />
    </Container>
  );
}
