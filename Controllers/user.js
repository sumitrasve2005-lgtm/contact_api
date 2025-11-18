import { User } from "../Model/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "!@#$%^&()";

// ✅ REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ message: "All fields required", success: false });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.json({ message: "User already exists!", success: false });

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashpassword });

    console.log({message: "User Registered Successfully!", success: true, data: user})
    res.json({ message: "User Registered Successfully!", success: true, data: user });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.json({ message: "Server Error!", success: false });
  }
};

// ✅ LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found!", success: false });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.json({ message: "Invalid password!", success: false });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT,
      { expiresIn: "1d" }
    );
    console.log({message: `Welcome ${user.name}!`, token, success: true})
    res.json({ message: `Welcome ${user.name}!`, token, success: true });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.json({ message: "Server Error!", success: false });
  }
};
