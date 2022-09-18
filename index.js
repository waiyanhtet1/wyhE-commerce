import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import cors from "cors";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import stripeRoute from "./routes/stripe.js";

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Wrong!";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on localhost ${PORT}`));
