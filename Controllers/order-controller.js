// const orderModel = require("../Models/OrderModel");
// const imeiModel = require('../Models/imeiModel');

// // ORDER CREATION API - Post
// const orderSubmit = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Order details are missing" });
//     }

//     const userId = req.user.userId;
//     const { imeiNumbers, ...orderData } = req.body;

//     // Validate IMEI numbers
//     if (
//       !imeiNumbers ||
//       !Array.isArray(imeiNumbers) ||
//       imeiNumbers.length === 0
//     ) {
//       return res.status(400).json({ message: "IMEI numbers are required" });
//     }

//     // Create or reference IMEI numbers
//     const existingIMEIs = await imeiModel.find({
//       imei: { $in: imeiNumbers },
//       userId,
//     });
//     const existingIMEIIds = existingIMEIs.map((imei) => imei._id);

//     // Create new IMEI numbers if they don't exist
//     const newIMEIs = imeiNumbers.filter(
//       (imei) => !existingIMEIs.some((existing) => existing.imei === imei)
//     );
//     const createdIMEIs = await imeiModel.insertMany(
//       newIMEIs.map((imei) => ({ userId, imei }))
//     );

//     // Combine existing and newly created IMEI IDs
//     const allIMEIIds = [
//       ...existingIMEIIds,
//       ...createdIMEIs.map((imei) => imei._id),
//     ];

//     const order = await orderModel.create({
//       ...orderData,
//       userId,
//       imeiNumbers: allIMEIIds, // Store the IMEI IDs in the order
//     });

//     return res
//       .status(201)
//       .json({ message: "Order created successfully", order });
//   } catch (error) {
//     console.error("Order creation error:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };

// // Get All Orders API
// const getOrders = async (req, res) => {
//   try {
//     const allOrders = await orderModel.find().populate('imeiNumbers'); // Populate the imeiNumbers field

//     if (!allOrders || allOrders.length === 0) {
//       return res.json({ message: "No orders found" });
//     }
//     return res.json({ message: "Here's the order data", orderData: allOrders });
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };

// // get user imei API
// const getIMEINumbers = async (req, res) => {
//   try {
//     const userId = req.user.userId; // Get the user ID from the request
//     const imeiNumbers = await imeiModel.find({ userId }); // Fetch IMEI numbers for the user

//     res.status(200).json({
//       message: "IMEI numbers retrieved successfully",
//       imeiNumbers,
//     });
//   } catch (error) {
//     console.error("Error fetching IMEI numbers:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user.userId;

//     // Fetch orders and populate the imeiNumbers field
//     const orders = await orderModel.find({ userId }).populate('imeiNumbers');

//     res.status(200).json({
//       message: "Orders retrieved successfully",
//       orders,
//     });
//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// // Update order status API
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const allowedStatuses = ["Pending", "In Progress", "Completed"];
//     if (!allowedStatuses.includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const order = await orderModel.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({
//       message: "Order status updated successfully",
//       order,
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const checkAccountNumberAlreadyExistsOrNot = async (req, res) => {};

// module.exports = { orderSubmit, getUserOrders, getOrders, updateOrderStatus, getIMEINumbers };

const orderModel = require("../Models/OrderModel");
const imeiModel = require("../Models/imeiModel");
const customerModel = require("../Models/CustomerModel"); // Import the Customer model
const CustomerModel = require("../Models/CustomerModel");

// ORDER CREATION API - Post
// const orderSubmit = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Order details are missing" });
//     }

//     const userId = req.user.userId;
//     const { imeiNumbers, customerData, ...orderData } = req.body;

//     // Validate IMEI numbers
//     if (
//       !imeiNumbers ||
//       !Array.isArray(imeiNumbers) ||
//       imeiNumbers.length === 0
//     ) {
//       return res.status(400).json({ message: "IMEI numbers are required" });
//     }

//     // Validate and create or reference customer data
//     let customer = null; // Start with null for customer

//     if (customerData) {
//       customer = await customerModel.findOne({ taxid: customerData.taxid });

//       if (!customer) {
//         // Create new customer if it doesn't exist
//         customer = await customerModel.create({...customerData, agentId: userId });
//       }
//     }

//     console.log(customer);

//     // Create or reference IMEI numbers
//     const existingIMEIs = await imeiModel.find({
//       imei: { $in: imeiNumbers },
//       userId,
//     });

//     const existingIMEIIds = existingIMEIs.map((imei) => imei._id);

