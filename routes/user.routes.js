const express = require('express');
const router = express.Router();
const { getUserById } = require('../controllers/userController');
const checkAuth = require("../middlewares/checkAuth");

router.get('/:id', checkAuth, getUserById);

module.exports = router;
