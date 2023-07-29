const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  isUsernameValid,
  isPasswordValid,
  isEmailValid,
  isNameValid,
} = require("../utils/authValidators");
const { createAccessToken, createRefreshToken } = require('../utils/jwtUtils');

const signup = async (req, res) => {
  try {
    let { username, password, name, email } = req.body;

    username = username.toLowerCase();
    email = email.toLowerCase();

    // validating fields
    if (!isUsernameValid(username))
      return res.status(400).json({
        error:
          "Invalid username. It should be 4 characters long and alphanumeric.",
      });

    if (!isPasswordValid(password))
      return res.status(400).json({
        error:
          "Invalid password. It should be 8 characters long and contain at least one letter, one number, and one special character.",
      });

    if (!isEmailValid(email))
      return res.status(400).json({ error: "Invalid email address." });

    if (!isNameValid(name))
      return res.status(400).json({
        error:
          "Invalid name. It should contain only letters. And only one space is allowed",
      });

    // check if username or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(409).json({ error: "Username already exists" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(409).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      name,
      email,
      profilePicture: req.file ? req.file.filename : undefined,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: "Signup successful", user: savedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to signup" });
  }
};

const login = async (req, res) => {
  try {
    let { username, password, rememberMe } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ error: "Username or email and password are required." });

    const user = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() },
      ],
    });

    if (!user) return res.status(401).json({ error: "Invalid username" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });

    // Creating JWT for access token
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // Saving the refresh token to the database
    if (rememberMe) {
      user.refreshToken = refreshToken;
      await user.save();
    }

    // Respondind with the JWT tokens
    res
      .status(200)
      .json({ message: "Login successful", accessToken });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      // secure: true,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      return res.status(401).json({ error: "Refresh token not found" });

    // Verifying the refresh token
    const decodedToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const userId = decodedToken.userId;

    // Checking if the user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Checking if the refresh token matches with the one in database
    if (refreshToken !== user.refreshToken)
      return res.status(401).json({ error: "Invalid refresh token" });

    // Generating a new access token
    const accessToken = createAccessToken(user);

    // Respond with the new access token
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: "Failed to refresh access token" });
  }
};

module.exports = { signup, login, refreshToken };
