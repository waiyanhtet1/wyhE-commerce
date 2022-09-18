import express from "express";
import Stripe from "stripe";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51LcsqWEmBPzfjK6EaTxOwJjiWWdgV9eBxPCoa8P8qhW6jY9Z9EgloFzdOBO084MPNWBqcG2buAiNopUzgzdWq7fs00EF7RVEXA"
);

router.post("/payment", (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        next(stripeErr);
      } else {
        return res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
