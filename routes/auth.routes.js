const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  refreshToken,
} = require("../controllers/authController");
const uploadProfilePicture = require("../middlewares/uploadProfilePicture");

router.post("/signup", uploadProfilePicture, signup);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

module.exports = router;
