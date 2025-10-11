import React,{useState} from "react";
import api from "../utils/axiosInstance";
import MultiImageUpload from "./MultiUpload.js";

const AddProduct = ()=>{
    const [productData,setProductData]  = useState({
        name:"",
        description:"",
        price:"",
        vendor:"",
    });

    const [uploadedImages,setuploadedImages] = useState([]);

    const handleChange = (e)=>{
        setProductData({...productData,[e.target.name]:e.target.value});

    };

    const handleImagesUploaded = (images) =>{
        setuploadedImages(images)
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            const payload = {...productData,images:uploadedImages};
            const response = await api.post("/products",payload,{
                  headers: {
                Authorization: `Bearer ${token}`,
  },
            });
            alert("Product Created succesfully");
            console.log(response.data)
        }catch(error){
            console.error(error);
            alert("product Creation failed")
        }
    };

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
        <h2>🛍️ Add Product</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            style={{width: "100%", marginBottom: 10, padding: 8}}
        />

        <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            style={{width:"100",marginBottom:10,padding:8}}
        />

        <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
             style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
            type="text"
            name="vendor"
            placeholder="Vendor ID"
            value={productData.vendor}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />

        <MultiImageUpload onUploadComplete ={handleImagesUploaded}/>

        <button
        type="submit"
        style={{
            background: "#28a745",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 6,
            cursor: "pointer",
            marginTop: 12,
        }}

        >  Save Product</button>

        </form>

        </div>
    )
    
}

export default AddProduct;