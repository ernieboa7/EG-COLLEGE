

import React, { useState, useEffect } from "react";
import {
  useAdminCoursesQuery,
  useCreateAdminCourseMutation,
  useUpdateAdminCourseMutation,
  useDeleteAdminCourseMutation,
} from "../../services/api";
import { Table, Button, Spinner, Container } from "react-bootstrap";
import AdminModal from "../../components/AdminModal";
import toast from "react-hot-toast";

export default function Courses() {
  // === RTK Query Hooks ===
  const { data: courses = [], isLoading, isFetching } = useAdminCoursesQuery();
  const [createCourse] = useCreateAdminCourseMutation();
  const [updateCourse] = useUpdateAdminCourseMutation();
  const [deleteCourse] = useDeleteAdminCourseMutation();

  // === Local State ===
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // === Auto-hide toast cleanup ===
  useEffect(() => {
    const timer = setTimeout(() => toast.dismiss(), 4000);
    return () => clearTimeout(timer);
  }, []);

  // === Form Fields ===
  const fields = [
    { name: "id", label: "Course ID", type: "number", required: true },
    { name: "code", label: "Course Code", required: true },
    { name: "title", label: "Course Title", required: true },
    { name: "department", label: "Department", required: true },
    { name: "teacherName", label: "Teacher Name" },
    { name: "capacity", label: "Capacity", type: "number", required: true },
    {
      name: "schedule",
      label: "Schedule (JSON)",
      type: "textarea",
      help: `Example: [
  { "day": "Monday", "start": "09:00", "end": "10:30", "room": "CS101" }
]`,
    },
  ];

  // === Add / Edit Handlers ===
  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (course) => {
    setEditing({
      ...course,
      schedule: JSON.stringify(course.schedule || [], null, 2),
    });
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      const payload = {
        ...form,
        schedule:
          typeof form.schedule === "string" && form.schedule.trim()
            ? JSON.parse(form.schedule)
            : [],
      };

      if (editing?._id) {
        await updateCourse({ _id: editing._id, ...payload }).unwrap();
        toast.success("✅ Course updated successfully");
      } else {
        await createCourse(payload).unwrap();
        toast.success("✅ Course created successfully");
      }

      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "❌ Failed to save course");
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteCourse(id).unwrap();
      toast.success("🗑️ Course deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "❌ Failed to delete course");
    }
  };

  // === UI ===
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-semibold">Courses</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Course
        </Button>
      </div>

      {isLoading || isFetching ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <Table bordered hover responsive size="sm" className="align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Title</th>
              <th>Department</th>
              <th>Teacher</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c._id}>
                <td>{c.id}</td>
                <td>{c.code}</td>
                <td>{c.title}</td>
                <td>{c.department}</td>
                <td>{c.teacherName}</td>
                <td>{c.capacity}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(c._id, c.title)}
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
        title={editing ? "Edit Course" : "Add Course"}
        onClose={() => setModalOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />
    </Container>
  );
}
