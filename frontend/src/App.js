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





function App() {
  return (
   <BrowserRouter>
   <Header/>
      <div className="p-6">
      <h1 className="text-center text-3xl font-bold text-blue-800 mb-10">
        🛒 Buddies Buy – Route Testing
      </h1>
      <Routes>
      <Route path="/" element={<Homepage/>}></Route>
       <Route path="/pdp" element={<PDP/>}></Route>
        <Route path="/plp" element={<PLP/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
       <Route path="/register" element={<Register/>}></Route>
        <Route path="/order-confirmatiom" element={<OrderConfirmation/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {/*Vendor*/}
       <Route path="/vendor/dashboard" element={<Dashboard/>}></Route>
        <Route path="?vendor/products" element={<ProductList/>}></Route>
        <Route></Route>
       <Route></Route>
        <Route></Route>
         <Route></Route>
     </Routes>
       <Homepage></Homepage>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
