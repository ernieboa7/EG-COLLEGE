import { useParams, Link } from "react-router-dom";
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
