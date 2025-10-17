import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";


const VendorAuthContext = createContext();

export function VendorAuthProvider({ children }) {
  const [vendor, setVendor] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("vendorToken") || null);
  const [loading,setLoading] = useState(true);  
  const navigate = useNavigate();


  useEffect(() => {

    const fetchProfile = async ()=>{
      if(!token){
        setLoading(false);
        return;
      }
      try{
        const res = await api.get("/vendor/profile",{
          headers: {Authorization: `Bearer ${token}`}
        });
        setVendor(res.data.vendor || res.data);
      } catch(err){
        console.error("❌ Vendor token invalid or expired:", err);
        if (err.response?.data?.message === "Token expired") {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Session invalid. Please login again.");
        }
        logoutVendor();
      }finally{
        setLoading(false);
      }
    };
    fetchProfile();

  }, [token]);

  const loginVendor = (vendorData, tokenValue) => {
    setVendor(vendorData);
    setToken(tokenValue);
     localStorage.setItem("vendorToken", token);
  };

  const logoutVendor = () => {
    setVendor(null);
    setToken("");
    localStorage.removeItem("vendorToken");
    navigate("/vendor/login");
  };

  return (
    <VendorAuthContext.Provider
      value={{ vendor, token, loginVendor, logoutVendor,isAuthenticated:!!token && !!vendor,loading }}
    >
    {
      loading ? (
        <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600">
          Validating Session...
        </div>
      ) : (
        children
      )
    }
      
    </VendorAuthContext.Provider>
  );
}

export const useVendorAuth = () => useContext(VendorAuthContext);
