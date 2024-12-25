const orderModel = require("../Models/OrderModel");
var User = require("../Models/UserModel");
var jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");



// REGISTRATION API

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already exists" });
    }
    const userCreate = await User.create({ fullName, email, password, role });
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
      .json({ token, message: "User has been registered successfully" });
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

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
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


// Get All Orders API
module.exports = { register, login, getUsers};
