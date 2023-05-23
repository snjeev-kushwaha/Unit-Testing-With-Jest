const express = require('express')

const authRoute = express.Router()

const { registerUser, loginUser, uploadImage, sendEmailToUser, test } = require('../controllers/authController')

authRoute.route("/register").post(registerUser);
authRoute.route("/login").post(loginUser);

authRoute.route("/upload/image").post(uploadImage);
authRoute.route("/email").post(sendEmailToUser);

authRoute.route("/test").get(test);

module.exports = { authRoute };