const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWTSECUREKEY, JWTTOKENEXPIRY } = require("../utils/env-values");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    publicId: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  resetPasswordToken: {
    type: String
  },
  resetTokenExpiry: {
    type: Date
  }
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      email: this.email,
      userId: this._id.toString()
    },
    JWTSECUREKEY,
    { expiresIn: JWTTOKENEXPIRY }
  );
};

module.exports = mongoose.model("User", userSchema);
