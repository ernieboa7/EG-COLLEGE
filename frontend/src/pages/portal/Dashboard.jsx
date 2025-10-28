/*
import { useSelector } from "react-redux";
import { useProfileQuery, useResultsQuery, usePaymentHistoryQuery } from "../../services/api.js";

const Card = ({ title, value, sub }) => (
  <div className="rounded-2xl border bg-white p-5 shadow-sm">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
    {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
  </div>
);

export default function Dashboard() {
  const sid = useSelector((s)=>s.auth.student?.studentId);
  const { data: profile } = useProfileQuery();
  const { data: results = [] } = useResultsQuery(sid, { skip: !sid });
  const { data: payments = [] } = usePaymentHistoryQuery(sid, { skip: !sid });
  const paid = (payments || []).filter(p => p.status === "paid");
  const totalPaid = paid.reduce((s, p) => s + (p.total || 0), 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome{profile?.firstName ? `, ${profile.firstName}` : ""} 👋</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Results" value={results.length} />
        <Card title="Courses" value={profile?.enrolledCourses?.length || 0} />
        <Card title="Total Paid" value={`€${totalPaid.toFixed(2)}`} />
        <Card title="Status" value={profile?.status || "—"} sub={profile?.department} />
      </div>
    </div>
  );
}
*/


import { useSelector } from "react-redux";
import {
  useProfileQuery,
  useResultsQuery,
  usePaymentHistoryQuery,
} from "../../services/api.js";
import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";

export default function StudentDashboard() {
  const sid = useSelector((s) => s.auth.student?.studentId);
  const { data: profile, isLoading: loadingProfile, error: profileError } = useProfileQuery();
  const { data: results = [], isLoading: loadingResults } = useResultsQuery(sid, { skip: !sid });
  const { data: payments = [], isLoading: loadingPayments } = usePaymentHistoryQuery(sid, { skip: !sid });

  // Payment summary
  const paid = (payments || []).filter((p) => p.status === "paid");
  const totalPaid = paid.reduce((s, p) => s + (p.total || 0), 0);

  const loading = loadingProfile || loadingResults || loadingPayments;

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3 text-secondary">Loading your dashboard...</div>
      </div>
    );
  }

  if (profileError) {
    return (
      <Alert variant="danger" className="mt-4">
        Failed to load your student profile. Please try again later.
      </Alert>
    );
  }

  return (
    <div className="py-4">
      <h3 className="text-primary mb-4 fw-bold">
        Welcome{profile?.firstName ? `, ${profile.firstName}` : ""}! 👋
      </h3>

      <Row className="g-4">
        <Col sm={6} lg={3}>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-muted small">Results</Card.Title>
              <h3 className="fw-semibold">{results.length}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-muted small">Courses</Card.Title>
              <h3 className="fw-semibold">
                {profile?.enrolledCourses?.length || 0}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-muted small">Total Paid</Card.Title>
              <h3 className="fw-semibold text-success">
                €{totalPaid.toFixed(2)}
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="text-muted small">Status</Card.Title>
              <h3 className="fw-semibold">{profile?.status || "—"}</h3>
              <div className="text-secondary small">
                {profile?.department || ""}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Optional: Add summary section */}
      <div className="mt-5">
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <h5 className="fw-semibold mb-3 text-primary">Student Info</h5>
            <p className="mb-1">
              <strong>ID:</strong> {profile?.studentId}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {profile?.email}
            </p>
            <p className="mb-1">
              <strong>Department:</strong> {profile?.department}
            </p>
            <p className="mb-0">
              <strong>Level:</strong> Year {profile?.yearLevel || 1}
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
