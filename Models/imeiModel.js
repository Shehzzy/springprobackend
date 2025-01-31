const mongoose = require('mongoose');

const imeiSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User '  },
  imei: { type: String , unique: true },
}, { timestamps: true });

const imeiModel = mongoose.model('IMEI', imeiSchema);
module.exports = imeiModel;