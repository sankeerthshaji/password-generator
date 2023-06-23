require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const bodyParser = require("body-parser")

// express app
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connecting to db & listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
