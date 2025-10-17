import { createContext, useContext, useState, useEffect } from "react";

const VendorAuthContext = createContext();

export function VendorAuthProvider({ children }) {
  const [vendor, setVendor] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("vendorToken") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("vendorToken", token);
    } else {
      localStorage.removeItem("vendorToken");
    }
  }, [token]);

  const loginVendor = (vendorData, tokenValue) => {
    setVendor(vendorData);
    setToken(tokenValue);
  };

  const logoutVendor = () => {
    setVendor(null);
    setToken(null);
    localStorage.removeItem("vendorToken");
  };

  return (
    <VendorAuthContext.Provider
      value={{ vendor, token, loginVendor, logoutVendor }}
    >
      {children}
    </VendorAuthContext.Provider>
  );
}

export const useVendorAuth = () => useContext(VendorAuthContext);
