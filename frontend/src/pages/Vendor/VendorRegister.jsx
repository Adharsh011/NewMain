import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";

const VendorRegister = () => {
  const [form, setForm] = useState({ 
    name: "", email: "", password: "" ,shopName:"",description:""
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/vendor/register", form);
      console.log(res);
      if (res.data.success) {
        toast.success("Vendor Registered Successfully");
        navigate("/vendor/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message||"Registration Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Vendor Registration 🧑‍💻</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 p-6 border rounded-md shadow-md"
      >
        {/* ✅ Added name attribute */}
        <input
          type="text"
          name="name"              // ✅ FIX
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 mb-3 border rounded"
        />
         <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            className="w-full mb-3 p-2 border rounded"
            onChange={handleChange}
            required
          />
            <textarea
            name="description"
            placeholder="Shop Description"
            className="w-full mb-3 p-2 border rounded"
            onChange={handleChange}
          ></textarea>
        <input
          type="email"
          name="email"             // ✅ FIX
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"          // ✅ FIX
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 mb-3 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
            Already registered?{" "}
             <a href="/vendor/login" className="text-green-600 font-semibold hover:underline">
            Login
          </a>
      </p>
    </div>
  );
};

export default VendorRegister;
