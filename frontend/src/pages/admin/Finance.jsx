import { useAdminPaymentsQuery } from "../../services/api";
import { Table, Container, Spinner, Badge } from "react-bootstrap";

export default function Finance() {
  const { data = [], isLoading } = useAdminPaymentsQuery();

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-semibold mb-0">Finance</h3>
      </div>

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : data.length === 0 ? (
        <p className="text-muted text-center fst-italic">No payments found.</p>
      ) : (
        <div className="table-responsive bg-white border rounded shadow-sm">
          <Table bordered hover responsive size="sm" className="align-middle mb-0">
            <thead className="table-primary text-dark">
              <tr>
                <th>Student ID</th>
                <th>Items</th>
                <th>Total (€)</th>
                <th>Provider</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p) => (
                <tr key={p._id}>
                  <td>{p.studentId}</td>

                  <td className="small">
                    {(p.items || []).map((i, idx) => (
                      <div key={idx}>
                        #{i.feeItemId} — €{i.amount.toFixed(2)}
                      </div>
                    ))}
                  </td>

                  <td className="fw-semibold">€{p.total.toFixed(2)}</td>
                  <td>{p.provider}</td>

                  <td>
                    <Badge
                      bg={
                        p.status === "paid"
                          ? "success"
                          : p.status === "failed"
                          ? "danger"
                          : "warning"
                      }
                      className="text-capitalize"
                    >
                      {p.status}
                    </Badge>
                  </td>

                  <td>{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
