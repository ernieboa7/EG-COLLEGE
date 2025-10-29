// src/pages/Register.jsx
import { useState } from "react";
import { useRegisterMutation } from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
//import schoolImage from "../../public/schoolBackground.jpg"; // same background as Landing and Login

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
    studentId: "",
  });

  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form).unwrap();
      toast.success("Registered — please sign in");
      nav("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="register-page position-relative d-flex align-items-center justify-content-center min-vh-100"
      style={{
        //backgroundImage: `url(${schoolImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better contrast */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(3px)",
        }}
      />

      <Container className="position-relative z-2">
        <Row className="justify-content-center">
          <Col xs={11} sm={8} md={6} lg={4}>
            <Card className="shadow-lg border-0 p-3 bg-white bg-opacity-90 rounded-4">
              <Card.Body>
                <h2 className="text-center mb-4 text-primary fw-bold">Create Account</h2>

                <Form onSubmit={submit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your student email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formStudentId">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., STU001"
                      value={form.studentId}
                      onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Creating...
                        </>
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-3">
                  <small>
                    Have an account?{" "}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Login here
                    </Link>
                  </small>
                </div>

                <p className="text-muted text-center mt-3" style={{ fontSize: "0.8rem" }}>
                  The system will validate your student record before activation.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer text */}
      <div
        className="position-absolute bottom-2 start-50 translate-middle-x text-white text-center"
        style={{ fontSize: "0.9rem" }}
      >
        © {new Date().getFullYear()} Ernest Greater Academy
      </div>
    </div>
  );
}
