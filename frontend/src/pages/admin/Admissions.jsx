


import React, { useState, useEffect } from "react";
import {
  useAdminStudentsQuery,
  useCreateAdminStudentMutation,
  useUpdateAdminStudentMutation,
  useDeleteAdminStudentMutation,
  useAdminApplicantsQuery,
} from "../../services/api";
import { Table, Button, Spinner, Container } from "react-bootstrap";
import AdminModal from "../../components/AdminModal";
import toast from "react-hot-toast";

export default function Admissions() {
  // === Fetch Students ===
  const { data: students = [], isLoading } = useAdminStudentsQuery();
  const [createStudent] = useCreateAdminStudentMutation();
  const [updateStudent] = useUpdateAdminStudentMutation();
  const [deleteStudent] = useDeleteAdminStudentMutation();

  // === Fetch Applicants ===
  const { data: applicants = [] } = useAdminApplicantsQuery();

  // === Local States ===
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [syncing, setSyncing] = useState(false);

  // === Auto-hide Toasts ===
  useEffect(() => {
    const timer = setTimeout(() => toast.dismiss(), 4000);
    return () => clearTimeout(timer);
  }, []);

  // === Modal Fields ===
  const fields = [
    { name: "studentId", label: "Student ID", required: true },
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "department", label: "Department", required: true },
    { name: "yearLevel", label: "Year Level", type: "number", required: true },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["admitted", "pending", "suspended"],
      required: true,
    },
  ];

  // === Add / Edit ===
  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (student) => {
    setEditing(student);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editing?._id) {
        await updateStudent({ _id: editing._id, ...form }).unwrap();
        toast.success(" Student updated successfully");
      } else {
        await createStudent(form).unwrap();
        toast.success(" Student added successfully");
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(" Failed to save student");
    }
  };

  // === Delete ===
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(id).unwrap();
      toast.success(" Student deleted successfully");
    } catch {
      toast.error(" Failed to delete student");
    }
  };

  // === Manual Sync of Accepted Applicants ===
  const handleSyncAcceptedApplicants = async () => {
    setSyncing(true);
    try {
      const accepted = applicants.filter((a) => a.status === "Accepted");
      if (accepted.length === 0) {
        toast("No accepted applicants found.");
        return;
      }

      let addedCount = 0;
      let failedCount = 0;

      for (const a of accepted) {
        const exists = students.some((s) => s.email === a.email);
        if (!exists) {
          try {
            const result = await createStudent({
              studentId: `STU${Date.now().toString().slice(-5)}`,
              firstName: a.name.split(" ")[0],
              lastName: a.name.split(" ")[1] || "",
              email: a.email,
              department: a.course,
              yearLevel: 1,
              status: "admitted",
            }).unwrap();

          //  Confirm backend success
            if (result?.success && result?.student?._id) {
              addedCount++;
            } else {
              console.warn("Created but missing response data:", result);
            }
          } catch (err) {
            failedCount++;
            console.warn(`Failed to sync ${a.email}`, err);
          }
        }
      }

    //  Summary feedback
      if (addedCount > 0 && failedCount === 0) {
        toast.success(` ${addedCount} applicant(s) added to Admissions`);
      } else if (addedCount > 0 && failedCount > 0) {
        toast(`${addedCount} added, ${failedCount} failed`);
      } else if (addedCount === 0) {
        toast("No new applicants to sync.");
      }
    } catch (err) {
      console.error(err);
      toast.error(" Unexpected error during sync.");
    } finally {
      setSyncing(false);
    }
  };


  // === Render ===
  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-semibold mb-0">Admissions</h3>
        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            disabled={syncing}
            onClick={handleSyncAcceptedApplicants}
          >
            {syncing ? "Syncing..." : "Sync Accepted Applicants"}
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            + Add Student
          </Button>
        </div>
      </div>

      {/* Table or Loader */}
      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : students.length === 0 ? (
        <p className="text-muted">No students found.</p>
      ) : (
        <Table bordered hover responsive size="sm" className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.studentId}</td>
                <td>{`${s.firstName} ${s.lastName}`}</td>
                <td>{s.email}</td>
                <td>{s.department}</td>
                <td>{s.yearLevel}</td>
                <td>{s.status}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(s._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <AdminModal
        open={modalOpen}
        title={editing ? "Edit Student" : "Add Student"}
        onClose={() => setModalOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />
    </Container>
  );
}
