import Employee from "../models/Employee.js";

/**
 * Small async wrapper so we don't repeat try/catch in every handler.
 * Any thrown/rejected error is forwarded to the central errorHandler.
 */
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @route   POST /api/employees
 * @desc    Add a new employee
 */
export const createEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.create(req.body);
  res.status(201).json({ success: true, message: "Employee created", data: employee });
});

/**
 * @route   GET /api/employees
 * @desc    Get all employees. Supports ?search= and ?status= filters.
 */
export const getEmployees = asyncHandler(async (req, res) => {
  const { search, status } = req.query;
  const filter = {};

  if (status && ["Active", "Inactive"].includes(status)) {
    filter.status = status;
  }

  if (search) {
    const rx = new RegExp(search.trim(), "i"); // case-insensitive
    filter.$or = [
      { name: rx },
      { email: rx },
      { department: rx },
      { designation: rx },
    ];
  }

  const employees = await Employee.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: employees.length, data: employees });
});

/**
 * @route   GET /api/employees/:id
 * @desc    Get a single employee by id
 */
export const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) {
    return res.status(404).json({ success: false, message: "Employee not found" });
  }
  res.json({ success: true, data: employee });
});

/**
 * @route   PUT /api/employees/:id
 * @desc    Update an employee
 */
export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // enforce schema rules on update too
  });
  if (!employee) {
    return res.status(404).json({ success: false, message: "Employee not found" });
  }
  res.json({ success: true, message: "Employee updated", data: employee });
});

/**
 * @route   DELETE /api/employees/:id
 * @desc    Delete an employee
 */
export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);
  if (!employee) {
    return res.status(404).json({ success: false, message: "Employee not found" });
  }
  res.json({ success: true, message: "Employee deleted", data: { id: req.params.id } });
});
