import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Homepage from "./pages/HomePage";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import OrderConfirmation from "./pages/OrderConfirmation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Vendor Pages
import Dashboard from "./pages/Vendor/Dashboard";
import AddProduct from "./pages/Vendor/AddProduct";
import EditProduct from "./pages/Vendor/EditProduct";
import Orders from "./pages/Vendor/Order";
import ProductList from "./pages/Vendor/ProductList";
import VendorLogin from "./pages/Vendor/VendorLogin";
import VendorRegister from "./pages/Vendor/VendorRegister";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";

// Context + Protection
import { VendorAuthProvider } from "./context/VendorAuthContext";
import { AuthProvider } from "./context/AuthContext";          // 🔹 added
import { CartProvider } from "./context/CartContext";          // 🔹 added
import VendorProtectedRoute from "./routes/VendorProtectedRoute";
import VendorLayout from "./components/VendorLayout";

function App() {
  return (
    <BrowserRouter>
      {/* 🔸 Wrap everything with all providers in correct order */}
      <VendorAuthProvider>
        <AuthProvider>              {/* ✅ Added */}
          <CartProvider>            {/* ✅ Added */}

            <Header />

            <div className="p-6 min-h-screen bg-gray-50">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Homepage />} />
                <Route path="/plp" element={<PLP />} />
                <Route path="/pdp" element={<PDP />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Vendor Auth */}
                <Route path="/vendor/login" element={<VendorLogin />} />
                <Route path="/vendor/register" element={<VendorRegister />} />

                <Route
                  path="/vendor"
                  element={
                    <VendorProtectedRoute>
                      <VendorLayout />
                    </VendorProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ProductList />} />
                  <Route path="add-product" element={<AddProduct />} />
                  <Route path="edit-product" element={<EditProduct />} />
                  <Route path="orders" element={<Orders />} />
                </Route>
              </Routes>
            </div>

            <Footer />
            <ToastContainer position="top-center" autoClose={3000} />

          </CartProvider>           {/* ✅ close */}
        </AuthProvider>             {/* ✅ close */}
      </VendorAuthProvider>
    </BrowserRouter>
  );
}

export default App;
