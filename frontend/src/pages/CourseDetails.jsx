/*import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function CourseDetails() {
  const { slug } = useParams();

  return (
    <Container className="py-5">
      <h2 className="fw-bold text-primary text-capitalize">
        {slug.replaceAll("-", " ")}
      </h2>
      <p className="text-muted">
        This is the course details page. You can show modules, fees, duration,
        and entry requirements here.
      </p>

      <Link to="/">
        <Button variant="secondary">Back to Home</Button>
      </Link>
    </Container>
  );
}
*/

import { useParams, Link } from "react-router-dom";
import { Container, Button, Card, ListGroup, Badge } from "react-bootstrap";
import { courses } from "../data/coursesData"; // ✅ IMPORTANT

export default function CourseDetails() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <Container className="py-5">
        <h2 className="fw-bold text-danger">Course not found</h2>
        <p className="text-muted">
          The course you’re looking for doesn’t exist.
        </p>
        <Link to="/">
          <Button variant="secondary">Back to Home</Button>
        </Link>
      </Container>
    );
  }

  const yearSections = [
    { key: "year1", label: "Year 1 Modules" },
    { key: "year2", label: "Year 2 Modules" },
    { key: "year3", label: "Year 3 Modules" },
  ];

  return (
    <Container className="py-5">
      {/* Title */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <i
          className={`bi ${course.icon} text-primary`}
          style={{ fontSize: "2.2rem" }}
          aria-hidden="true"
        />
        <div>
          <h2 className="fw-bold text-primary mb-1">{course.title}</h2>
          <p className="text-muted mb-0">{course.description}</p>
        </div>
      </div>

      {/* Badges */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        <Badge bg="primary">Fee: €{course.fee}</Badge>
        <Badge bg="secondary">Duration: {course.duration}</Badge>
      </div>

      {/* Requirements */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Card.Title className="text-secondary">Entry Requirements</Card.Title>
          <Card.Text className="mb-0">{course.requirements}</Card.Text>
        </Card.Body>
      </Card>

      {/* Modules by Year */}
      <div className="mb-4">
        {yearSections.map((section) => {
          const list = course.modulesByYear?.[section.key] || [];
          return (
            <Card key={section.key} className="shadow-sm border-0 mb-3">
              <Card.Body>
                <Card.Title className="text-secondary">
                  {section.label}
                </Card.Title>

                {list.length === 0 ? (
                  <p className="text-muted mb-0">Modules will be updated soon.</p>
                ) : (
                  <ListGroup variant="flush" className="mt-2">
                    {list.map((m, idx) => (
                      <ListGroup.Item key={idx} className="py-2">
                        {m}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="d-flex gap-2 flex-wrap">
        <Link to="/apply">
          <Button variant="primary">Apply Now</Button>
        </Link>

        <Link to="/">
          <Button variant="outline-secondary">Back to Home</Button>
        </Link>
      </div>
    </Container>
  );
}
