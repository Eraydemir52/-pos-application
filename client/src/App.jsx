import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import Customerpage from "./pages/Customerpage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouteControl>
            <HomePage />
          </RouteControl>
        }
      />
      <Route
        path="/cart"
        element={
          <RouteControl>
            <CartPage />
          </RouteControl>
        }
      />
      <Route
        path="/bills"
        element={
          <RouteControl>
            <BillPage />
          </RouteControl>
        }
      />
      <Route
        path="/customers"
        element={
          <RouteControl>
            <Customerpage />
          </RouteControl>
        }
      />
      <Route
        path="/statistic"
        element={
          <RouteControl>
            <StatisticPage />
          </RouteControl>
        }
      />
      <Route
        path="/products"
        element={
          <RouteControl>
            <ProductPage />
          </RouteControl>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
//post userı kontrol eder eğer varsa childre yani yukardaki gibi Home page yönledirir
export const RouteControl = ({ children }) => {
  if (localStorage.getItem("postUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
