import express from "express";
import dotenv from "dotenv";
dotenv.config(); 

import { connectdb } from "./Model/database.js";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";
g
const app = express();

// Middlewares
app.use(express.json());
app.set("json spaces", 2);

// Connect DB
connectdb();

// Routes
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);


// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
