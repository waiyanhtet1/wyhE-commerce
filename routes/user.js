import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  statsUser,
  updateUser,
} from "../controller/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.route("/:id").put(verifyUser, updateUser).delete(verifyUser, deleteUser);

router.get("/find/:id", verifyAdmin, getUser);

router.get("/", verifyAdmin, getAllUser);

// retrun total numbers of user per month
router.get("/stats", verifyAdmin, statsUser);

export default router;
