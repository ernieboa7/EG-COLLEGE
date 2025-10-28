// src/pages/admin/Departments.jsx
/*

import { useState } from "react";
import {
  
  useAdminDepartmentsQuery,
  useCreateAdminDepartmentMutation,
  useUpdateAdminDepartmentMutation,
  useDeleteAdminDepartmentMutation,
} from "../../services/api";
import AdminTable from "../../components/AdminTable";
import AdminModal from "../../components/AdminModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";

export default function Departments() {
  const { data = [], isLoading } = useAdminDepartmentsQuery(); // ✅ updated alias
  const [createItem] = useCreateAdminDepartmentMutation();
  const [updateItem] = useUpdateAdminDepartmentMutation();
  const [deleteItem] = useDeleteAdminDepartmentMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "head", header: "Head" },
    { key: "building", header: "Building" },
    { key: "email", header: "Email" },
  ];

  const fields = [
    { name: "id", label: "ID (number)", type: "number", required: true },
    { name: "name", label: "Name", required: true },
    { name: "head", label: "Head" },
    { name: "building", label: "Building" },
    { name: "email", label: "Email" },
  ];

  const onAdd = () => {
    setEditing(null);
    setOpen(true);
  };
  const onEdit = (row) => {
    setEditing(row);
    setOpen(true);
  };
  const onDelete = (row) => setConfirm(row);

  const handleSubmit = async (form) => {
    try {
      if (editing?._id) {
        await updateItem({ _id: editing._id, ...form }).unwrap();
        toast.success("Department updated");
      } else {
        await createItem(form).unwrap();
        toast.success("Department created");
      }
      setOpen(false);
    } catch (e) {
      toast.error(e?.data?.message || "Save failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteItem(confirm._id).unwrap();
      toast.success("Department deleted");
      setConfirm(null);
    } catch (e) {
      toast.error(e?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Departments</h1>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Department
        </button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <AdminTable
          columns={columns}
          rows={data}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      <AdminModal
        open={open}
        title={editing ? "Edit Department" : "Add Department"}
        initial={editing || {}}
        fields={fields}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />

      <ConfirmDialog
        open={!!confirm}
        title="Delete Department?"
        message={`This will remove ${confirm?.name}.`}
        onCancel={() => setConfirm(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

*/

import { useState } from "react";
import {
  useAdminDepartmentsQuery,
  useCreateAdminDepartmentMutation,
  useUpdateAdminDepartmentMutation,
  useDeleteAdminDepartmentMutation,
} from "../../services/api";
import AdminTable from "../../components/AdminTable";
import AdminModal from "../../components/AdminModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Button, Container, Spinner } from "react-bootstrap";

export default function Departments() {
  const { data = [], isLoading } = useAdminDepartmentsQuery();
  const [createItem] = useCreateAdminDepartmentMutation();
  const [updateItem] = useUpdateAdminDepartmentMutation();
  const [deleteItem] = useDeleteAdminDepartmentMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // === Table Columns ===
  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "head", header: "Head" },
    { key: "building", header: "Building" },
    { key: "email", header: "Email" },
  ];

  // === Modal Fields ===
  const fields = [
    { name: "id", label: "ID (number)", type: "number", required: true },
    { name: "name", label: "Name", required: true },
    { name: "head", label: "Head" },
    { name: "building", label: "Building" },
    { name: "email", label: "Email" },
  ];

  // === CRUD Logic ===
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
        toast.success("✅ Department updated successfully");
      } else {
        await createItem(form).unwrap();
        toast.success("✅ Department created successfully");
      }
      setOpen(false);
    } catch (e) {
      toast.error(e?.data?.message || "❌ Save failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(confirm._id).unwrap();
      toast.success("🗑️ Department deleted successfully");
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
        <h3 className="text-primary fw-semibold mb-0">Departments</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Department
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
        title={editing ? "Edit Department" : "Add Department"}
        onClose={() => setOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />

      {/* ===== Confirm Dialog ===== */}
      <ConfirmDialog
        open={!!confirm}
        title="Delete Department?"
        message={`This will permanently remove "${confirm?.name}".`}
        onCancel={() => setConfirm(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
}
