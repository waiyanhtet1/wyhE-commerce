import User from "../models/User.js";
import bcrypt from "bcryptjs";

// update user
export const updateUser = async (req, res, next) => {
  try {
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);

    // const updateValue = { ...req.body, password: hash };

    const userUpdate = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(userUpdate);
  } catch (error) {
    next(error);
  }
};

// delete users
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User have been deleted.");
  } catch (error) {
    next(error);
  }
};

// get single user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

// get all users
export const getAllUser = async (req, res, next) => {
  try {
    const users = req.query.new
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find().sort({ _id: -1 });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// retrun total numbers of user per month
export const statsUser = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  // const last6Month = new Date(date.setMonth(date.getMonth() - 6));
  // console.log(last6Month);

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
