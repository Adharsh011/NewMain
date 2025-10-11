import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import MultiImageUpload from "./components/MultiUpload";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1 style={{ textAlign: "center", marginTop: 20 }}>
          🛍️ Buddies Buy – Product Image Upload
        </h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/upload-test" element={<MultiImageUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
