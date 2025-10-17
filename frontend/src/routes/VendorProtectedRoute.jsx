import { Navigate } from "react-router-dom";
import { useVendorAuth } from "../context/VendorAuthContext";

export default function VendorProtectedRoute({children}){
    const token = useVendorAuth();

    if(!token){
        return <Navigate to="/vendor/login" replace/>
    }

    return children;
}