// configuring .env
const dotenv = require("dotenv");
dotenv.config();

// connecting to db
const dbUrl = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connection Established"));

// express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// cors
const cors = require('cors');
app.use(cors());

// setting up middlewares
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// static folder for routes
app.use("/uploads", express.static("uploads"));

// importing and mouting routes
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes.js");
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
