import { useState } from "react";
import {
  useAdminLibraryQuery,
  useCreateAdminLibraryMutation,
  useUpdateAdminLibraryMutation,
  useDeleteAdminLibraryMutation,
} from "../../services/api";
import AdminTable from "../../components/AdminTable";
import AdminModal from "../../components/AdminModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Button, Container, Spinner } from "react-bootstrap";

export default function Library() {
  const { data = [], isLoading } = useAdminLibraryQuery();
  const [createItem] = useCreateAdminLibraryMutation();
  const [updateItem] = useUpdateAdminLibraryMutation();
  const [deleteItem] = useDeleteAdminLibraryMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // === Table Columns ===
  const columns = [
    { key: "id", header: "ID" },
    { key: "title", header: "Title" },
    { key: "author", header: "Author" },
    { key: "isbn", header: "ISBN" },
    { key: "department", header: "Department" },
    { key: "edition", header: "Edition" },
    { key: "availableCopies", header: "Copies" },
  ];

  // === Modal Fields ===
  const fields = [
    { name: "id", label: "ID (number)", type: "number", required: true },
    { name: "title", label: "Title", required: true },
    { name: "author", label: "Author", required: true },
    { name: "isbn", label: "ISBN (unique)", required: true },
    { name: "department", label: "Department", required: true },
    { name: "edition", label: "Edition", required: true },
    { name: "availableCopies", label: "Available Copies", type: "number", required: true },
    { name: "tags", label: "Tags (comma-separated)" },
  ];

  // === Add / Edit Handlers ===
  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditing({ ...row, tags: (row.tags || []).join(", ") });
    setOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      const payload = { ...form };
      if (typeof payload.tags === "string") {
        payload.tags = payload.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      if (editing?._id) {
        await updateItem({ _id: editing._id, ...payload }).unwrap();
        toast.success("✅ Book updated successfully");
      } else {
        await createItem(payload).unwrap();
        toast.success("✅ Book added successfully");
      }

      setOpen(false);
    } catch (e) {
      toast.error(e?.data?.message || "❌ Save failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(confirm._id).unwrap();
      toast.success("🗑️ Book deleted successfully");
      setConfirm(null);
    } catch (e) {
      toast.error(e?.data?.message || "❌ Delete failed");
    }
  };

  // === UI Render ===
  return (
    <Container className="py-4">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-semibold mb-0">Library</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Book
        </Button>
      </div>

      {/* ===== Table or Loader ===== */}
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
        title={editing ? "Edit Book" : "Add Book"}
        onClose={() => setOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />

      {/* ===== Confirm Delete Dialog ===== */}
      <ConfirmDialog
        open={!!confirm}
        title="Delete Book?"
        message={`This will remove "${confirm?.title}".`}
        onCancel={() => setConfirm(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
}
