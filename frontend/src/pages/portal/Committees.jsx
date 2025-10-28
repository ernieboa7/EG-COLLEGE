/*
import { useAdminCommitteesQuery } from "../../services/api.js";
export default function Committees() {
  const { data = [], isLoading } = useAdminCommitteesQuery();
  if (isLoading) return "Loading...";
  return (
    <div className="space-y-3">
      {data.map(c => (
        <div key={c.id} className="bg-white border rounded-xl p-4">
          <div className="font-semibold">{c.name}</div>
          <div className="text-sm text-gray-600">Chair: {c.chairperson}</div>
          <p className="text-sm mt-2">{c.objective}</p>
        </div>
      ))}
    </div>
  );
}
*/

import { useCommitteesQuery } from "../../services/api.js";
import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";

export default function Committees() {
  const { data = [], isLoading, isError } = useCommitteesQuery();

  if (isLoading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <div className="mt-3 text-secondary">Loading committees...</div>
      </div>
    );

  if (isError)
    return (
      <Alert variant="danger" className="mt-4">
        Failed to load committees. Please try again later.
      </Alert>
    );

  if (!data.length)
    return (
      <Alert variant="info" className="mt-4">
        No committees found.
      </Alert>
    );

  return (
    <div className="py-4">
      <h3 className="text-primary fw-bold mb-4">School Committees</h3>

      <Row className="g-4">
        {data.map((committee) => (
          <Col sm={12} md={6} lg={4} key={committee._id}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <Card.Title className="fw-semibold text-primary">
                  {committee.name}
                </Card.Title>
                <div className="small text-muted mb-2">
                  <strong>Chair:</strong> {committee.chairperson || "—"}
                </div>
                <Card.Text className="text-secondary small">
                  {committee.objective || "No objective provided."}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
