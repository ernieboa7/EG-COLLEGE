// src/components/AdminTable.jsx
import { Table, Button } from "react-bootstrap";

export default function AdminTable({ columns = [], rows = [], onEdit, onDelete }) {
  return (
    <div className="table-responsive bg-white border rounded shadow-sm">
      <Table bordered hover responsive size="sm" className="align-middle mb-0">
        <thead className="table-primary text-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="fw-semibold">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th className="fw-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows?.length > 0 ? (
            rows.map((row, idx) => (
              <tr key={row._id || row.id || idx}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td>
                    {onEdit && (
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => onEdit(row)}
                      >
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(row)}
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={
                  (columns?.length || 0) + (onEdit || onDelete ? 1 : 0)
                }
                className="text-center text-muted fst-italic py-3"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
