// src/pages/Login.jsx
import { useState } from "react";
import { useLoginMutation } from "../services/api.js";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice.js";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";


//import schoolImage from "../../public/schoolBackground.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
/*
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials(data));
      toast.success("Logged in successfully");
      nav(data.role === "admin" ? "/admin" : "/portal");
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };
*/
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      dispatch(setCredentials(data));
      toast.success("Logged in successfully");

      //  Redirect based on user role
      if (data.role === "admin") {
        nav("/admin");
      } else if (data.role === "teacher") {
        nav("/teacher");
      } else {
        nav("/portal"); // default for students
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };


  return (
    <div
      className="login-page position-relative d-flex align-items-center justify-content-center min-vh-100"
      
    >
      
      {/* Dark overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overlay"></div>

      <Container className="position-relative z-2">
        <Row className="justify-content-center">
          <Col xs={11} sm={8} md={6} lg={4}>
            <Card className="shadow-lg border-0 p-3">
              <Card.Body>
                <h2 className="text-center mb-4 text-primary fw-bold">Sign In</h2>

                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-3">
                  <small>
                    No account?{" "}
                    <Link to="/register" className="text-decoration-none fw-semibold">
                      Register here
                    </Link>
                  </small>
                </div>
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
