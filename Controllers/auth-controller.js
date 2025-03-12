const orderModel = require("../Models/OrderModel");
var User = require("../Models/UserModel");
var jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const UserModel = require("../Models/UserModel");



// REGISTRATION API

const register = async (req, res) => {
  try {
    const { fname, lname, phone, ssn, tax_id, companyname, government_identification, dob,
      email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already exists" });
    }
    const userCreate = await User.create({
      fname, lname, phone, ssn, dob,
      tax_id, companyname, government_identification, email, password, role
    });


    // Send Email Notification to Admin
    //  const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: process.env.PORTAL_EMAIL, // Admin Email
    //   subject: "New User Registration Pending Approval",
    //   text: `A new user (${email}) has signed up. Please review and enable access in the admin panel.`
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log("Error sending email:", error);
    //   } else {
    //     console.log("Email sent:", info.response);
    //   }
    // });

    // Stylish email
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.PORTAL_EMAIL, // Admin Email
      subject: "New User Registration Pending Approval",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 12px; padding: 20px; background-color: #f8f9fa; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center;">
        <img src="https://res.cloudinary.com/dprwxtty7/image/upload/v1741052992/juyn8mhv8kybkkaemyq5.svg" alt="Spring Air Network Solutions" width="150" style="margin-bottom: 20px;">
      </div>
      <h2 style="color: #007bff; text-align: center;">New User Registration Alert</h2>
      <p style="font-size: 16px; color: #333; text-align: center;">
        A new user <strong style="color: #007bff;">${email}</strong> has signed up.
      </p>
      <p style="font-size: 16px; color: #555; text-align: center;">
        Please review and enable access in the admin panel.
      </p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="https://springairns.com/admin-all-users"
          style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; display: inline-block;">
          ✅ Approve User
        </a>
      </div>
      <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 14px; color: #888; text-align: center;">This is an automated email. Please do not reply.</p>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });



    const token = jwt.sign(
      {
        userId: userCreate._id,
        email: userCreate.email,
        role: userCreate.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({ message: "User has been registered successfully" });
    // .json({ token, message: "User has been registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Login API

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials" });
    }

    const userStatus = user.isEnabled;
    // Check if user is enabled or disabled
    if (!user.isEnabled) {
      return res.status(403).json({ message: "Account not activated. Contact admin.", userStatus });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role, username: `${user.fname} ${user.lname}` },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get All Users API
const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({ email: { $ne: "admin@gmail.com" } });

    if (!allUsers) {
      return res.json({ message: "No users found" });
    }

    return res.json({ message: "here's the user data", userData: allUsers });
  } catch (error) {
    return res.json({ message: "Server error", error });
  }
};

// ENABLE, DISABLE USER API

const enableDisableUser = async (req, res) => {
  try {
    const { userId, isEnabled, partnerId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isEnabled = isEnabled;
    if (partnerId) {
      user.partnerId = partnerId; // Update partnerId if provided
    }
    await user.save();

    return res.status(200).json({ message: `User ${isEnabled ? "enabled" : "disabled"} successfully.` });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
// Check Status API = practically no use since middleware won't even hit this API if user is disabled.

const checkStatus = async (req, res) => {
  return res.json({ message: "Checking Status" });
}


// Get All Orders API
module.exports = { register, login, getUsers, enableDisableUser, checkStatus };
