const mongoose = require("mongoose");

const LineSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // Reference to the Order
    accountNumber: { type: String },
    portOutPin: { type: String },
    phoneNumber: { type: String },
    carrier: { type: String },
    imei: { type: mongoose.Schema.Types.ObjectId, ref: "IMEI" },
    shippingAddress: {
      attentionName: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
  },
  { timestamps: true }
);

const Line = mongoose.model("Line", LineSchema);
module.exports = Line;
