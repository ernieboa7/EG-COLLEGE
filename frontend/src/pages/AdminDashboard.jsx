

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

export default function AdminDashboard() {
  const { token } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(/*"https://eg-college.onrender.com/api/admin/dashboard" || */"http://localhost:8080/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [token]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-primary mb-4">Statistics</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Applicants</Card.Title>
              <h3>{stats.applicantsCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Departments</Card.Title>
              <h3>{stats.departmentCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-success">Students</Card.Title>
              <h3>{stats.studentsCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-warning">Teachers</Card.Title>
              <h3>{stats.teachersCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-danger">Courses</Card.Title>
              <h3>{stats.coursesCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Timetables</Card.Title>
              <h3>{stats.timetablesCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Results</Card.Title>
              <h3>{stats.resultsCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Library</Card.Title>
              <h3>{stats.libraryCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Projects</Card.Title>
              <h3>{stats.projectsCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Committees</Card.Title>
              <h3>{stats.committeesCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-primary">Finance</Card.Title>
              <h3>{stats.financesCount || 0}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
