import { fmtDate } from "./EmployeeTable.jsx";

// Modal showing a single employee's full details.
export default function EmployeeDetails({ employee, onClose }) {
  if (!employee) return null;

  const rows = [
    ["Name", employee.name],
    ["Email", employee.email],
    ["Phone", employee.phone],
    ["Department", employee.department],
    ["Designation", employee.designation],
    ["Joining Date", fmtDate(employee.joiningDate)],
    ["Status", employee.status],
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Employee Details</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <dl className="details">
          {rows.map(([label, value]) => (
            <div className="detail-row" key={label}>
              <dt>{label}</dt>
              <dd>
                {label === "Status" ? (
                  <span className={`badge ${value === "Active" ? "active" : "inactive"}`}>{value}</span>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className="actions">
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
