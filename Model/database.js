import mongoose from "mongoose";

// 1️⃣ CONNECT DB – always on top
export const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔥 MongoDB connected");
  } catch (err) {
    console.error("DB error:", err.message);
    process.exit(1);
  }
};

// 2️⃣ USER SCHEMA + MODEL
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

// Named export
export const User = mongoose.model("User", userSchema);
