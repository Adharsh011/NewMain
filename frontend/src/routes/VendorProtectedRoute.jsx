import { Navigate } from "react-router-dom";
import { useVendorAuth } from "../context/VendorAuthContext";

export default function VendorProtectedRoute({children}){
    const {isAuthenticated,loading} = useVendorAuth();
    
    if(loading) return null;

    if(!isAuthenticated){
        return <Navigate to="/vendor/login" replace/>
    }

    return children;
}