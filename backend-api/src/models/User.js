import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: String },
    email: { type: String, required: true, trim: true, unique: true },
    phone: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    province: { type: String },
    postalCode: { type: String },
    country: { type: String },
    customerNumber: { type: String },
    employeeNumber: { type: String },
    userType: { type: String, required: true },
    preferredContactMethod: { type: String },
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    department: { type: String },
    jobTitle: { type: String },
    supervisorName: { type: String }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    accountStatus: { type: String, required: true, default: "ACTIVE" },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    profile: { type: userProfileSchema, required: true }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);