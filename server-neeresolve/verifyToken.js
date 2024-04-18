import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  if (!token) {
    res.status(401).json("You are not authorized");
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(401).json("Access token invalid");
    }
    req.user = user;
    next();
  });
};
