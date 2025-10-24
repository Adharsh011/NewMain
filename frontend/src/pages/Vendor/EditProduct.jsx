// src/pages/Vendor/EditProduct.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useVendorAuth } from "../../context/VendorAuthContext";
import { toast } from "react-toastify";

/**
 * EditProduct
 * - Loads product by id (GET /api/products/:id)
 * - Allows updating fields and optionally uploading new images
 * - PUT /api/products/:id with updated payload
 */

export default function EditProduct() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const navigate = useNavigate();
  const { token } = useVendorAuth();

  const [product, setProduct] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        console.error("Load product error:", err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleFiles = (e) => setFiles(Array.from(e.target.files));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrls = product.images || [];

      // If new files chosen, upload them first and append returned urls
      if (files.length > 0) {
        const fd = new FormData();
        files.forEach((f) => fd.append("images", f));

        const uploadRes = await api.post("/upload/multi", fd, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        const newUrls = uploadRes.data.urls || uploadRes.data.imageUrls || uploadRes.data;
        if (Array.isArray(newUrls)) {
          imageUrls = [...imageUrls, ...newUrls];
        }
      }

      const payload = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock || 0),
        category: product.category,
        images: imageUrls,
      };

      await api.put(`/products/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product updated");
      navigate("/vendor/products");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">Loading product...</p>;
  if (!product) return <p className="text-center">Product not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-green-700">Edit Product</h2>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow max-w-xl">
        <input
          name="name"
          value={product.name || ""}
          onChange={handleChange}
          placeholder="Product name"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="category"
          value={product.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          name="price"
          value={product.price ?? ""}
          type="number"
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          name="stock"
          value={product.stock ?? ""}
          type="number"
          onChange={handleChange}
          placeholder="Stock"
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2">Add more images (optional)</label>
        <input type="file" multiple onChange={handleFiles} className="mb-4" />

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Current Images</h4>
          <div className="flex gap-2 flex-wrap">
            {(product.images || []).map((u, i) => (
              <img key={i} src={u} alt={`img-${i}`} className="w-20 h-20 object-cover rounded" />
            ))}
          </div>
        </div>

        <button
          disabled={saving}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
