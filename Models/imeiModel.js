

const mongoose = require('mongoose');

const imeiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imei: { type: String, unique: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }, // Reference to the Account model
  phoneNumber: { type: String }, // Store associated phone number directly
  carrierInfo: { type: String }, // Store carrier information
  shippingAddress: {
    attentionName: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
}, { timestamps: true });

const imeiModel = mongoose.model('IMEI', imeiSchema);
module.exports = imeiModel;