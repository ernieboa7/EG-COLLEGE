


import React, { useState } from "react";
import {
  useAdminApplicantsQuery,
  useCreateApplicantMutation,
  useUpdateApplicantMutation,
  useDeleteApplicantMutation,
} from "../../services/api";
import AdminModal from "../../components/AdminModal";

import { Table, Button, Spinner, Container } from "react-bootstrap";

export default function Applicants() {
  const { data: applicants = [], isLoading, isError, error } = useAdminApplicantsQuery();
  const [createApplicant] = useCreateApplicantMutation();
  const [updateApplicant] = useUpdateApplicantMutation();
  const [deleteApplicant] = useDeleteApplicantMutation();

  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Auto-hide message after 4s
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Define fields for the AdminModal
  const fields = [
    { name: "name", label: "Full Name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "course", label: "Course", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Pending", "Accepted", "Rejected"],
    },
  ];

  //  Fix: Pass correct payload to updateApplicant
  const handleSave = async (form) => {
    try {
      if (editData?._id) {
        // RTK Query expects { _id, ...form } not { id, ...form }
        await updateApplicant({ _id: editData._id, ...form }).unwrap();
        setMessage(" Applicant updated successfully!");
      } else {
        await createApplicant(form).unwrap();
        setMessage(" Applicant added successfully!");
      }

      // Reset and close modal
      setEditData(null);
      setModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      setMessage(" Failed to save applicant.");
    }
  };

  //  Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      try {
        await deleteApplicant(id).unwrap();
        setMessage(" Applicant deleted successfully.");
      } catch (err) {
        console.error("Delete error:", err);
        setMessage(" Failed to delete applicant.");
      }
    }
  };

  //  Debug: confirm modal is opening
  console.log("Modal open:", modalOpen, "Editing:", editData);

  // Loading and error handling
  if (isLoading) return <p>Loading applicants...</p>;
  if (isError)
    return <p className="text-danger">{error?.data?.message || "Failed to fetch applicants."}</p>;

  return (
   <Container className="py-4">
    <div className="py-3">
      <h2 className="text-primary mb-4 fw-semibold">Applicants Management</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Add Button */}
      <div className="text-end mb-3">
        <button
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
          className="btn btn-primary"
        >
          + Add Applicant
        </button>
      </div>

      {/* Applicants Table */}
      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        
        <Table bordered hover responsive size="sm" className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.course}</td>
                <td>{app.status || "Pending"}</td>
                <td>{new Date(app.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditData(app);
                      setModalOpen(true);
                    }}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Admin Modal */}
      <AdminModal
        open={modalOpen}
        title={editData ? "Edit Applicant" : "Add New Applicant"}
        onClose={() => setModalOpen(false)}
        fields={fields}
        initial={editData || {}}
        onSubmit={handleSave}
        submitLabel={editData ? "Update" : "Add"}
      />
    </div>
   </Container>  
  );
}
