import { useState } from "react";
import {
  useAdminResultsQuery,
  useCreateAdminResultMutation,
  useUpdateAdminResultMutation,
  useDeleteAdminResultMutation,
} from "../../services/api";
import AdminTable from "../../components/AdminTable";
import AdminModal from "../../components/AdminModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Button, Container, Spinner } from "react-bootstrap";

export default function Results() {
  const { data = [], isLoading } = useAdminResultsQuery();
  const [createItem] = useCreateAdminResultMutation();
  const [updateItem] = useUpdateAdminResultMutation();
  const [deleteItem] = useDeleteAdminResultMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // === Table Columns ===
  const columns = [
    { key: "studentId", header: "Student ID" },
    { key: "courseCode", header: "Course" },
    { key: "term", header: "Term" },
    { key: "score", header: "Score" },
    { key: "grade", header: "Grade" },
  ];

  // === Modal Fields ===
  const fields = [
    { name: "studentId", label: "Student ID", required: true },
    { name: "courseCode", label: "Course Code", required: true },
    { name: "term", label: "Term (e.g. 2024/Term1)", required: true },
    { name: "score", label: "Score (0–100)", type: "number", required: true },
    { name: "grade", label: "Grade (optional override)" },
  ];

  // === Handlers ===
  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (editing?._id) {
        await updateItem({ _id: editing._id, ...form }).unwrap();
        toast.success("✅ Result updated successfully");
      } else {
        await createItem(form).unwrap();
        toast.success("✅ Result added successfully");
      }
      setOpen(false);
    } catch (e) {
      toast.error(e?.data?.message || "❌ Failed to save result");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(confirm._id).unwrap();
      toast.success("🗑️ Result deleted successfully");
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
        <h3 className="text-primary fw-semibold mb-0">Results</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Result
        </Button>
      </div>

      {/* ===== Loader or Table ===== */}
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
        title={editing ? "Edit Result" : "Add Result"}
        onClose={() => setOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />

      {/* ===== Confirm Delete ===== */}
      <ConfirmDialog
        open={!!confirm}
        title="Delete Result?"
        message={`This will remove result for "${confirm?.courseCode}" — Student: ${confirm?.studentId}.`}
        onCancel={() => setConfirm(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
}
