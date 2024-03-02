import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import mongodbConnection from "./server/database/mongodbConnection.js";
import usersRoute from "./server/routes/user.route.js";
import { notFound, errorHandler } from "./server/handlers/errorHandler.js";
import cookieParser from "cookie-parser";

// Database connection
mongodbConnection();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.json({
    status: "Running",
    app: "MERRN-AUTH",
  });
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port --- ${port}`);
});
