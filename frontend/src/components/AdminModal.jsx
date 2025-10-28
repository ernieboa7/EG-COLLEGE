
/*
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function AdminModal({
  open,
  title,
  onClose,
  fields = [],
  initial = {},
  onSubmit,
  submitLabel = "Save",
}) {
  const [form, setForm] = useState(initial || {});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setForm(initial || {}), [initial]);

  const change = (name, value) => setForm((s) => ({ ...s, [name]: value }));

  const handleSubmit = async () => {
    // Simple front-end validation
    for (const f of fields) {
      if (f.required && !form[f.name]) {
        alert(`${f.label} is required`);
        return;
      }
    }

    try {
      setSubmitting(true);
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50"
        as="div"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") onClose();
        }}
      >
        {/* Background Overlay *
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Panel *
        <div className="fixed inset-0 grid place-items-center p-4 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold mb-4">
                {title}
              </Dialog.Title>

              {/* Form fields *
              <div className="space-y-4">
                {fields.map((f) => (
                  <div key={f.name} className="flex flex-col">
                    <label className="text-sm text-gray-700 mb-1 font-medium">
                      {f.label}
                      {f.required && <span className="text-red-500"> *</span>}
                    </label>

                    {f.type === "textarea" ? (
                      <textarea
                        value={form[f.name] ?? ""}
                        onChange={(e) => change(f.name, e.target.value)}
                        className="border rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        rows={f.rows || 3}
                        placeholder={f.placeholder}
                      />
                    ) : f.type === "number" ? (
                      <input
                        type="number"
                        value={form[f.name] ?? ""}
                        onChange={(e) => change(f.name, e.target.valueAsNumber)}
                        className="border rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder={f.placeholder}
                      />
                    ) : f.type === "select" ? (
                      <select
                        value={form[f.name] ?? ""}
                        onChange={(e) => change(f.name, e.target.value)}
                        className="border rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select...</option>
                        {f.options?.map((opt) => (
                          <option key={opt.value ?? opt} value={opt.value ?? opt}>
                            {opt.label ?? opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={form[f.name] ?? ""}
                        onChange={(e) => change(f.name, e.target.value)}
                        className="border rounded p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder={f.placeholder}
                      />
                    )}

                    {f.help && (
                      <p className="text-xs text-gray-500 mt-1">{f.help}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons *
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`px-4 py-2 rounded text-white ${
                    submitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {submitting ? "Saving..." : submitLabel}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}


*/


import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

export default function AdminModal({
  open,           // boolean to control visibility
  title,          // modal title
  onClose,        // function to close modal
  fields = [],    // array of { name, label, type, required, options }
  initial = {},   // initial form data
  onSubmit,       // async submit handler
  submitLabel = "Save",
}) {
  const [form, setForm] = useState(initial || {});
  const [submitting, setSubmitting] = useState(false);

  // Reset form when initial changes (e.g. editing a different record)
  useEffect(() => setForm(initial || {}), [initial]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple front-end validation
    for (const f of fields) {
      if (f.required && !form[f.name]) {
        alert(`${f.label} is required`);
        return;
      }
    }

    try {
      setSubmitting(true);
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={open} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {fields.map((f) => (
            <Form.Group className="mb-3" key={f.name}>
              <Form.Label>
                {f.label}
                {f.required && <span className="text-danger ms-1">*</span>}
              </Form.Label>

              {f.type === "textarea" ? (
                <Form.Control
                  as="textarea"
                  rows={f.rows || 3}
                  value={form[f.name] ?? ""}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  placeholder={f.placeholder}
                />
              ) : f.type === "select" ? (
                <Form.Select
                  value={form[f.name] ?? ""}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                >
                  <option value="">Select...</option>
                  {f.options?.map((opt) => (
                    <option key={opt.value ?? opt} value={opt.value ?? opt}>
                      {opt.label ?? opt}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={f.type || "text"}
                  value={form[f.name] ?? ""}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  placeholder={f.placeholder}
                />
              )}

              {f.help && <Form.Text muted>{f.help}</Form.Text>}
            </Form.Group>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
