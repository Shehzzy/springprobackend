const mongoose = require('mongoose');

const imeiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  imei: { type: String, required: true, unique: true },
}, { timestamps: true });

const imeiModel = mongoose.model('IMEI', imeiSchema);
module.exports = imeiModel;