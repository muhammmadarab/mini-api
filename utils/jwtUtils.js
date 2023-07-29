const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const createAccessToken = (user) => {
    const payload = {
        userId: user._id,
        username: user.username,
    };

    return jwt.sign(payload, accessTokenSecret, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
};

const createRefreshToken = (user) => {
    const payload = {
        userId: user._id,
        username: user.username,
    };

    return jwt.sign(payload, refreshTokenSecret, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME });
};

module.exports = {
    createAccessToken,
    createRefreshToken,
};
