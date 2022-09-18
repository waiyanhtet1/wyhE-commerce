import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { publicRequest, userRequest } from "../requestMethod";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/CartRedux";

export default function Success() {
  const location = useLocation();
  const carts = location.state.products;
  const stripeData = location.state.stripeData;
  const { currentUser } = useSelector((state) => state.user);
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const addOrder = async () => {
      try {
        const res = await publicRequest.post("/orders", {
          userId: currentUser._id,
          products: carts.products,
          amount: carts.total,
          address: stripeData.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(clearCart());
      } catch (error) {}
    };
    addOrder();
  }, [carts, stripeData, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {orderId
        ? `Order have been created successfully.Your Order number is ${orderId}`
        : `Successful. Your order is being prepared...`}
      <Link to="/">
        <button
          style={{
            padding: "10px",
            marginTop: "20px",
            backgroundColor: "teal",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </Link>
    </div>
  );
}
