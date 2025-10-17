import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { useVendorAuth } from "../../context/VendorAuthContext";
import { toast } from "react-toastify";

export default function VendorDashboard() {
  const [vendor, setVendor] = useState(null);
  const { token, logoutVendor } = useVendorAuth();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await api.get("/vendor/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Vendor profile response:", res.data);

        // ✅ handle both possible response shapes
        const vendorData = res.data.vendor ? res.data.vendor : res.data;
        setVendor(vendorData);
      } catch (err) {
        console.error("Error fetching vendor:", err);
        toast.error("Failed to fetch vendor profile");
      }
    };

    if (token) fetchVendor();
  }, [token]);

  if (!vendor) {
    return <p className="text-center mt-10">Loading vendor profile...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome, {vendor.shopName || vendor.name} 🏪
      </h1>
      <p className="text-gray-700 mb-2">Email: {vendor.email}</p>
      <p className="text-gray-700 mb-2">
        Description: {vendor.description || "No description available"}
      </p>
      <p className="text-gray-700 mb-2">
        Status:{" "}
        {vendor.verified ? (
          <span className="text-green-600 font-semibold">Verified</span>
        ) : (
          <span className="text-yellow-600 font-semibold">Pending</span>
        )}
      </p>

      <button
        onClick={logoutVendor}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-6"
      >
        Logout
      </button>
    </div>
  );
}
