import { useState } from "react";
import {
  useEnrolMutation,
  useUnenrollMutation,
  useProfileQuery,
  useCoursesByIdsQuery,
  useAvailableCoursesQuery, // new query for browsing
} from "../../services/api.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Form,
  Button,
  Spinner,
  Card,
  Alert,
  Table,
  Row,
  Col,
} from "react-bootstrap";

export default function Courses() {
  const [courseId, setCourseId] = useState("");
  const sid = useSelector((s) => s.auth.student?.studentId);

  // RTK Query Hooks
  const [enrol, { isLoading: isEnrolling, isError, error }] = useEnrolMutation();
  const [unenroll, { isLoading: isUnenrolling }] = useUnenrollMutation();
  const { data: profile, refetch: refetchProfile } = useProfileQuery();

  // Enrolled course details

  const enrolledIds = Array.isArray(profile?.enrolledCourses)
    ? profile.enrolledCourses
    : [];

  const idsCsv = enrolledIds.length > 0 ? enrolledIds.join(",") : "";

  const {
    data: courses = [],
    isFetching: isCoursesLoading,
  } = useCoursesByIdsQuery(idsCsv, { skip: !idsCsv });




  /*const idsCsv = (profile?.enrolledCourses || []).join(",");
  const {
    data: courses = [],
    isFetching: isCoursesLoading,
  } = useCoursesByIdsQuery(idsCsv, { skip: !idsCsv });*/

  // ✅ Fetch all available courses for browsing
  const { data: availableCourses = [], isLoading: isFetchingAvailable } =
    useAvailableCoursesQuery();

  // === HANDLE ENROLL ===
  const handleEnroll = async (e) => {
    e.preventDefault();
    if (!courseId.trim()) {
      toast.error("Please enter a course ID");
      return;
    }

    try {
      await enrol({ studentId: sid, courseId: Number(courseId) }).unwrap();
      toast.success("✅ Enrolled successfully!");
      setCourseId("");
      refetchProfile(); // refresh student data
    } catch (e) {
      toast.error(e?.data?.message || "❌ Enrollment failed.");
    }
  };

  // === HANDLE UNENROLL ===
  const handleUnenroll = async (cid, title) => {
    if (!window.confirm(`Are you sure you want to unenroll from ${title}?`)) return;

    try {
      await unenroll({ studentId: sid, courseId: cid }).unwrap();
      toast.success("🗑️ Unenrolled successfully");
      refetchProfile();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to unenroll");
    }
  };

  // === QUICK ENROLL BUTTON (from browse table)
  const handleQuickEnroll = async (cid) => {
    try {
      await enrol({ studentId: sid, courseId: cid }).unwrap();
      toast.success("🎓 Enrolled!");
      refetchProfile();
    } catch (e) {
      toast.error(e?.data?.message || "Could not enroll in course");
    }
  };

  return (
    <div className="py-4">
      <Row className="gy-4">
        {/* =============== ENROLL FORM =============== */}
        <Col lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary fw-bold mb-3">
                Enroll in a Course
              </Card.Title>

              {isError && (
                <Alert variant="danger">
                  {error?.data?.message || "An error occurred while enrolling."}
                </Alert>
              )}

              <Form onSubmit={handleEnroll}>
                <Form.Group className="mb-3" controlId="formCourseId">
                  <Form.Label>Course ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 101"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter the numeric Course ID to enroll manually.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Enrolling...
                      </>
                    ) : (
                      "Enroll"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* =============== MY COURSES LIST =============== */}
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="fw-bold text-success mb-3">
                My Enrolled Courses
              </Card.Title>

              {isCoursesLoading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : !courses.length ? (
                <Alert variant="info">
                  You are not enrolled in any courses yet.
                </Alert>
              ) : (
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Department</th>
                      <th>Credits</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c._id}>
                        <td>{c.id}</td>
                        <td>{c.title}</td>
                        <td>{c.department}</td>
                        <td>{c.credits || 3}</td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            disabled={isUnenrolling}
                            onClick={() => handleUnenroll(c.id, c.title)}
                          >
                            {isUnenrolling ? "..." : "Unenroll"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* =============== BROWSE AVAILABLE COURSES =============== */}
      <Card className="shadow-sm border-0 mt-5">
        <Card.Body>
          <Card.Title className="fw-bold text-primary mb-3">
            Browse Available Courses
          </Card.Title>

          {isFetchingAvailable ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : !availableCourses.length ? (
            <Alert variant="info">No available courses found.</Alert>
          ) : (
            <Table hover responsive className="align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Credits</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availableCourses.map((c) => (
                  <tr key={c._id}>
                    <td>{c.id}</td>
                    <td>{c.title}</td>
                    <td>{c.department}</td>
                    <td>{c.credits || 3}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleQuickEnroll(c.id)}
                      >
                        Enroll
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
