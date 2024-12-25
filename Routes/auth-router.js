const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth-controller');
const authenticateJWT = require('../Middlewares/authenticateMiddleware');
const authorizeRole = require('../Middlewares/authorizationMiddleware');

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/get-users', authenticateJWT, authorizeRole('admin'), (authController.getUsers));



module.exports = router;