// models/ShippingAddress.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Shipping Address Schema
const ShippingAddressSchema = new Schema({
  attentionname: { type: String },
  shippingaddress: { type: String },
  shippingcity: { type: String },
  shippingstate: { type: String },
  shippingzip: { type: String },
  uniqueCode: { type: String },
  orderId: { type: Schema.Types.ObjectId, ref: "Order" }, // Link to Order
});

const ShippingAddress = mongoose.model("ShippingAddress", ShippingAddressSchema);
module.exports = ShippingAddress;