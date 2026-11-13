const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "—";

export default function EmployeeTable({ employees, onView, onEdit, onDelete }) {
  if (employees.length === 0) {
    return <div className="card empty">No employees found. Try adjusting the filters or add a new employee.</div>;
  }

  return (
    <div className="card table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Status</th>
            <th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td data-label="Name">{emp.name}</td>
              <td data-label="Email">{emp.email}</td>
              <td data-label="Department">{emp.department}</td>
              <td data-label="Designation">{emp.designation}</td>
              <td data-label="Status">
                <span className={`badge ${emp.status === "Active" ? "active" : "inactive"}`}>{emp.status}</span>
              </td>
              <td data-label="Actions" className="right">
                <button className="link" onClick={() => onView(emp)}>View</button>
                <button className="link" onClick={() => onEdit(emp)}>Edit</button>
                <button className="link danger" onClick={() => onDelete(emp)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { fmtDate };
