const mongoose = require('mongoose');

// Customer Schema
const CustomerSchema = new mongoose.Schema(
  {
    businesslegalname: { type: String },
    businessaddress: { type: String },
    businesscity: { type: String },
    businessstate: { type: String },
    businesszip: { type: String },
    taxid: { type: String },
    contactname: { type: String },
    contactphone: { type: String },
    contactemail: { type: String },
    locationid: { type: String },
    billtomobile: { type: String, enum: ["yes", "no"] },
    creditcardpayment: { type: String, enum: ["yes", "no"] },
    singleormultiaddresshipment: { type: String, enum: ["yes", "no"] },
    attentionname: { type: String },
    shippingaddress: { type: String },
    shippingcity: { type: String },
    shippingstate: { type: String },
    shippingzip: { type: String },
  },
  { timestamps: true }
);
// Export the model
module.exports = mongoose.model('Customer', CustomerSchema);