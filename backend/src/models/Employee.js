import mongoose from "mongoose";

/**
 * Employee schema — fields required by the assessment:
 * name, email, phone, department, designation, joiningDate, status.
 * Validation lives here so the DB layer is the single source of truth.
 */
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name must be at most 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      // 7–15 digits, optional leading +
      match: [/^\+?[0-9]{7,15}$/, "Please provide a valid phone number (7-15 digits)"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Status must be either Active or Inactive",
      },
      default: "Active",
    },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

export default mongoose.model("Employee", employeeSchema);
