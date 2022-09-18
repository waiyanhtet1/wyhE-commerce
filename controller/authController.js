import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    // check username exit or not
    const nameExit = await User.findOne({ username: req.body.username });
    if (nameExit) next(createError(404, "UserName Already Exit!"));

    // check user exit or not
    const emailExit = await User.findOne({ email: req.body.email });
    if (emailExit) next(createError(404, "Email Already Exit!"));

    // bcrypt password
    if (!req.body.password) next(createError(404, "Required Password!"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({ ...req.body, password: hash });
    const savedUser = await user.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User Not found with this Email!"));

    // check Password
    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) return next(createError(400, "Wrong Password!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc;

    return res.status(200).json({
      ...others,
      token,
    });
  } catch (error) {
    next(error);
  }
};
