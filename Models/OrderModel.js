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
      default: "", // Optional: Use default if it's an optional field.
    },
    billingzip: {
      type: String,
    },
    authorizedname: {
      type: String,
    },
    imeiNumbers: [{ type: Schema.Types.ObjectId, ref: "IMEI" }], // Reference to IMEI numbers
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
    status: {
      type: String,
      default: "Pending", // Default status if not provided
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
