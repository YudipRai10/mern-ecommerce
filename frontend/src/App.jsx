import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import AdminPage from "./page/AdminPage";
import Category from "./page/Category";
import Cart from "./page/Cart";

import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccess from "./page/PurchaseSuccess";

const App = () => {
  const { user, checkAuth, checkingAuth, loading } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]" />
          </div>
        </div>

        <div className="relative z-50 pt-20">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={loading ? null : !user ? <Login /> : <Navigate to="/" />}
            />

            <Route
              path="/signup"
              element={
                loading ? null : !user ? <Signup /> : <Navigate to="/" />
              }
            />
            <Route
              path="/secret-dashboard"
              element={
                loading ? null : user?.role === "admin" ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/category/:category" element={<Category />} />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-success"
              element={user ? <PurchaseSuccess /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
};

export default App;
