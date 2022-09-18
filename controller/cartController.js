import Cart from "../models/Cart.js";

// Create Cart
export const createCart = async (req, res, next) => {
  try {
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    return res.status(201).json(savedCart);
  } catch (error) {
    next(error);
  }
};

// Update Cart
export const updateCart = async (req, res, next) => {
  try {
    const update = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};

// // Delete Cart
export const deleteCart = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json("Cart have been deleted!");
  } catch (error) {
    next(error);
  }
};

// // Get user Cart
export const getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// // Get All Cart
export const getAllCart = async (req, res, next) => {
  try {
    const cart = await Cart.find();
    return res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
