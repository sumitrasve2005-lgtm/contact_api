import jwt from "jsonwebtoken";


export const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization") || req.header("Auth");
    if (!authHeader) {
      return res.status(401).json({ message: "⚠️ Please login first", success: false });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]  
      : authHeader;

    const decoded = jwt.verify(token,process.env.JWT);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(403).json({ messa4ge: "Invalid or expired token", success: false });
  }
};
