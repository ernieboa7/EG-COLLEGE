import { useState } from "react";
import {
  useAdminTimetablesQuery,
  useCreateAdminTimetableMutation,
  useUpdateAdminTimetableMutation,
  useDeleteAdminTimetableMutation,
} from "../../services/api";
import AdminTable from "../../components/AdminTable";
import AdminModal from "../../components/AdminModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Button, Container, Spinner } from "react-bootstrap";

export default function Timetables() {
  const { data = [], isLoading } = useAdminTimetablesQuery();
  const [createItem] = useCreateAdminTimetableMutation();
  const [updateItem] = useUpdateAdminTimetableMutation();
  const [deleteItem] = useDeleteAdminTimetableMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // === Table Columns ===
  const columns = [
    { key: "name", header: "Name" },
    { key: "department", header: "Department" },
    {
      key: "slots",
      header: "Slots",
      render: (r) => (Array.isArray(r.slots) ? r.slots.length : 0),
    },
  ];

  // === Modal Fields ===
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "department", label: "Department" },
    {
      name: "slots",
      label: "Slots (JSON)",
      type: "textarea",
      help: `Example: [
  { "day": "Monday", "start": "09:00", "end": "10:00", "room": "A1", "code": "CSC101", "title": "Intro to CS" }
]`,
    },
  ];

  // === Handlers ===
  const handleAdd = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row) => {
    setEditing({
      ...row,
      slots: JSON.stringify(row.slots || [], null, 2),
    });
    setOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      const payload = { ...form };
      if (typeof payload.slots === "string" && payload.slots.trim()) {
        payload.slots = JSON.parse(payload.slots);
      }

      if (editing?._id) {
        await updateItem({ _id: editing._id, ...payload }).unwrap();
        toast.success(" Timetable updated successfully");
      } else {
        await createItem(payload).unwrap();
        toast.success(" Timetable added successfully");
      }

      setOpen(false);
    } catch (e) {
      toast.error(e?.data?.message || " Save failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(confirm._id).unwrap();
      toast.success(" Timetable deleted successfully");
      setConfirm(null);
    } catch (e) {
      toast.error(e?.data?.message || " Delete failed");
    }
  };

  // === Render ===
  return (
    <Container className="py-4">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-semibold mb-0">Timetables</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Timetable
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

      {/* ===== Modal for Add/Edit ===== */}
      <AdminModal
        open={open}
        title={editing ? "Edit Timetable" : "Add Timetable"}
        onClose={() => setOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />

      {/* ===== Confirm Delete ===== */}
      <ConfirmDialog
        open={!!confirm}
        title="Delete Timetable?"
        message={`This will remove "${confirm?.name}".`}
        onCancel={() => setConfirm(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
}
