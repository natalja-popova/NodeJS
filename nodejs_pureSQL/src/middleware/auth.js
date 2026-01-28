import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Bad auth (no token)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_RANDOMISER);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("err", err.name);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message:
          "Access token expired. Request a new one using the refresh token.",
      });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authUser;
