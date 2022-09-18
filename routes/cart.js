import express from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getUserCart,
  updateCart,
} from "../controller/cartController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyAdmin, getAllCart).post(verifyToken, createCart);

// in this :id mean user id
router.get("/find/:id", verifyUser, getUserCart);

// router.route("/:id").put(verifyUser, updateCart).delete(verifyUser, deleteCart);

export default router;
