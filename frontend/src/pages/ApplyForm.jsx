import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useCreateApplicantMutation } from "../services/api"; // ✅ Shared API

export default function ApplyForm() {
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [message, setMessage] = useState("");
  const [createApplicant, { isLoading }] = useCreateApplicantMutation();

// Automatically clear message after 4 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await createApplicant(form).unwrap();
      setMessage(res.message || "✅ Application submitted successfully!");
      setForm({ name: "", email: "", course: "" });
    } catch (err) {
      console.error(err);
      setMessage(err?.data?.message || "❌ Failed to submit application.");
    }
  };

  return (
    <Container className="py-5">
      <h2 className="text-primary mb-4 text-center">Apply for Admission</h2>
      {message && (
        <Alert
          variant={message.startsWith("✅") ? "success" : "info"}
          className="text-center"
        >
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "500px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Course</Form.Label>
          <Form.Select
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            required
          >
            <option value="">Select course</option>
            <option>Computer Science</option>
            <option>Business Administration</option>
            <option>Health & Social Care</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
