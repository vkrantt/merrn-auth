import { body } from "express-validator";

export const fullNameValidation = body("fullName")
  .trim()
  .isLength({ min: 2 })
  .withMessage("Name field should contain atleast 2 characters");

export const emailValidation = body("email")
  .trim()
  .isEmail()
  .withMessage("Please enter a valid email address");

export const passwordValidation = body("password")
  .trim()
  .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
  .withMessage(
    "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
  );
