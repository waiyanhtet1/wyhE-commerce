import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from "./pages/Success";

function App() {
  const ProtectRoute = ({ children }) => {
    const user = useSelector((state) => state.user.currentUser);
    if (user) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="products/:category" element={<ProductList />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="success" element={<Success />} />
          <Route
            path="login"
            element={
              <ProtectRoute>
                <Login />
              </ProtectRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectRoute>
                <Register />
              </ProtectRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
