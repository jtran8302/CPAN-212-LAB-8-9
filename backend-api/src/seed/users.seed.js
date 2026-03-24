import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDatabase } from "../config/db.js";
import { User } from "../models/User.js";
import { Role } from "../models/Role.js";

async function seedUsers() {
  await connectDatabase();
  await User.deleteMany({});

  const allRoles = await Role.find({});
  const roleMap = {};
  allRoles.forEach((r) => {
    roleMap[r.name] = r._id;
  });

  const passwordHash = await bcrypt.hash("Password123!", 10);

  await User.insertMany([
    {
      username: "admin1",
      passwordHash,
      roles: [roleMap["ADMIN"]],
      accountStatus: "ACTIVE",
      profile: {
        firstName: "Victoria",
        lastName: "Clark",
        email: "admin1@example.com",
        userType: "INTERNAL",
        department: "Administration",
        jobTitle: "Platform Administrator"
      }
    },
    {
      username: "customer1",
      passwordHash,
      roles: [roleMap["CUSTOMER"]],
      accountStatus: "ACTIVE",
      profile: {
        firstName: "Emma",
        lastName: "Watson",
        email: "customer1@example.com",
        userType: "CUSTOMER",
        city: "Toronto",
        country: "Canada"
      }
    },
    {
      username: "customer2",
      passwordHash,
      roles: [roleMap["CUSTOMER"]],
      accountStatus: "ACTIVE",
      profile: {
        firstName: "James",
        lastName: "Lee",
        email: "customer2@example.com",
        userType: "CUSTOMER",
        city: "Vancouver",
        country: "Canada"
      }
    },
    {
      username: "agent1",
      passwordHash,
      roles: [roleMap["AGENT"]],
      accountStatus: "ACTIVE",
      profile: {
        firstName: "Michael",
        lastName: "Brown",
        email: "agent1@example.com",
        userType: "INTERNAL",
        department: "Sales",
        jobTitle: "Insurance Agent"
      }
    },
    {
      username: "underwriter1",
      passwordHash,
      roles: [roleMap["UNDERWRITER"]],
      accountStatus: "ACTIVE",
      profile: {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "underwriter1@example.com",
        userType: "INTERNAL",
        department: "Underwriting",
        jobTitle: "Senior Underwriter"
      }
    },
    {
      username: "adjuster1",
      passwordHash,
      roles: [roleMap["CLAIMS_ADJUSTER"]],
      accountStatus: "ACTIVE",
      profile: {
        firstName: "David",
        lastName: "Kim",
        email: "adjuster1@example.com",
        userType: "INTERNAL",
        department: "Claims",
        jobTitle: "Claims Adjuster"
      }
    }
  ]);

  console.log("Users seeded.");
  await mongoose.disconnect();
}

seedUsers().catch((error) => {
  console.error(error);
  process.exit(1);
});