import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Update Product
export const updateProduct = async (req, res, next) => {
  try {
    const update = await Product.findByIdAndUpdate(
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

// Delete Product
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json("Product have been deleted!");
  } catch (error) {
    next(error);
  }
};

// Get all Products
export const getAllProduct = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let products;
  try {
    if (qNew) {
      products = await Product.find().sort({ _id: -1 }).limit(6);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find().sort({ _id: -1 });
    }
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Get Single Product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
