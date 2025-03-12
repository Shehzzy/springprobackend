const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  fname: {
    type: String,
     
  },
  lname: {
    type: String,
     
  },
  companyname: {
    type: String,
     
  },
  phone: {
    type: String,
     
  },
  dob: {
    type: String,
     
  },
  ssn: {
    type: String,
     
  },
  tax_id: {
    type: String,
     
  },
  government_identification: {
    type: String,
     
  },
  email: {
    type: String,
     
    unique: true,
  },
  password: {
    type: String,
     
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isEnabled:{
    type: Boolean,
    default: false
  }, 
  partnerId:{
    type: String,
    default:"None"
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
