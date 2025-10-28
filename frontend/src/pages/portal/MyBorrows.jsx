import { useMyBorrowsQuery, useReturnBookMutation } from "../../services/api.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Card, Table, Spinner, Button, Alert } from "react-bootstrap";

export default function MyBorrows() {
  const sid = useSelector((s) => s.auth.student?.studentId);
  const { data: records = [], isLoading, refetch } = useMyBorrowsQuery(sid, { skip: !sid });
  const [returnBook, { isLoading: isReturning }] = useReturnBookMutation();

  const handleReturn = async (borrowId) => {
    if (!window.confirm("Are you sure you want to return this book?")) return;
    try {
      await returnBook({ borrowId }).unwrap();
      toast.success("Book returned successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to return book");
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  return (
    <div className="py-4">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title className="fw-bold text-primary mb-3">
            My Borrowed Books
          </Card.Title>

          {!records.length ? (
            <Alert variant="info">You have no borrowed books.</Alert>
          ) : (
            <Table hover responsive bordered className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Department</th>
                  <th>Borrowed On</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r._id}>
                    <td>{r.title}</td>
                    <td>{r.author}</td>
                    <td>{r.department}</td>
                    <td>{new Date(r.borrowDate).toLocaleDateString()}</td>
                    <td>
                      {new Date(r.dueDate).toLocaleDateString()}
                      {new Date(r.dueDate) < new Date() && r.status === "borrowed" && (
                        <span className="badge bg-danger ms-2">Overdue</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          r.status === "returned" ? "bg-success" : "bg-warning text-dark"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td>
                      {r.status === "borrowed" && (
                        <Button
                          size="sm"
                          variant="outline-danger"
                          disabled={isReturning}
                          onClick={() => handleReturn(r._id)}
                        >
                          {isReturning ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Returning...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-arrow-return-left me-1"></i> Return
                            </>
                          )}
                        </Button>
                      )}
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
