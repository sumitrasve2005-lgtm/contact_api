import { User } from "../Model/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required", success: false });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(409).json({ message: "Email already exists", success: false });

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashpassword });

    return res.status(201).json({ message: "User registered successfully", success: true, data: user });

  } catch (err) {
    console.error("❌ Register Error:", err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid password", success: false });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT,
      { expiresIn: "1d" }
    );

    return res.json({ message: `Welcome ${user.name}!`, token, success: true });

  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
