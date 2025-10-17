import { Link, Outlet } from "react-router-dom";
import { useVendorAuth } from "../context/VendorAuthContext";

export default function VendorLayout() {
  const { vendor, logoutVendor } = useVendorAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SideBar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {" "}
          Buddies Buy Vendor{" "}
        </h2>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link
            to="/vendor/dashboard"
            className="hover:bg-green-800 rounded p-2 transition"
          >
            🛍️ My Products
          </Link>
          <Link
            to="/vendor/products"
            className="hover:bg-green-800 rounded p-2 transition"
          >
            🛍️ My Products
          </Link>
          <Link
            to="/vendor/add-product"
            className="hover:bg-green-800 rounded p-2 transition"
          >
            ➕ Add Product
          </Link>
          <Link
          to="/vendor/orders"
          className="hover:bg-green-800 rounded p-2 transition"
          
          >
          📦 Orders

          </Link>
          {/* Logout Button */}
          <button
          onClick={logoutVendor}
          className="mt-auto bg-red-500 hover:bg-red-600 rounded p-2"
          
          >

          Logout
            
          </button>
        </nav>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 p-8">
         {/* 🔝 Topbar */}

         <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-semibold text-gray-700">
             Welcome, {vendor?.name || "Vendor"} 👋
         </h1>

         <span className="text-sm text-gray-500">
             Shop: {vendor?.shopName || "—"}
         </span>

         </div>

         {/* Nested child routes are ended are here */}

            <div className="bg-white rounded-lg shadow p-6">
                <Outlet/>
            </div>

      </main>
    </div>
  );
}
