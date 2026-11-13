// Central API client. Base URL is relative ("/api") and proxied to the
// backend by Vite in dev. All functions throw an Error with a readable
// message on failure, so UI components can show it.

const BASE = "/api/employees";

async function request(url, options = {}) {
  let res;
  try {
    res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (networkErr) {
    throw new Error("Cannot reach the server. Is the backend running?");
  }

  let body = null;
  try {
    body = await res.json();
  } catch {
    // non-JSON response
  }

  if (!res.ok) {
    const msg =
      body?.errors?.join(", ") ||
      body?.message ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return body;
}

export function getEmployees({ search = "", status = "" } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  const qs = params.toString();
  return request(`${BASE}${qs ? `?${qs}` : ""}`).then((b) => b.data);
}

export function getEmployee(id) {
  return request(`${BASE}/${id}`).then((b) => b.data);
}

export function createEmployee(payload) {
  return request(BASE, { method: "POST", body: JSON.stringify(payload) }).then((b) => b.data);
}

export function updateEmployee(id, payload) {
  return request(`${BASE}/${id}`, { method: "PUT", body: JSON.stringify(payload) }).then((b) => b.data);
}

export function deleteEmployee(id) {
  return request(`${BASE}/${id}`, { method: "DELETE" });
}
