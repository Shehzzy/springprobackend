const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User ",
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    agentCode: {
      type: String,
      required: true,
    },
    dealerCode: {
      type: String,
      required: true,
    },
    existingBAN: {
      type: String,
      required: true,
    },
    existingFAN: {
      type: String,
      required: true,
    },
    agreementtype: {
      type: String,
      enum: ["amb", "acda"],
    },
    eip: {
      type: String,
    },
    promotion: {
      type: String,
      enum: ["accepted", "expected"],
    },
    paperless: {
      type: String,
      enum: ["accepted", "declined"],
    },
    specialinstruction: {
      type: String,
    },
    ratePlan: {
      type: String,
      enum: ["basic", "premium", "unlimited"],
    },
    smartphoneDetails: {
      brand: { type: String },
      model: { type: String },
      color: { type: String },
      size: { type: String },
    },
    currentwirelesscarrier: {
      type: String,
    },
    accountnumber: {
      type: String,
    },
    pinorpassword: {
      type: String,
    },
    ssnortaxid: {
      type: String,
    },
    billingname: {
      type: String,
    },
    billingaddress: {
      type: String,
    },
    billingcity: {
      type: String,
    },
    billingstate: {
      type: String,
      default: "",
    },
    billingzip: {
      type: String,
    },
    authorizedname: {
      type: String,
    },
    imeiNumbers: [{ type: Schema.Types.ObjectId, ref: "IMEI" }],
    carrierInfos: [
      {
        currentwirelesscarrier: { type: String },
        accountnumber: { type: String },
        pinorpassword: { type: String },
        ssnortaxid: { type: String },
        billingname: { type: String },
        billingaddress: { type: String },
        billingcity: { type: String },
        billingstate: { type: String },
        billingzip: { type: String },
        authorizedname: { type: String },
        uniqueCode: { type: String },
      },
    ],
    // New fields for IMEI modal
    accounts: [
      {
        accountNumber: { type: String, required: true },
        portOutPin: { type: String, required: true },
      },
    ],
    phoneNumbers: [
      {
        phoneNumber: { type: String, required: true },
        carrier: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      default: "Pending",
    },
    shippingAddresses: { type: Map, of: String }, // Map of IMEI to shipping address
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