//     // Create new IMEI numbers if they don't exist
//     const newIMEIs = imeiNumbers.filter(
//       (imei) => !existingIMEIs.some((existing) => existing.imei === imei)
//     );
//     const createdIMEIs = await imeiModel.insertMany(
//       newIMEIs.map((imei) => ({ userId, imei }))
//     );

//     // Combine existing and newly created IMEI IDs
//     const allIMEIIds = [
//       ...existingIMEIIds,
//       ...createdIMEIs.map((imei) => imei._id),
//     ];

//     // Create the order
//     const order = await orderModel.create({
//       ...orderData,
//       userId,
//       customerId: customer ? customer._id : null, // Ensure valid customerId or null
//       imeiNumbers: allIMEIIds, // Store the IMEI IDs in the order
//     });

//     return res
//       .status(201)
//       .json({ message: "Order created successfully", order });
//   } catch (error) {
//     console.error("Order creation error:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };

// ORDER CREATION API - Post 2
// const orderSubmit = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Order details are missing" });
//     }

//     const userId = req.user.userId; // Assuming user ID is available in req.user
//     const { imeiNumbers, customerData, carrierInfos, ...orderData } = req.body; // Destructure carrierInfos

//     // Validate IMEI numbers
//     if (!imeiNumbers || !Array.isArray(imeiNumbers) || imeiNumbers.length === 0) {
//       return res.status(400).json({ message: "IMEI numbers are required" });
//     }

//     // Validate and create or reference customer data
//     let customer = null; // Start with null for customer

//     if (customerData) {
//       customer = await customerModel.findOne({ taxid: customerData.taxid });

//       if (!customer) {
//         // Create new customer if it doesn't exist
//         customer = await customerModel.create({ ...customerData, agentId: userId });
//       }
//     }

//     // Create or reference IMEI numbers
//     const existingIMEIs = await imeiModel.find({
//       imei: { $in: imeiNumbers },
//       userId,
//     });

//     const existingIMEIIds = existingIMEIs.map((imei) => imei._id);

//     // Create new IMEI numbers if they don't exist
//     const newIMEIs = imeiNumbers.filter(
//       (imei) => !existingIMEIs.some((existing) => existing.imei === imei)
//     );
//     const createdIMEIs = await imeiModel.insertMany(
//       newIMEIs.map((imei) => ({ userId, imei }))
//     );

//     // Combine existing and newly created IMEI IDs
//     const allIMEIIds = [
//       ...existingIMEIIds,
//       ...createdIMEIs.map((imei) => imei._id),
//     ];

//     // Create the order
//     const order = await orderModel.create({
//       ...orderData,
//       userId,
//       customerId: customer ? customer._id : null, // Ensure valid customerId or null
//       imeiNumbers: allIMEIIds, // Store the IMEI IDs in the order
//       carrierInfos: carrierInfos, // Store the carrier information
//     });

