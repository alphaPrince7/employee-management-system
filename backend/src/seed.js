import "dotenv/config";
import { connectDB } from "./config/db.js";
import Employee from "./models/Employee.js";
import mongoose from "mongoose";

const sample = [
  { name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "9876543210", department: "Engineering", designation: "Backend Developer", joiningDate: "2024-02-15", status: "Active" },
  { name: "Priya Verma", email: "priya.verma@example.com", phone: "9811122233", department: "Design", designation: "UI/UX Designer", joiningDate: "2023-11-01", status: "Active" },
  { name: "Rahul Nair", email: "rahul.nair@example.com", phone: "9900011122", department: "Sales", designation: "Sales Associate", joiningDate: "2022-06-20", status: "Inactive" },
  { name: "Sneha Iyer", email: "sneha.iyer@example.com", phone: "9123456780", department: "Engineering", designation: "Frontend Developer", joiningDate: "2025-01-10", status: "Active" },
  { name: "Mohit Gupta", email: "mohit.gupta@example.com", phone: "9765432109", department: "HR", designation: "HR Executive", joiningDate: "2021-09-05", status: "Inactive" },
];

const run = async () => {
  await connectDB();
  await Employee.deleteMany({});
  await Employee.insertMany(sample);
  console.log(`✔ Seeded ${sample.length} employees`);
  await mongoose.connection.close();
  process.exit(0);
};

run();
