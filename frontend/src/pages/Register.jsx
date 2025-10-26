import { useState } from "react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      console.log(res);
       navigate("/login");
      if (res.data.success) {
        toast.success("User Registered Successfully");
       
      }
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Vendor Registration : 🧑‍💻</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-80 p-6 border rounded-md shadow-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 mb-3 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 mb-3 border rounded"
        />
        <input
          type="password"
          name="password"
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
        <p className="text-center text-sm text-gray-600 mt-4">
          Already Have an Account ? please {" "}
          <a href="/login" className="text-green-600 font-semibold hover:underline"> LogIn</a>
        </p>
      </form>
    </div>
  );
}
