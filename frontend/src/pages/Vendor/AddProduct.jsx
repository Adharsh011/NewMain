import { useState } from "react";
import api from "../../api/axiosInstance";
import { useVendorAuth } from "../../context/VendorAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProduct() {
  const { token } = useVendorAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFiles = (e) => {
    const chosen = Array.from(e.target.files);
    setFiles(chosen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrls = [];
    try {
      setUploading(true);

      if (files.length > 0) {
        const fd = new FormData();
        files.forEach((f) => fd.append("images", f));

        const uploadRes = await api.post("/upload/multi", fd, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        imageUrls =
          uploadRes.data.urls || uploadRes.data.imageUrls || uploadRes.data;

        if (imageUrls && typeof imageUrls === "object" && imageUrls.urls) {
          imageUrls = imageUrls.urls;
        }
      }
      const payload = {
        title: form.title,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock || 0),
        category: form.category,
        images: imageUrls,
      };
      console.log(payload);

      await api.post("/products", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product has been added");
      navigate("/vendor/products");
    } catch (err) {
      console.error("Add product error", err);
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-700"> ADD Product </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-xl"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="category"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          name="price"
          value={form.price}
          type="number"
          onChange={handleChange}
          placeholder="price"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          name="stock"
          value={form.stock}
          type="number"
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-2 border rounded mb-3"
        />
        <label className="block mb-2"> Images (you can select multiple)</label>
        <input type="file" multiple onChange={handleFiles} className="mb-4" />
        <button
          disabled={uploading}
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {uploading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
