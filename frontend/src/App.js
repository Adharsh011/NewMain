import React from "react";
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Homepage from "./pages/HomePage";
import PDP from "./pages/PDP";
import PLP from "./pages/PLP";
import OrderConfirmation from "./pages/OrderConfirmation";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Vendor/Dashboard";
import AddProduct from "./pages/Vendor/AddProduct";
import EditProduct from "./pages/Vendor/EditProduct";
import Orders from "./pages/Vendor/Order";
import ProductList from "./pages/Vendor/ProductList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VendorLogin from "./pages/Vendor/VendorLogin";
import VendorRegister from "./pages/Vendor/VendorRegister"
import { VendorAuthProvider } from "./context/VendorAuthContext";


function App() {
  return (
   <BrowserRouter>
   <VendorAuthProvider>
   <Header/>
      <div className="p-6">
      
      <Routes>
      <Route path="/" element={<Homepage/>}></Route>
       <Route path="/pdp" element={<PDP/>}></Route>
        <Route path="/plp" element={<PLP/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
       
        <Route path="/order-confirmatiom" element={<OrderConfirmation/>}></Route>
       <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} ></Route>
        {/*Vendor*/}
       <Route path="/vendor/dashboard" element={<Dashboard/>}></Route>
        <Route path="?vendor/products" element={<ProductList/>}></Route>
        
{/* Vendor Auth */}
<Route path="/vendor/login" element={<VendorLogin />} />
<Route path="/vendor/register" element={<VendorRegister />} />
        <Route></Route>
       <Route></Route>
        <Route></Route>
         <Route></Route>
     </Routes>
  
      </div>
      <Footer/>
      </VendorAuthProvider>
    </BrowserRouter>
  );
}

export default App;
