// src/pages/admin/Committees.jsx
/*

import { useState } from "react";
import {
               // ✅ fixed alias name
  useCreateAdminCommitteeMutation,
  useUpdateAdminCommitteeMutation,
  useDeleteAdminCommitteeMutation,
  useAdminCommitteesQuery,
} from "../../services/api";
import AdminTable from "../../components/AdminTable";
import AdminModal from "../../components/AdminModal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";

export default function Committees() {
  const { data = [], isLoading } = useAdminCommitteesQuery(); // ✅ fixed alias
  const [createItem] = useCreateAdminCommitteeMutation();
  const [updateItem] = useUpdateAdminCommitteeMutation();
  const [deleteItem] = useDeleteAdminCommitteeMutation();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const columns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "chairperson", header: "Chairperson" },
    { key: "members", header: "Members", render: (r) => (r.members || []).length },
    { key: "objective", header: "Objective" },
  ];

  const fields = [
    { name: "id", label: "ID (number)", type: "number", required: true },
    { name: "name", label: "Name", required: true },
    { name: "chairperson", label: "Chairperson", required: true },
    { name: "members", label: "Members (comma-separated names)" },
    { name: "objective", label: "Objective", type: "textarea", required: true },
  ];

  const onAdd = () => {
    setEditing(null);
    setOpen(true);
  };
  const onEdit = (row) => {
    setEditing({ ...row, members: (row.members || []).join(", ") });
    setOpen(true);
  };
  const onDelete = (row) => setConfirm(row);

  const handleSubmit = async (form) => {
    try {
      const payload = { ...form };
      if (typeof payload.members === "string")
        payload.members = payload.members
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

      if (editing?._id) {
        await updateItem({ _id: editing._id, ...payload }).unwrap();
        toast.success("Committee updated");
      } else {
        await createItem(payload).unwrap();
        toast.success("Committee created");
      }
      setOpen(false);
    } catch (e) {
      toast.error(e?.data?.message || "Save failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteItem(confirm._id).unwrap();
      toast.success("Committee deleted");
      setConfirm(null);
    } catch (e) {
      toast.error(e?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Committees</h1>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Committee
        </button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <AdminTable columns={columns} rows={data} onEdit={onEdit} onDelete={onDelete} />
      )}

      <AdminModal
        open={open}
        title={editing ? "Edit Committee" : "Add Committee"}
        initial={editing || {}}
        fields={fields}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />

      <ConfirmDialog
        open={!!confirm}
        title="Delete Committee?"
        message={`This will remove "${confirm?.name}".`}
        onCancel={() => setConfirm(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

*/

import React, { useState, useEffect } from "react";
import {
  useAdminCommitteesQuery,
  useCreateAdminCommitteeMutation,
  useUpdateAdminCommitteeMutation,
  useDeleteAdminCommitteeMutation,
} from "../../services/api";
import { Table, Button, Spinner, Container } from "react-bootstrap";
import AdminModal from "../../components/AdminModal";
import toast from "react-hot-toast";

export default function Committees() {
  // === RTK Query Hooks ===
  const { data: committees = [], isLoading, isFetching } = useAdminCommitteesQuery();
  const [createCommittee] = useCreateAdminCommitteeMutation();
  const [updateCommittee] = useUpdateAdminCommitteeMutation();
  const [deleteCommittee] = useDeleteAdminCommitteeMutation();

  // === Local States ===
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // === Auto-hide toast cleanup ===
  useEffect(() => {
    const timer = setTimeout(() => toast.dismiss(), 4000);
    return () => clearTimeout(timer);
  }, []);

  // === Modal Field Definitions ===
  const fields = [
    { name: "id", label: "Committee ID", type: "number", required: true },
    { name: "name", label: "Name", required: true },
    { name: "chairperson", label: "Chairperson", required: true },
    {
      name: "members",
      label: "Members (comma-separated names)",
      placeholder: "John, Mary, Alex",
    },
    { name: "objective", label: "Objective", type: "textarea", required: true },
  ];

  // === Add / Edit Logic ===
  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (committee) => {
    setEditing({
      ...committee,
      members: committee.members ? committee.members.join(", ") : "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      // Convert comma-separated string → array
      const payload = {
        ...form,
        members: form.members
          ? form.members.split(",").map((m) => m.trim()).filter(Boolean)
          : [],
      };

      if (editing?._id) {
        await updateCommittee({ _id: editing._id, ...payload }).unwrap();
        toast.success("✅ Committee updated successfully");
      } else {
        await createCommittee(payload).unwrap();
        toast.success("✅ Committee added successfully");
      }

      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "❌ Failed to save committee");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this committee?")) return;
    try {
      await deleteCommittee(id).unwrap();
      toast.success("🗑️ Committee deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "❌ Failed to delete committee");
    }
  };

  // === UI ===
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-semibold">Committees</h3>
        <Button variant="primary" onClick={handleAdd}>
          + Add Committee
        </Button>
      </div>

      {isLoading || isFetching ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : committees.length === 0 ? (
        <p>No committees found.</p>
      ) : (
        <Table bordered hover responsive size="sm" className="align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Chairperson</th>
              <th>Members</th>
              <th>Objective</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {committees.map((c) => (
              <tr key={c._id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.chairperson}</td>
                <td>{(c.members || []).join(", ")}</td>
                <td>{c.objective}</td>
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
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Admin Modal for Add/Edit */}
      <AdminModal
        open={modalOpen}
        title={editing ? "Edit Committee" : "Add Committee"}
        onClose={() => setModalOpen(false)}
        fields={fields}
        initial={editing || {}}
        onSubmit={handleSubmit}
        submitLabel={editing ? "Update" : "Create"}
      />
    </Container>
  );
}
