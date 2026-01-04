/*import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="py-5">
      {/* Header *
      <header className="text-center mb-5">
        <h1 className="fw-bold text-primary">Welcome to Greater College</h1>
        <p className="text-muted fs-5">
          Empowering students with quality education for a brighter future.
        </p>
      </header>

      {/* === Courses Section === *
      <section className="mb-5">
        <h3 className="text-secondary mb-4 text-center">Our Courses</h3>
        <Row>
          <Col md={4} sm={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Computer Science</Card.Title>
                <Card.Text>
                  Learn programming, databases, and full-stack web development to build tomorrow’s technology.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Business Administration</Card.Title>
                <Card.Text>
                  Master management principles, entrepreneurship, and financial planning to lead in global markets.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} sm={6} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body>
                <Card.Title>Health & Social Care</Card.Title>
                <Card.Text>
                  Develop compassionate care skills and understanding of social support in community health.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* === Admission Info === *
      <section className="mb-5">
        <h3 className="text-secondary mb-3">Admission Information</h3>
        <ul className="fs-6">
          <li>
            <strong>Admissions Open:</strong> June 1, 2025
          </li>
          <li>
            <strong>Application Deadline:</strong> August 30, 2025
          </li>
          <li>
            <strong>Requirements:</strong> 5 O'Level credits including English and Mathematics
          </li>
          <li>
            <strong>Application Fee:</strong> €50 (non-refundable)
          </li>
        </ul>
      </section>

      {/* === Apply Call-to-Action === *
      <section className="text-center mb-5">
        <h4 className="mb-3">Ready to Begin Your Journey?</h4>
        <p className="text-muted mb-4">
          Start your application process online and join our growing community of scholars.
        </p>
        <Link to="/apply">
          <Button variant="primary" size="lg">
            Apply for Admission
          </Button>
        </Link>
      </section>

      {/* === Contact Info === *
      <footer className="text-center mt-5">
        <h5 className="text-secondary mb-3">Contact Administration</h5>
        <p className="mb-1">
          <strong>Email:</strong>{" "}
          <a href="mailto:admin@ernestacademy.edu" className="text-decoration-none">
            admin@ernestacademy.edu
          </a>
        </p>
        <p className="mb-0">
          <strong>Phone:</strong>{" "}
          <a href="tel:+353123456789" className="text-decoration-none">
            +353 123 456 789
          </a>
        </p>
      </footer>
    </Container>
  );
}
*/



import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { courses } from "../data/coursesData"; // IMPORTANT

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Home() {
  return (
    <Container className="py-5">
      {/* Header */}
      <header className="text-center mb-5">
        <h1 className="fw-bold text-primary">Welcome to Greater College</h1>
        <p className="text-muted fs-5">
          Empowering students with quality education for a brighter future.
        </p>
      </header>

      {/* === Courses Section === */}
      <section className="mb-5">
        <h3 className="text-secondary mb-4 text-center">Our Courses</h3>

        <Row>
          {courses.map((course, i) => (
            <Col key={course.slug} md={4} sm={6} className="mb-4">
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column">
                    {/* Icon */}
                    <div className="mb-3">
                      <i
                        className={`bi ${course.icon} text-primary`}
                        style={{ fontSize: "2rem" }}
                        aria-hidden="true"
                      />
                    </div>

                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {course.description}
                    </Card.Text>

                    {/* Buttons */}
                    <div className="mt-auto d-flex flex-column gap-2">
                      <Link to={`/courses/${course.slug}`} className="w-100">
                        <Button variant="outline-primary" className="w-100">
                          View Course
                        </Button>
                      </Link>

                      <Link to="/apply" className="w-100">
                        <Button variant="primary" className="w-100">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>

      {/* === Admission Info === */}
      <section className="mb-5">
        <h3 className="text-secondary mb-3">Admission Information</h3>
        <ul className="fs-6">
          <li>
            <strong>Admissions Open:</strong> June 1, 2025
          </li>
          <li>
            <strong>Application Deadline:</strong> August 30, 2025
          </li>
          <li>
            <strong>Requirements:</strong> 5 O&apos;Level credits including
            English and Mathematics
          </li>
          <li>
            <strong>Application Fee:</strong> €50 (non-refundable)
          </li>
        </ul>
      </section>

      {/* === Apply Call-to-Action === */}
      <section className="text-center mb-5">
        <h4 className="mb-3">Ready to Begin Your Journey?</h4>
        <p className="text-muted mb-4">
          Start your application process online and join our growing community
          of scholars.
        </p>
        <Link to="/apply">
          <Button variant="primary" size="lg">
            Apply for Admission
          </Button>
        </Link>
      </section>

      {/* === Contact Info === */}
      <footer className="text-center mt-5">
        <h5 className="text-secondary mb-3">Contact Administration</h5>
        <p className="mb-1">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:admin@ernestacademy.edu"
            className="text-decoration-none"
          >
            admin@ernestacademy.edu
          </a>
        </p>
        <p className="mb-0">
          <strong>Phone:</strong>{" "}
          <a href="tel:+353123456789" className="text-decoration-none">
            +353 123 456 789
          </a>
        </p>
      </footer>
    </Container>
  );
}
