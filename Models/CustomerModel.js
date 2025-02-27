const mongoose = require("mongoose");

// Customer Schema
const CustomerSchema = new mongoose.Schema(
  {
    businesslegalname: { type: String },
    businessaddress: { type: String },
    businesscity: { type: String },
    businessstate: { type: String },
    businesszip: { type: String },
    taxid: { type: String },
    existingBAN: { type: String },
    contactname: { type: String },
    contactphone: { type: String },
    contactemail: { type: String },
    locationid: { type: String },
    billtomobile: { type: String, enum: ["yes", "no"] },
    creditcardpayment: { type: String, enum: ["yes", "no"] }, 
    paymentMethod: { type: String, enum: ["select", "checkingAccount", "debitCreditCard"], default: "select" },
    accountHolderName: { type: String },
    routingNumber: { type: String },
    checkingAccountNumber: { type: String },
    cardHolderName: { type: String },
    cardNumber: { type: String },
    cardExpiry: { type: String },
    cardCVC: { type: String },
    cardBillingAddress: { type: String },
    cardType: { type: String },
    attentionname: { type: String },
    shippingaddress: { type: String },
    shippingcity: { type: String },
    shippingstate: { type: String },
    shippingzip: { type: String },

    agentId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      default: null, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", CustomerSchema);

// const CustomerSchema = new mongoose.Schema(
//   {
//     businesslegalname: { type: String },
//     businessaddress: { type: String },
//     businesscity: { type: String },
//     businessstate: { type: String },
//     businesszip: { type: String },
//     taxid: { type: String },
//     contactname: { type: String },
//     contactphone: { type: String },
//     contactemail: { type: String },
//     locationid: { type: String },
//     billtomobile: { type: String, enum: ["yes", "no"] },
//     creditcardpayment: { type: String, enum: ["yes", "no"] },
//     cardNumber: { type: String },
//     cardExpiry: { type: String },
//     cardCVC: { type: String },
//     // singleormultiaddresshipment: { type: String, enum: ["yes", "no"] },
//     attentionname: { type: String },
//     shippingaddress: { type: String },
//     shippingcity: { type: String },
//     shippingstate: { type: String },
//     shippingzip: { type: String },
//     agentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // This references the User (Agent) model
//       default: null, // You can set it to null initially if not assigned
//     },
//   },
//   { timestamps: true }
// );

// // Export the model
// module.exports = mongoose.model("Customer", CustomerSchema);