//     return res.status(201).json({ message: "Order created successfully", order });
//   } catch (error) {
//     console.error("Order creation error:", error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// };
// ,akinf changes
const orderSubmit = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Order details are missing" });
    }

    const userId = req.user.userId; // Assuming user ID is available in req.user
    const {
      imeiNumbers,
      customerData,
      carrierInfos,
      accountFields,
      phoneNumbers,
      shippingAddresses,
      ...orderData
    } = req.body;

    console.log(accountFields, "Account fields are here");
    console.log(customerData, "Customer Data is here");

    // Validate IMEI numbers
    if (
      !imeiNumbers ||
      !Array.isArray(imeiNumbers) ||
      imeiNumbers.length === 0
    ) {
      return res.status(400).json({ message: "IMEI numbers are required" });
    }

    // Check if customerData is provided
    let customer = null;
    if (customerData) {
      // Find the existing customer by taxid
      customer = await customerModel.findOne({ taxid: customerData.taxid });

      if (customer) {
        // If the customer exists, compare the relevant fields (e.g., business address, contact info, etc.)
        const fieldsToUpdate = {};

        // Compare fields and prepare for update if necessary
        if (customer.businesslegalname !== customerData.businesslegalname) {
          fieldsToUpdate.businesslegalname = customerData.businesslegalname;
        }
        if (customer.businessaddress !== customerData.businessaddress) {
          fieldsToUpdate.businessaddress = customerData.businessaddress;
        }
        if (customer.businesscity !== customerData.businesscity) {
          fieldsToUpdate.businesscity = customerData.businesscity;
        }
        if (customer.businessstate !== customerData.businessstate) {
          fieldsToUpdate.businessstate = customerData.businessstate;
        }
        if (customer.businesszip !== customerData.businesszip) {
          fieldsToUpdate.businesszip = customerData.businesszip;
        }
        if (customer.contactname !== customerData.contactname) {
          fieldsToUpdate.contactname = customerData.contactname;
        }
        if (customer.contactphone !== customerData.contactphone) {
          fieldsToUpdate.contactphone = customerData.contactphone;
        }
        if (customer.contactemail !== customerData.contactemail) {
          fieldsToUpdate.contactemail = customerData.contactemail;
        }
        if (customer.shippingaddress !== customerData.shippingaddress) {
          fieldsToUpdate.shippingaddress = customerData.shippingaddress;
        }
        if (customer.shippingcity !== customerData.shippingcity) {
          fieldsToUpdate.shippingcity = customerData.shippingcity;
        }
        if (customer.shippingstate !== customerData.shippingstate) {
          fieldsToUpdate.shippingstate = customerData.shippingstate;
        }
        if (customer.shippingzip !== customerData.shippingzip) {
          fieldsToUpdate.shippingzip = customerData.shippingzip;
        }

        // If there are fields to update, update the customer
        if (Object.keys(fieldsToUpdate).length > 0) {
          customer = await customerModel.findByIdAndUpdate(
            customer._id,
            { $set: fieldsToUpdate },
            { new: true } // Return the updated customer
          );
          console.log("Customer updated:", customer);
        }
      } else {
        // If no customer exists with the given taxid, create a new customer
        customer = await customerModel.create({
          ...customerData,
          agentId: userId, // Associate with the user
        });
        console.log("Customer created:", customer);
      }
    }

    // Create or reference IMEI numbers
    const existingIMEIs = await imeiModel.find({
      imei: { $in: imeiNumbers },
      userId,
    });

    // Collect existing IMEI IDs
    const existingIMEIIds = existingIMEIs.map((imei) => imei._id);

    // Filter for new IMEIs (not already in the database)
    const newIMEIs = imeiNumbers.filter(
      (imei) => !existingIMEIs.some((existing) => existing.imei === imei)
    );

    // Insert new IMEIs into the database
    const createdIMEIs = await imeiModel.insertMany(
      newIMEIs.map((imei) => ({ userId, imei }))
    );
    console.log("Created IMEIs:", createdIMEIs);

    // Combine existing and newly created IMEI IDs
    const allIMEIIds = [
      ...existingIMEIIds,
      ...createdIMEIs.map((imei) => imei._id),
    ];

    // Create the order
    const order = await orderModel.create({
      ...orderData,
      userId,
      customerId: customer ? customer._id : null, // Ensure valid customerId or null
      imeiNumbers: allIMEIIds, // Store the IMEI IDs in the order
      carrierInfos, // Store the carrier information
      accounts: accountFields, // Store account fields
      shippingAddresses, // Store shipping addresses
      phoneNumbers, // Store phone numbers
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
    const allOrders = await orderModel
      .find()
      .populate("imeiNumbers")
      .populate("customerId"); // Populate both imeiNumbers and customerId fields

    if (!allOrders || allOrders.length === 0) {
      return res.json({ message: "No orders found" });
    }

    return res.json({ message: "Here's the order data", orderData: allOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get user IMEI numbers API
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

// Get user orders API
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch orders and populate the imeiNumbers and customerId fields
    const orders = await orderModel
      .find({ userId })
      .populate("imeiNumbers")
      .populate("customerId");

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

const getCustomers = async (req, res) => {
  const customers = await CustomerModel.find({ agentId: req.user.userId });
  return res.json({ message: "Here are customers", customers });
};

const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await orderModel
      .findById(orderId)
      .populate("customerId") 
      .populate("imeiNumbers") 
      .populate({
        path: "customerId.agentId",   
        select: "name email role", 
      });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the populated order data
    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching single order:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getDataFromUniqueCode =  async (req, res) => {
  try {
    const { code } = req.params;
    const order = await orderModel.findOne({ "carrierInfos.uniqueCode": code })
      .populate("imeiNumbers")
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Prepare data to return
    const data = {
      accountFields: order.accounts, // You can modify to return specific fields
      phoneNumbers: order.phoneNumbers,
      shippingAddresses: order.shippingAddresses,
    };

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  getSingleOrder,
  orderSubmit,
  getUserOrders,
  getOrders,
  updateOrderStatus,
  getIMEINumbers,
  getCustomers,
  getDataFromUniqueCode
};
