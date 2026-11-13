/**
 * Centralized error handling. Converts common Mongoose errors into
 * clean HTTP responses so controllers stay focused on the happy path.
 */

// 404 for unmatched routes
export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

// Global error handler (must have 4 args for Express to recognize it)
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors;

  // Mongoose validation error -> 400 with field messages
  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => e.message);
  }

  // Invalid ObjectId -> 400
  if (err.name === "CastError") {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Duplicate key (e.g. email already exists) -> 409
  if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `An employee with this ${field} already exists`;
  }

  res.status(status).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  });
};
