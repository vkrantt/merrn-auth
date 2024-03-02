import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_CODE, {
    expiresIn: "3d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.JWT_ENV !== "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;