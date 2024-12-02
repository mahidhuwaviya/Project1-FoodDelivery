import express from "express";
const router = express.Router();

import { body } from "express-validator";
import {
  handleUserCreateAccount,
  handleUserDataUpdate,
  handleUserEmailVerification,
  handleUserLogin,
  handleUserOtpVerification,
  handleUserUpdateEmail,
  handleUserUpdatePassword,
} from "../controllers/user.js";

router.post(
  "/createAccount",
  [
    body("email").isEmail(),
    body("password", "Password must be a maximum of 5 characters.").isLength({
      min: 5,
    }),
    body("name", "Name must be a maximum of 5 characters.").isLength({
      min: 5,
    }),
  ],
  handleUserCreateAccount
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password must be a maximum of 5 characters.").isLength({
      min: 5,
    }),
  ],
  handleUserLogin
);

router.put("/UserUpdateData", handleUserDataUpdate);

router.put("/UserUpdateEmail", handleUserUpdateEmail);
router.put("/UserUpdatePassword", handleUserUpdatePassword);
router.post(
  "/UserUpdatePasswordEmailVerification",
  handleUserEmailVerification
);
router.post("/UserUpdatePasswordOtpVerification", handleUserOtpVerification);

export default router;
