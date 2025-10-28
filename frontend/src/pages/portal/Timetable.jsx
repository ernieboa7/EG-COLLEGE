import { useMemo } from "react";
import { useProfileQuery, useCoursesByIdsQuery } from "../../services/api.js";
import {
  Card,
  Row,
  Col,
  Spinner,
  Table,
  Alert,
  Button,
} from "react-bootstrap";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Timetable() {
  const { data: profile, isLoading: loadingProfile } = useProfileQuery();
  const ids = (profile?.enrolledCourses || []).join(",");
  const {
    data: courses = [],
    isLoading: loadingCourses,
  } = useCoursesByIdsQuery(ids, { skip: !ids });

  // 🧮 Organize timetable by weekday
  const byDay = useMemo(() => {
    return days.map((day) => ({
      day,
      sessions: courses
        .flatMap((course) =>
          (course.schedule || [])
            .filter((s) => s.day === day)
            .map((s) => ({
              ...s,
              code: course.code,
              title: course.title,
              department: course.department,
            }))
        )
        .sort((a, b) => a.start.localeCompare(b.start)),
    }));
  }, [courses]);

  const isLoading = loadingProfile || loadingCourses;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-4">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4 no-print">
        <h3 className="fw-bold text-primary m-0">My Timetable</h3>
        <Button variant="success" onClick={handlePrint}>
          <i className="bi bi-printer me-2"></i> Print My Timetable
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : !courses.length ? (
        <Alert variant="info" className="text-center">
          No courses found. Please enroll in courses to view your timetable.
        </Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={5} className="g-3">
          {byDay.map((col) => (
            <Col key={col.day}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-primary text-white fw-semibold text-center">
                  {col.day}
                </Card.Header>
                <Card.Body>
                  {col.sessions.length ? (
                    <Table
                      size="sm"
                      bordered
                      hover
                      responsive
                      className="align-middle mb-0"
                    >
                      <thead className="table-light">
                        <tr>
                          <th className="text-center">Code</th>
                          <th>Time</th>
                          <th>Room</th>
                        </tr>
                      </thead>
                      <tbody>
                        {col.sessions.map((s, i) => (
                          <tr key={i}>
                            <td className="fw-semibold text-center">{s.code}</td>
                            <td>
                              <div className="small text-muted">
                                {s.start}–{s.end}
                              </div>
                              <div className="small">{s.title}</div>
                            </td>
                            <td className="text-center small">{s.room}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p className="text-muted text-center small mb-0">
                      No classes scheduled
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ===== PRINT FOOTER (visible only in print) ===== */}
      <div className="print-only mt-5 text-center text-muted small">
        Printed from Greater College Student Portal —{" "}
        {new Date().toLocaleString()}
      </div>

      {/* ===== CSS for Print View ===== */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body {
            background: white !important;
          }
          .card {
            page-break-inside: avoid;
            border: 1px solid #ddd !important;
            box-shadow: none !important;
          }
        }
        @media screen {
          .print-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}
