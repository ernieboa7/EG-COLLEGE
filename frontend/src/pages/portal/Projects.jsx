import { useState } from "react";
import {
  useStudentProjectsQuery,
  useSelectProjectMutation,
  useUploadProjectMutation,
} from "../../services/api.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Card,
  Spinner,
  Table,
  Modal,
  Button,
  Form,
  Alert,
} from "react-bootstrap";

export default function StudentProjects() {
  const sid = useSelector((s) => s.auth.student?.studentId);

  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useStudentProjectsQuery(sid, { skip: !sid });

  const [selectProject, { isLoading: isSelecting }] =
    useSelectProjectMutation();
  const [uploadProject, { isLoading: isUploading }] =
    useUploadProjectMutation();

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);

  // 📋 Find the student's selected project
  const mySelected = projects.find((p) => p.selected);

  const handleSelectProject = async (projectId) => {
    try {
      await selectProject({ studentId: sid, projectId }).unwrap();
      toast.success("✅ Project selected successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "❌ Selection failed");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please choose a file");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("projectId", selected._id);
      formData.append("studentId", sid);

      await uploadProject(formData).unwrap();
      toast.success("📤 Project uploaded successfully!");
      setShowModal(false);
      setFile(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary m-0">My Projects</h3>
      </div>

      {/* 🟢 My Selected Project Summary */}
      {mySelected ? (
        <Card className="mb-4 border-0 shadow-sm bg-light">
          <Card.Body>
            <h5 className="fw-bold text-success mb-1">
              You have selected: {mySelected.title}
            </h5>
            <p className="text-muted mb-0">
              <strong>Supervisor:</strong> {mySelected.supervisor} <br />
              <strong>Department:</strong> {mySelected.department}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="secondary" className="mb-4">
          You have not selected a project yet. Please choose from the list below.
        </Alert>
      )}

      <Card className="shadow-sm border-0">
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : !projects.length ? (
            <Alert variant="info">No projects available at the moment.</Alert>
          ) : (
            <Table hover responsive bordered className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Supervisor</th>
                  <th>Department</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>File</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const mySubmission = p.submissions?.find(
                    (s) => s.studentId === sid
                  );
                  return (
                    <tr key={p._id}>
                      <td>{p.title}</td>
                      <td>{p.supervisor}</td>
                      <td>{p.department}</td>
                      <td className="small">{p.description}</td>
                      <td>
                        {p.selected ? (
                          <span className="badge bg-success">Selected</span>
                        ) : (
                          <span className="badge bg-secondary">Available</span>
                        )}
                      </td>
                      <td>
                        {mySubmission?.fileUrl ? (
                          <a
                            href={`http://localhost:8080${mySubmission.fileUrl}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            View File
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {/* Select Project Button */}
                        {!p.selected && !mySelected && (
                          <Button
                            size="sm"
                            variant="outline-primary"
                            disabled={isSelecting}
                            onClick={() => handleSelectProject(p._id)}
                          >
                            {isSelecting ? (
                              <>
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  className="me-2"
                                />
                                Selecting...
                              </>
                            ) : (
                              "Select Project"
                            )}
                          </Button>
                        )}

                        {/* Upload button (only if selected project) */}
                        {p.selected && (
                          <Button
                            size="sm"
                            variant="success"
                            className="ms-2"
                            onClick={() => {
                              setSelected(p);
                              setShowModal(true);
                            }}
                          >
                            <i className="bi bi-upload me-2"></i>Upload File
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* ===== Upload Modal ===== */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleUpload}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Project File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select PDF/DOCX File</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isUploading}>
              {isUploading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
