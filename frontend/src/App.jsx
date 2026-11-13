import React from "react";
import { useState, useEffect, useCallback } from "react";
import * as api from "./api/employees.js";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import EmployeeDetails from "./components/EmployeeDetails.jsx";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [editing, setEditing] = useState(null); // employee being edited
  const [viewing, setViewing] = useState(null); // employee in details modal
  const [banner, setBanner] = useState(""); // success messages

  // Fetch list (re-runs when filters change, debounced below)
  const load = useCallback(async (opts) => {
    setLoading(true);
    setError("");
    try {
      const data = await api.getEmployees(opts);
      setEmployees(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search + status so we don't hammer the API on each keystroke
  useEffect(() => {
    const t = setTimeout(() => load({ search, status }), 300);
    return () => clearTimeout(t);
  }, [search, status, load]);

  const flash = (msg) => {
    setBanner(msg);
    setTimeout(() => setBanner(""), 2500);
  };

  const handleCreate = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      await api.createEmployee(payload);
      flash("Employee added.");
      await load({ search, status });
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      await api.updateEmployee(editing._id, payload);
      flash("Employee updated.");
      setEditing(null);
      await load({ search, status });
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (emp) => {
    if (!window.confirm(`Delete ${emp.name}?`)) return;
    setError("");
    try {
      await api.deleteEmployee(emp._id);
      flash("Employee deleted.");
      await load({ search, status });
    } catch (e) {
      setError(e.message);
    }
  };

  const activeCount = employees.filter((e) => e.status === "Active").length;

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Employee Management System</h1>
          <p className="muted">MERN · Admin Dashboard</p>
        </div>
        <div className="stats">
          <div className="stat">
            <span>{employees.length}</span>Total
          </div>
          <div className="stat">
            <span>{activeCount}</span>Active
          </div>
        </div>
      </header>

      <main className="container">
        {/* Create / Edit form */}
        <EmployeeForm
          initial={editing}
          submitting={submitting}
          onSubmit={editing ? handleUpdate : handleCreate}
          onCancel={() => setEditing(null)}
        />

        {/* Filters */}
        <div className="filters card">
          <input
            className="search"
            placeholder="Search by name, email, department, designation…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Banners */}
        {banner && <div className="alert success">{banner}</div>}
        {error && <div className="alert error">{error}</div>}

        {/* List */}
        {loading ? (
          <div className="card loading">Loading employees…</div>
        ) : (
          <EmployeeTable
            employees={employees}
            onView={setViewing}
            onEdit={(emp) => {
              setEditing(emp);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Details modal */}
      <EmployeeDetails employee={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}
