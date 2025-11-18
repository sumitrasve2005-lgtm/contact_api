import express from "express";
import { register, login } from "../Controllers/user.js";
import { isAuthenticated } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, (req, res) => {
  res.json({ message: "Token verified!", user: req.user });
});

export default router;
