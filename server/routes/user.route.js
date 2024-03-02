import express from "express";
const router = express.Router();
import {
  authUser,
  createUser,
  getUserInfo,
  logoutUser,
  updateProfile,
} from "../controllers/user.controller.js";

import {
  emailValidation,
  fullNameValidation,
  passwordValidation,
} from "../middlewares/validation.middlewares.js";
import { authToken } from "../middlewares/verifyToken.middlewares.js";

// ! create user and get user info route
router
  .route("/")
  .post(fullNameValidation, emailValidation, passwordValidation, createUser)
  .get(authToken, getUserInfo);

// ! Login user
router.route("/auth").post(emailValidation, passwordValidation, authUser);

// ! logut user
router.route("/logout").post(logoutUser);

// ! Update profile
router
  .route("/update")
  .post(
    fullNameValidation,
    emailValidation,
    passwordValidation,
    authToken,
    updateProfile
  );

export default router;
