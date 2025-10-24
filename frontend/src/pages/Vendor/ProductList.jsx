import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import { useVendorAuth } from "../../context/VendorAuthContext";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useVendorAuth();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products/vendor/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching Vending Product", err);
      toast.error(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want delete this Product");
    if (!ok) return;

    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product Deleted");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };
  useEffect(() => {
    fetchProducts();
  },[]);

  if (loading) return <p className="text-center"> Loading Products .</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700"> My Products</h2>
        <Link
          to="/vendor/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Add Product
        </Link>
      </div>
      {products.length === 0 ? (
        <p>No Products Found. Add your first Product.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">${p.price}</td>
                  <td className="p-3">{p.stock ?? "-"}</td>

                  <td className="p-3">
                    <Link
                      to={`/vendor/edit-product?id=${p._id}`}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      {" "}
                      Edit{" "}
                    </Link>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;