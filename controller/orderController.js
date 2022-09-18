import Order from "../models/Order.js";

// // Create Order
export const createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

// // Update Order
export const updateOrder = async (req, res, next) => {
  try {
    const update = await Order.findByIdAndUpdate(
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

// // // Delete Order
export const deleteOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json("Order have been deleted!");
  } catch (error) {
    next(error);
  }
};

// // // Get user Order
export const getUserOrder = async (req, res, next) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// // // Get All Order
export const getAllOrder = async (req, res, next) => {
  try {
    const orders = req.query.new
      ? await Order.find().sort({ _id: -1 }).limit(5)
      : await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// Get monthly income
export const getMontlyIncome = async (req, res, next) => {
  const proudctId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const data = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(proudctId && {
            proudcts: { $elemMatch: { proudctId } },
          }),
        },
      },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
