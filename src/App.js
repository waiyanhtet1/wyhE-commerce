import React from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Products from "./pages/Products/Products";
import Users from "./pages/Users/Users";
import UserDetail from "./pages/UserDetail/UserDetail";
import ProductDetail from "./pages/ProudctDetail/ProductDetail";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCreate from "./pages/ProuductCreate/ProductCreate";
import UserCreate from "./pages/UserCreate/UserCreate";
import Orders from "./pages/Orders/Orders";

export default function App() {
  const ProtectRoute = ({ children }) => {
    const navigate = useNavigate();
    const adminUser = useSelector((state) => state.admin.adminUser);
    const token = localStorage.getItem("persist:root");
    useEffect(() => {
      if (!adminUser) {
        navigate("/login");
      }
    }, []);
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectRoute>
              <Users />
            </ProtectRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectRoute>
              <UserDetail />
            </ProtectRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectRoute>
              <Products />
            </ProtectRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectRoute>
              <ProductDetail />
            </ProtectRoute>
          }
        />
        <Route
          path="/create/product"
          element={
            <ProtectRoute>
              <ProductCreate />
            </ProtectRoute>
          }
        />
        <Route
          path="/create/user"
          element={
            <ProtectRoute>
              <UserCreate />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
