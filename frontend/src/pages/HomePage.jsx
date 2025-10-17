import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        🛍️ Welcome to Buddies Buy
      </h1>

      <div className="flex gap-10">
        {/* User Section */}
        <div className="bg-white shadow-md rounded-2xl p-8 w-72 text-center border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">User Access</h2>
          <Link
            to="/login"
            className="block bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-3"
          >
            Login as User
          </Link>
          <Link
            to="/register"
            className="block bg-gray-100 text-blue-600 py-2 rounded-md hover:bg-gray-200"
          >
            Register as User
          </Link>
        </div>

        {/* Vendor Section */}
        <div className="bg-white shadow-md rounded-2xl p-8 w-72 text-center border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Vendor Access</h2>
          <Link
            to="/vendor/login"
            className="block bg-green-600 text-white py-2 rounded-md hover:bg-green-700 mb-3"
          >
            Login as Vendor
          </Link>
          <Link
            to="/vendor/register"
            className="block bg-gray-100 text-green-700 py-2 rounded-md hover:bg-gray-200"
          >
            Register as Vendor
          </Link>
        </div>
      </div>
    </div>
  );
}
