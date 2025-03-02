const mongoose = require("mongoose");

const TacSchema = new mongoose.Schema({
  tac_number: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Tac = mongoose.model("Tac", TacSchema, "tac_database"); // 'tac_database' is your collection name
module.exports = Tac;
