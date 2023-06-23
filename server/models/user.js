const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedPasswords: [
    {
      appName: {
        type: String,
      },
      userName: {
        type: String,
      },
      password: {
        type: String,
      },
    },
  ],
});

// static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await this.create({
    email: email,
    password: hash,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect login credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect login credentials");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
