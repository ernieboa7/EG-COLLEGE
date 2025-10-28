import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useResultsQuery } from "../../services/api.js";
import {
  Card,
  Spinner,
  Table,
  Alert,
  InputGroup,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

export default function Results() {
  const sid = useSelector((s) => s.auth.student?.studentId);
  const { data = [], isLoading, refetch } = useResultsQuery(sid, {
    skip: !sid,
  });

  const [search, setSearch] = useState("");
  const [termFilter, setTermFilter] = useState("");

  // 🧮 Filter and compute stats
  const filtered = data.filter((r) => {
    const matchesSearch =
      r.courseCode?.toLowerCase().includes(search.toLowerCase()) ||
      r.term?.toLowerCase().includes(search.toLowerCase());
    const matchesTerm = !termFilter || r.term === termFilter;
    return matchesSearch && matchesTerm;
  });

  // 🎓 Compute GPA summary (A=4, B=3, C=2, D=1, F=0)
  const { totalCourses, avgScore, gpa } = useMemo(() => {
    if (!data.length) return { totalCourses: 0, avgScore: 0, gpa: 0 };
    const scoreSum = data.reduce((sum, r) => sum + (r.score || 0), 0);
    const gradePoints = data.reduce((sum, r) => {
      const gradeMap = { A: 4, B: 3, C: 2, D: 1, F: 0 };
      return sum + (gradeMap[r.grade] ?? 0);
    }, 0);
    return {
      totalCourses: data.length,
      avgScore: (scoreSum / data.length).toFixed(1),
      gpa: (gradePoints / data.length).toFixed(2),
    };
  }, [data]);

  const handlePrint = () => window.print();

  return (
    <div className="py-4">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary m-0">Academic Results</h3>
        <div className="d-flex gap-2">
          <Button variant="outline-primary" onClick={() => refetch()}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </Button>
          <Button variant="success" onClick={handlePrint}>
            <i className="bi bi-printer me-1"></i> Print
          </Button>
        </div>
      </div>

      {/* ===== GPA SUMMARY CARD ===== */}
      {!isLoading && data.length > 0 && (
        <Row className="mb-4">
          <Col md={4}>
            <Card className="border-0 shadow-sm text-center bg-light">
              <Card.Body>
                <h6 className="text-muted">Total Courses</h6>
                <h3 className="fw-bold text-primary">{totalCourses}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm text-center bg-light">
              <Card.Body>
                <h6 className="text-muted">Average Score</h6>
                <h3 className="fw-bold text-info">{avgScore}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm text-center bg-light">
              <Card.Body>
                <h6 className="text-muted">GPA</h6>
                <h3
                  className={`fw-bold ${
                    gpa >= 3.5
                      ? "text-success"
                      : gpa >= 2.5
                      ? "text-warning"
                      : "text-danger"
                  }`}
                >
                  {gpa}
                </h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* ===== RESULTS TABLE ===== */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : !data.length ? (
            <Alert variant="info">No results available yet.</Alert>
          ) : (
            <>
              {/* Filter section */}
              <div className="d-flex justify-content-between mb-3 flex-wrap gap-2">
                <InputGroup style={{ width: "280px" }}>
                  <Form.Control
                    type="text"
                    placeholder="Search by course or term"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setSearch("")}
                    title="Clear"
                  >
                    <i className="bi bi-x"></i>
                  </Button>
                </InputGroup>

                <Form.Select
                  style={{ width: "180px" }}
                  value={termFilter}
                  onChange={(e) => setTermFilter(e.target.value)}
                >
                  <option value="">All Terms</option>
                  {[...new Set(data.map((r) => r.term))].map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </Form.Select>
              </div>

              {/* Results Table */}
              <Table bordered hover responsive className="align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Course</th>
                    <th>Term</th>
                    <th>Score</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r._id}>
                      <td className="fw-semibold">{r.courseCode}</td>
                      <td>{r.term}</td>
                      <td>{r.score}</td>
                      <td>
                        <span
                          className={`badge ${
                            r.grade === "A"
                              ? "bg-success"
                              : r.grade === "B"
                              ? "bg-info"
                              : r.grade === "C"
                              ? "bg-warning text-dark"
                              : r.grade === "D"
                              ? "bg-secondary"
                              : "bg-danger"
                          }`}
                        >
                          {r.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Footer Summary */}
              <div className="text-end text-muted small mt-2">
                Showing {filtered.length} of {data.length} results
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
