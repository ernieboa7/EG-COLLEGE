import { useState } from "react";
import {
  useAdminProjectsQuery,
  useCreateAdminProjectMutation,
  useUpdateAdminProjectMutation,
  useDeleteAdminProjectMutation,
} from "../../services/api";
import AdminTable from "../../components/AdminTable";
import AdminModal from "../../components/AdminModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Button, Container, Spinner } from "react-bootstrap";

export default function Projects() {
  const { data = [], isLoading } = useAdminProjectsQuery();
  const [createItem] = useCreateAdminProjectMutation();
  const [updateItem] = useUpdateAdminProjectMutation();
  const [deleteItem] = useDeleteAdminProjectMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // === Table Columns ===
  const columns = [
    { key: "id", header: "ID" },
    { key: "title", header: "Title" },
    { key: "supervisor", header: "Supervisor" },
    { key: "department", header: "Department" },
    { key: "year", header: "Year" },
    {
      key: "students",
      header: "Students",
      render: (r) => (r.students || []).length,
    },
  ];

  // === Modal Fields ===
  const fields = [
    { name: "id", label: "ID (number)", type: "number", required: true },
    { name: "title", label: "Title", required: true },
    { name: "supervisor", label: "Supervisor", required: true },
    { name: "department", label: "Department", required: true },
    { name: "year", label: "Year", type: "number", required: true },
    { name: "students", label: "Students (comma-separated student IDs)" },
    { name: "description", label: "Description", type: "textarea" },
  ];

  // === Handlers ===
  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditing({
      ...row,
      students: (row.students || []).join(", "),
    });
    setOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      const payload = { ...form };
      if (typeof payload.students === "string") {
        payload.students = payload.students
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      if (editing?._id) {
        await updateItem({ _id: editing._id, ...payload }).unwrap();
        toast.success("✅ Project updated successfully");
      } else {
        await createItem(payload).unwrap();
        toast.success("✅ Project added successfully");
      }
      setOpen(false);
    } catch (e) {
      toast.error(e?.data?.message || "❌ Save failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(confirm._id).unwrap();
      toast.success("🗑️ Project deleted successfully");
      setConfirm(null);
    } catch (e) {
      toast.error(e?.data?.message || "❌ Delete failed");
    }
  };

  // === Render ===
  return (
    <Container className="py-4">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-semibold mb-0">Projects</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Project
        </Button>
      </div>

      {/* ===== Table or Loading ===== */}
      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <AdminTable columns={columns} rows={data} onEdit={handleEdit} onDelete={setConfirm} />
      )}

      {/* ===== Add/Edit Modal ===== */}
      <AdminModal
        open={open}
        title={editing ? "Edit Project" : "Add Project"}
        onClose={() => setOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />

      {/* ===== Confirm Dialog ===== */}
      <ConfirmDialog
        open={!!confirm}
        title="Delete Project?"
        message={`This will permanently remove "${confirm?.title}".`}
        onCancel={() => setConfirm(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
}
