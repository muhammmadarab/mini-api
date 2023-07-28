// express
const express = require("express");
const app = express();
const PORT = 5000;
// const formidable = require("formidable")

// connecting to db
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mini", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connection Established"));

// setting up middlewares
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(morgan("dev"));
// app.use(formidable({ multiples: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static folder for routes
app.use("/uploads", express.static("uploads"));

// configuring .env
const dotenv = require("dotenv");
dotenv.config();

// importing and mouting routes
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes.js");
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
