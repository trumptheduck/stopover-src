const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const accessTokenKey = "this_is_key_for_development";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, require: true, unique: true },
    password: { type: String, require: true },
    refreshToken: { type: String },
    username: { type: String },
    isWriter: {type: Boolean, require: true}
  },
  {
    collection: "users",
  }
);

userSchema.plugin(uniqueValidator);

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      userId: this._id
    },
    accessTokenKey,
    { expiresIn: "24h" }
  );
};

userSchema.methods.generatePassword = function (password) {
  this.password = bcrypt.hashSync(password, 10);
};

userSchema.methods.checkValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);