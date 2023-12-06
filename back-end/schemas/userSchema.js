const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
require("dotenv").config();
const userSchema = new mongoose.Schema({
  profilePicture: String,
  username: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
});

//this function returns a userID after a successful signup attempt.
userSchema.statics.signup = async function (username, email, password) {
  if (!validator.isEmail(email)) {
    throw new Error(process.env.ERR_NOT_VALID_EMAIL);
  }
  if (!username) {
    throw new Error(process.env.ERR_NOT_VALID_USERNAME);
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(process.env.ERR_NOT_STRONG_PASSWORD);
  }
  const userWithThisUsername = await this.findOne({ username });
  if (userWithThisUsername) {
    throw new Error(process.env.ERR_TAKEN_USERNAME);
  }
  const userWithThisEmail = await this.findOne({ email });
  if (userWithThisEmail) {
    throw new Error(process.env.ERR_TAKEN_EMAIL);
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });
  return user._id;
};
//this function returns a userID after a successful login attempt.
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw new Error(process.env.ERR_NOT_FILLED_IN_CREDENTIALS);
  }
  const inDB = await this.findOne({ username });
  if (!inDB) {
    throw new Error(process.env.ERR_NOT_FOUND_USER);
  }
  const match = await bcrypt.compare(password, inDB.password);
  if (!match) {
    throw new Error(process.env.ERR_NOT_CORRECT_PASSWORD);
  }
  return inDB._id;
};

module.exports = new mongoose.model("User", userSchema);
