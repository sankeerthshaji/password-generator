const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  appName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: Object,
    required: true,
  },
});

const Password = mongoose.model("Password", passwordSchema);
module.exports = Password;
