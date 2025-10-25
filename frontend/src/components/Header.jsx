import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useVendorAuth } from "../context/VendorAuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { vendor, isAuthenticated: vendorAuth, logoutVendor } = useVendorAuth();

  // ✅ Detect role properly (from backend data)
  const role = vendorAuth
    ? "vendor"
    : isAuthenticated
    ? user?.role?.toLowerCase() || "customer"
    : null;

  console.log("Detected Role:", role);

  const handleLogout = () => {
    if (role === "vendor") logoutVendor();
    else logoutUser();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛍️ Buddies Buy
        </Link>

        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/cart">🛒 Cart</Link>

          {/* If no one logged in */}
          {!role && (
            <>
              <Link to="/login">User Login</Link>
              <Link to="/vendor/login">Vendor Login</Link>
            </>
          )}

          {/* ✅ User logged in (role=customer) */}
          {role === "customer" && (
            <>
              <span className="text-blue-600">
                Hello, {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* ✅ Vendor logged in */}
          {role === "vendor" && (
            <>
              <Link to="/vendor/dashboard">Dashboard 🎛️</Link>
              <span className="text-green-600">{vendor?.name || "Vendor"}</span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
  