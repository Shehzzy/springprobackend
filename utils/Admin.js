// ADMIN REGISTRATION API - CALL BY DEFAULT

const mongoose = require("mongoose");
const userModel = require('../Models/UserModel');

const createDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "securepassword";
    const existingAdmin = await userModel.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const adminUser = new userModel({
        fname: "Super",
        lname: "Admin",
        phone: "1234567890",
        dob: "01/01/2000",
        ssn: "123456789",
        tax_id: "123456789",
        companyname: "Admin Company",
        government_identification: "123456789",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        isEnabled: true
      });
      await adminUser.save();
      console.log("Default admin created:", adminEmail);
    } else {
      console.log("Admin already exists:", adminEmail);
    }
  } catch (error) {
    console.error("Error creating default admin:", error);
  }
};

module.exports = createDefaultAdmin;
