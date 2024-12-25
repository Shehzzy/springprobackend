const orderModel = require("../Models/OrderModel");
const imeiModel = require('../Models/imeiModel');

// ORDER CREATION API - Post
const orderSubmit = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Order details are missing" });
    }

    const userId = req.user.userId; 
    const { imeiNumbers, ...orderData } = req.body; 

    // Validate IMEI numbers
    if (
      !imeiNumbers ||
      !Array.isArray(imeiNumbers) ||
      imeiNumbers.length === 0
    ) {
      return res.status(400).json({ message: "IMEI numbers are required" });
    }

    // Create or reference IMEI numbers
    const existingIMEIs = await imeiModel.find({
      imei: { $in: imeiNumbers },
      userId,
    });
    const existingIMEIIds = existingIMEIs.map((imei) => imei._id);

    // Create new IMEI numbers if they don't exist
    const newIMEIs = imeiNumbers.filter(
      (imei) => !existingIMEIs.some((existing) => existing.imei === imei)
    );
    const createdIMEIs = await imeiModel.insertMany(
      newIMEIs.map((imei) => ({ userId, imei }))
    );

    // Combine existing and newly created IMEI IDs
    const allIMEIIds = [
      ...existingIMEIIds,
      ...createdIMEIs.map((imei) => imei._id),
    ];

    const order = await orderModel.create({
      ...orderData,
      userId,
      imeiNumbers: allIMEIIds, // Store the IMEI IDs in the order
    });

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get All Orders API
const getOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find().populate('imeiNumbers'); // Populate the imeiNumbers field

    if (!allOrders || allOrders.length === 0) {
      return res.json({ message: "No orders found" });
    }
    return res.json({ message: "Here's the order data", orderData: allOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};


// get user imei API
const getIMEINumbers = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the user ID from the request
    const imeiNumbers = await imeiModel.find({ userId }); // Fetch IMEI numbers for the user

    res.status(200).json({
      message: "IMEI numbers retrieved successfully",
      imeiNumbers,
    });
  } catch (error) {
    console.error("Error fetching IMEI numbers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch orders and populate the imeiNumbers field
    const orders = await orderModel.find({ userId }).populate('imeiNumbers');

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Update order status API
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "In Progress", "Completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAccountNumberAlreadyExistsOrNot = async (req, res) => {};

module.exports = { orderSubmit, getUserOrders, getOrders, updateOrderStatus, getIMEINumbers };
