import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./utils/env-values";

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to mongodb...");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("Error while connecting mongodb ", err);
  });
