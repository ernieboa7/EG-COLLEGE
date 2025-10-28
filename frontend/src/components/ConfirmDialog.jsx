// src/components/ConfirmDialog.jsx
import { Modal, Button } from "react-bootstrap";

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  onCancel,
  onConfirm,
  confirmLabel = "Delete",
  confirmVariant = "danger",
}) {
  return (
    <Modal show={open} onHide={onCancel} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-semibold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
