const express = require("express");
const { signUpFunction, verifyEmailFunction } = require("../controllers/authController");
const authRouter = express.Router();

// we need middleware

// authRouter.post("/login", );
authRouter.post("/signup", signUpFunction);
authRouter.post("/verifyEmail", verifyEmailFunction)

module.exports = authRouter;