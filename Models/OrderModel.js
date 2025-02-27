// models/Order.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Order Schema
const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    // name: { type: String },
    // email: { type: String },
    sansPartnerID: { type: String },
    agreementtype: {
      type: String,
      enum: ["amb", "acda"],
    },
    atntaccount: { type: String },
    existingBAN: { type: String },
    // existingFAN: { type: String },
    companyname: { type: String },
    eip: { type: String },
    // promotion: {
    //   type: String,
    //   enum: ["accepted", "declined"],
    // },
    phonemodel: { type: String },
    imeistatus: { type: String },
    noCracks: { type: String },
    screenDefects: { type: String },
    factoryReset: { type: String },
    paperless: {
      type: String,
      enum: ["accepted", "declined"],
    },
    specialinstruction: { type: String },
    ratePlan: {
      type: String,
      enum: [
        "UYW 2.0 Advanced",
        "UYW 2.0 Premium",
        "Turnkey BYOD",
        "Turnkey Standard",
        "Turnkey Premium",
        "Unlimited Tablet",
        "Unlimited Watch",
        "AWB / Hotspot Core",
        "AWB / Hotspot Pro",
        "AWB / Hotspot Ultra",
        "AT&T Internet Air",
      ],
    },
    smartphoneDetails: {
      brand: { type: String },
      model: { type: String },
      color: { type: String },
      size: { type: String },
    },
    currentwirelesscarrier: { type: String },
    accountnumber: { type: String },
    pinorpassword: { type: String },
    ssnortaxid: { type: String },
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

    shippingAddresses: [
      {
        attentionname: { type: String },
        shippingaddress: { type: String },
        shippingcity: { type: String },
        shippingstate: { type: String },
        shippingzip: { type: String },
        uniqueCode: { type: String },
      },
    ],
    accounts: [
      {
        accountNumber: { type: String },
        portOutPin: { type: String},
        phoneNumber: { type: String },
        carrier: { type: String},
        imei: { type: String},
        shippingAddress: {
          attentionName: { type: String },
          address: { type: String },
          city: { type: String },
          state: { type: String },
          zip: { type: String },
        },
      },
    ],
    phoneNumbers: [
      {
        phoneNumber: { type: String },
        carrier: { type: String },
      },
    ],
    tradeSmartphone: {
      type: Boolean
    }
    ,
    buyPhoneNumber: {
      type: Boolean
    }
    ,
    phoneUniqueCode: {
      type: String
    },
    promoCode: {
      type: String
    },
    status: {
      type: String,
      default: "Pending",
    },
    mappedRelations: { type: Map, of: String },
    // lines: [
    //   {
    //     accountNumber: { type: String },
    //     portOutPin: { type: String },
    //     phoneNumber: { type: String },
    //     carrier: { type: String },
    //     imei: { type: String },
    //     shippingAddress: {
    //       attentionName: { type: String },
    //       address: { type: String },
    //       city: { type: String },
    //       state: { type: String },
    //       zip: { type: String },
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;