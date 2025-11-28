import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectdb } from "./Model/database.js";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";

const app = express();
app.use(express.json());
app.set("json spaces", 2);

// Connect DB
connectdb();

// Routes
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}`));
