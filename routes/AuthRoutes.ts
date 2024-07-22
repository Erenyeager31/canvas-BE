import express from "express";
const AuthRouter = express.Router();
import { singup, login, passwordResetRequestController, resetPasswordController } from "../controller/AuthController";
import { body } from "express-validator";

AuthRouter.post(
  "/signup",
  [
    body("username", "Name field cannot be Empty").exists(),
    body("email", "Enter a valid email value").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 4 }),
  ],
  singup
);

AuthRouter.post(
  "/login",
  [
    body("email", "Name field cannot be Empty").exists(),
    body("password", "Enter a valid password").exists(),
  ],
  login
);

AuthRouter.post(
  "/forgotpassword",
  [
    body("email", "Please enter a valid email").isEmail(),
  ],
  passwordResetRequestController
);

AuthRouter.post(
  "/resetpassword",
  [
    body("userID", "Invalid Link").exists(),
    body("token", "Invalid Link").exists(),
    body("password", "Please enter a valid password").isLength({min:8}),
  ],
  resetPasswordController
);

export default AuthRouter;
