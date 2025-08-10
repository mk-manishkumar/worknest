import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.id = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    console.error("Authentication middleware error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error in authentication",
    });
  }
};

export default isAuthenticated;
