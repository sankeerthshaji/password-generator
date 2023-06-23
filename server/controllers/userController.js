const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../helpers/encryptDecrypt");
const Password = require("../models/password");

const createToken = (_id) => {
  const expiresIn = 60 * 60; // Expiration time in seconds (1 hour)
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn });
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

const addPassword = async (req, res) => {
  try {
    const { appName, userName, password } = req.body;
    if (!password || !appName || !userName) {
      throw new Error("Input Fields Cannot Be Empty");
    }
    // Check if the passwordTitle already exists
    const passwordExists = await Password.findOne({
      user: req.user._id,
      appName,
      userName,
    });
    if (passwordExists) {
      throw new Error("Password already exists");
    }
    // Encrypt the password before storing it
    const encryptedPassword = encrypt(password);
    const newPassword = await Password.create({
      user: req.user._id,
      appName,
      userName,
      password: encryptedPassword,
    });
    res.status(200).json({ message: "Password saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// fetch all saved passwords
const fetchPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user._id });
    // Decrypt the passwords before sending them to the client
    const decryptedPasswords = passwords.map((password) => {
      const decryptedPassword = decrypt(password.password);
      return {
        _id: password._id,
        appName: password.appName,
        userName: password.userName,
        password: decryptedPassword,
      };
    });
    res.status(200).json({ passwords: decryptedPasswords });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// delete a password
const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPassword = await Password.findByIdAndDelete(id);
    if (!deletedPassword) {
      throw new Error("Password not found");
    }
    res.status(200).json({ message: "Password deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
  addPassword,
  fetchPasswords,
  deletePassword,
};
