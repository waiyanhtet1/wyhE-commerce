import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getUserOrder,
  getMontlyIncome,
  updateOrder,
} from "../controller/orderController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyAdmin, getAllOrder).post(createOrder);

router
  .route("/:id")
  .put(verifyAdmin, updateOrder)
  .delete(verifyAdmin, deleteOrder);

//   in this :id mean user id
router.get("/:id", verifyUser, getUserOrder);

// montly income
router.get("/month/income", verifyAdmin, getMontlyIncome);

export default router;
