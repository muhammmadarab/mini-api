const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Invalid or expired access token." });
    }
    req.userData = userData;
    next();
  });
};

module.exports = checkAuth;
