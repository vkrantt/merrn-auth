import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import generateToken from "../services/jwt-token.js";

// ! Register user in database
const createUser = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors });
  }

  //* check if user exists or not
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //* create User
  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  if (newUser) {
    //* generate token
    generateToken(res, newUser._id);

    //* send response
    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    });
  } else {
    res.status(400);
    throw new Error("Server error");
  }
});

// ! Authenticate user to login
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors });
  }

  //* check if user exists or not
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user && (await user.matchPassword(password))) {
    //* generate token
    generateToken(res, user._id);

    //* send response
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// ! get authenticated user
const getUserInfo = expressAsyncHandler(async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId).select("-password");
  res.status(200).json(user);
});

// ! Logout user
const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// ! update Profile
const updateProfile = expressAsyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const userId = req.user;
  const user = await User.findById(userId).select("-password");
  if (user) {
    user.fullName = fullName;
    user.email = email;

    if (password) {
      user.password = password;
    }
    console.log(user);
    const updatedUser = await user.save();
    //* send response
    res.status(200).json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }

  res.status(200).json({ body: req.body });
});
export { createUser, authUser, getUserInfo, logoutUser, updateProfile };
