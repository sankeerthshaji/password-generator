const express = require("express");
const { signup, login, addPassword, fetchPasswords, deletePassword } = require("../controllers/userController.js");
const requireAuthUser = require("../middlewares/authorization.js");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to the Password Manager API");
});

router.post("/signup", signup);

router.post("/login", login);

router.post("/addPassword", requireAuthUser, addPassword)

router.get("/fetchPasswords", requireAuthUser, fetchPasswords);

router.delete("/deletePassword/:id", requireAuthUser, deletePassword);

module.exports = router;
