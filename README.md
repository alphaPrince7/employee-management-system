# Employee Management System (MERN)

A basic Employee Management System where an admin can manage employee records through a responsive dashboard. Built with **MongoDB, Express.js, React.js, and Node.js**.

> BMDU Technical Assessment · Prince Sharma

---

## Features

**Frontend (React + Vite)**
- Clean, responsive admin dashboard (collapses to cards on mobile)
- Employee table with status badges
- Add / Edit employee form (one form, both modes)
- Search (name, email, department, designation) + status filter (Active/Inactive)
- Employee details view (modal)
- Loading states, success banners, and API error handling

**Backend (Express + MongoDB)**
- REST API with full CRUD
- Mongoose schema-level validation
- Centralized error handling (400 validation, 404 not found, 409 duplicate email)
- Search + status query filters
- CORS + health-check endpoint

---

## Project structure

```
employee-management-system/
├── backend/
│   ├── src/
│   │   ├── config/db.js            # MongoDB connection
│   │   ├── models/Employee.js      # Employee schema + validation
│   │   ├── controllers/            # Business logic (CRUD)
│   │   ├── routes/                 # /api/employees routes
│   │   ├── middleware/             # Central error handler
│   │   ├── seed.js                 # Optional: seed sample data
│   │   ├── app.js                  # Express app
│   │   └── server.js               # Entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/employees.js        # API client
│   │   ├── components/             # Form, Table, Details
│   │   ├── App.jsx                 # Dashboard
│   │   └── index.css               # Responsive styles
│   ├── vite.config.js              # Dev proxy to backend
│   └── package.json
├── screenshots/
└── README.md
```

---

## Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** running locally (`mongodb://127.0.0.1:27017`) **or** a MongoDB Atlas connection string

---

## Setup & Run

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env          # then edit .env if needed
# (optional) load 5 sample employees:
npm run seed
npm run dev                   # starts on http://localhost:5000
```

`.env` values:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ems
CLIENT_ORIGIN=http://localhost:5173
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                   # starts on http://localhost:5173
```

Open **http://localhost:5173**. The frontend proxies `/api` calls to the backend (configured in `vite.config.js`), so no CORS setup is needed in development.

---

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint             | Description                           |
|--------|----------------------|---------------------------------------|
| GET    | `/health`            | Health check                          |
| GET    | `/employees`         | Get all employees (`?search=` `?status=`) |
| GET    | `/employees/:id`     | Get one employee                      |
| POST   | `/employees`         | Add employee                          |
| PUT    | `/employees/:id`     | Update employee                       |
| DELETE | `/employees/:id`     | Delete employee                       |

### Employee schema
| Field        | Type   | Rules                                  |
|--------------|--------|----------------------------------------|
| name         | String | required, 2–80 chars                   |
| email        | String | required, valid email, unique          |
| phone        | String | required, 7–15 digits (optional `+`)   |
| department   | String | required                               |
| designation  | String | required                               |
| joiningDate  | Date   | required                               |
| status       | String | `Active` or `Inactive` (default Active)|

### Example: create an employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aarav Sharma",
    "email": "aarav@example.com",
    "phone": "9876543210",
    "department": "Engineering",
    "designation": "Backend Developer",
    "joiningDate": "2024-02-15",
    "status": "Active"
  }'
```

### Response shape
```json
// success
{ "success": true, "data": { ... } }
// list
{ "success": true, "count": 5, "data": [ ... ] }
// error
{ "success": false, "message": "Validation failed", "errors": ["Email is required"] }
```

---

## Testing the CRUD flow

1. Start backend + frontend (and `npm run seed` for sample data).
2. **Create**: fill the Add Employee form → submit → row appears.
3. **Read**: use search box / status filter → list updates (debounced).
4. **View**: click *View* → details modal.
5. **Update**: click *Edit* → form pre-fills → change a field → *Update*.
6. **Delete**: click *Delete* → confirm → row removed.

Error/loading states are handled: stop the backend and reload to see the "Cannot reach the server" message; slow networks show "Loading employees…".

---

## Screenshots

See the `screenshots/` folder:
- `01-dashboard.png` — main dashboard (form + filters + table)
- `02-details.png` — employee details modal
- `03-search-filter.png` — search/filter in action
- `04-mobile.png` — responsive mobile layout

---

## Tech Stack

- **Frontend:** React 18, Vite
- **Backend:** Node.js, Express 4
- **Database:** MongoDB with Mongoose 8
