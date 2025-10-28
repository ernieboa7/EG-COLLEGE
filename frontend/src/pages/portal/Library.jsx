/*
import { useLibraryQuery } from "../../services/api.js";
export default function Library() {
  const { data = [], isLoading } = useLibraryQuery();
  if (isLoading) return "Loading...";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map(b => (
        <div key={b.id} className="bg-white border rounded-xl p-4">
          <div className="font-semibold">{b.title}</div>
          <div className="text-sm text-gray-600">{b.author}</div>
          <div className="text-xs text-gray-500 mt-1">{b.department} • {b.edition}</div>
          <div className="mt-2 text-sm">Available: {b.availableCopies}</div>
        </div>
      ))}
    </div>
  );
}
*/

import { useState } from "react";
import { useLibraryQuery, useBorrowBookMutation } from "../../services/api.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Card,
  Row,
  Col,
  Spinner,
  Modal,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";

export default function Library() {
  const { data: books = [], isLoading, refetch } = useLibraryQuery();
  const [selectedBook, setSelectedBook] = useState(null);
  const [search, setSearch] = useState("");

  const sid = useSelector((s) => s.auth.student?.studentId);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  // ✅ Filter books by search term
  const filteredBooks = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase()) ||
      b.department?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Borrow handler
  const handleBorrow = async (bookId) => {
    try {
      await borrowBook({ studentId: sid, bookId }).unwrap();
      toast.success("Book borrowed successfully!");
      refetch(); // refresh availableCopies count
      setSelectedBook(null); // close modal
    } catch (err) {
      toast.error(err?.data?.message || "Failed to borrow");
    }
  };

  return (
    <div className="py-4">
      {/* ===== HEADER & SEARCH ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary m-0">Library Collection</h3>
        <InputGroup style={{ width: "280px" }}>
          <Form.Control
            type="text"
            placeholder="Search by title, author..."
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
      </div>

      {/* ===== LOADING STATE ===== */}
      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : !filteredBooks.length ? (
        <p className="text-center text-muted">No books found.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredBooks.map((b) => (
            <Col key={b._id}>
              <Card
                className="h-100 shadow-sm border-0 hover-shadow"
                onClick={() => setSelectedBook(b)}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <Card.Title className="fw-semibold text-dark">
                    {b.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {b.author}
                  </Card.Subtitle>
                  <Card.Text className="small text-secondary">
                    {b.department} • {b.edition}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center bg-light">
                  <span
                    className={`badge ${
                      b.availableCopies > 0
                        ? "bg-success"
                        : "bg-danger text-light"
                    }`}
                  >
                    {b.availableCopies > 0
                      ? `${b.availableCopies} available`
                      : "Unavailable"}
                  </span>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ===== MODAL (Book Details) ===== */}
      <Modal
        show={!!selectedBook}
        onHide={() => setSelectedBook(null)}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>

        {selectedBook && (
          <Modal.Body>
            <h5 className="fw-bold mb-2">{selectedBook.title}</h5>
            <p className="text-muted mb-1">
              <strong>Author:</strong> {selectedBook.author}
            </p>
            <p className="text-muted mb-1">
              <strong>Department:</strong> {selectedBook.department}
            </p>
            <p className="text-muted mb-1">
              <strong>Edition:</strong> {selectedBook.edition || "N/A"}
            </p>
            <p className="text-muted mb-3">
              <strong>Available Copies:</strong> {selectedBook.availableCopies}
            </p>

            <div className="text-center">
              <Button
                variant="primary"
                disabled={
                  selectedBook.availableCopies <= 0 ||
                  isBorrowing ||
                  !sid
                }
                onClick={() => handleBorrow(selectedBook._id)}
              >
                {isBorrowing ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Borrowing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-book me-2"></i> Borrow Book
                  </>
                )}
              </Button>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
}
