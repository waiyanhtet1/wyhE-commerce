import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../controller/productController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(getAllProduct).post(verifyAdmin, createProduct);

router.get("/:id", getProduct);

router
  .route("/:id")
  .put(verifyAdmin, updateProduct)
  .delete(verifyAdmin, deleteProduct);

export default router;
