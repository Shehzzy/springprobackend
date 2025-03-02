const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
  },
  tax_id: {
    type: String,
    required: true,
  },
  government_identification: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isEnabled:{
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  var salt = await bcrypt.genSalt(10);
  var hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  // compare the password passed in the parameter with the stored password
  return bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
