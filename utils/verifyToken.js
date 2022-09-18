import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(createError(403, "Token is invalid!"));
      req.user = user;
      next();
    });
  } else {
    return next(createError(401, "You are not authenticated!"));
  }
};

export const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not admin to authorized!"));
    }
  });
};
