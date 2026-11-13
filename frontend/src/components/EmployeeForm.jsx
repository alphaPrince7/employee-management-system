import { useState, useEffect } from "react";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  joiningDate: "",
  status: "Active",
};

// Format an ISO date string to yyyy-mm-dd for <input type="date">
const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export default function EmployeeForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(EMPTY);
  const [clientError, setClientError] = useState("");

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        email: initial.email || "",
        phone: initial.phone || "",
        department: initial.department || "",
        designation: initial.designation || "",
        joiningDate: toDateInput(initial.joiningDate),
        status: initial.status || "Active",
      });
    } else {
      setForm(EMPTY);
    }
    setClientError("");
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // lightweight client-side validation (server validates authoritatively)
    if (!form.name || !form.email || !form.phone || !form.department || !form.designation || !form.joiningDate) {
      setClientError("Please fill in all required fields.");
      return;
    }
    setClientError("");
    onSubmit(form);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{initial ? "Edit Employee" : "Add Employee"}</h2>

      {clientError && <div className="alert error">{clientError}</div>}

      <div className="grid">
        <label>
          Name *
          <input name="name" value={form.name} onChange={change} placeholder="Full name" />
        </label>
        <label>
          Email *
          <input name="email" type="email" value={form.email} onChange={change} placeholder="name@company.com" />
        </label>
        <label>
          Phone *
          <input name="phone" value={form.phone} onChange={change} placeholder="9876543210" />
        </label>
        <label>
          Department *
          <input name="department" value={form.department} onChange={change} placeholder="Engineering" />
        </label>
        <label>
          Designation *
          <input name="designation" value={form.designation} onChange={change} placeholder="Backend Developer" />
        </label>
        <label>
          Joining Date *
          <input name="joiningDate" type="date" value={form.joiningDate} onChange={change} />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={change}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>

      <div className="actions">
        <button type="submit" className="btn primary" disabled={submitting}>
          {submitting ? "Saving…" : initial ? "Update Employee" : "Add Employee"}
        </button>
        {initial && (
          <button type="button" className="btn ghost" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
