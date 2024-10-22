require("dotenv").config();

const express = require("express");
const { json, urlencoded } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const fs = require("node:fs/promises");
const path = require("path");

const referenceRoute = require("./routes/reference.route");

const mongoose = require("mongoose");

const app = express();

const upload = multer({ dest: "uploads/" });

app.use(morgan("dev"));
app.use(cors());

app.use(urlencoded({ extended: true }));
app.use(json());

const MONGODB_URI = process.env["MONGODB_URI"];

mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use("/reference", referenceRoute);

const PORT = process.env["PORT"] || 3090;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
