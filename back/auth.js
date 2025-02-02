import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET;

import 'dotenv/config'

// check if token is valid
function token(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// check if user is admin
function isAdmin(req, res, next) {
  if (req.user.email !== "admin@admin.com") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}

export { token, isAdmin };