import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navItemClass =
    "px-3 py-2 text-gray-700 hover:text-blue-600 hover:underline transition";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 hover:text-blue-800"
        >
          🛍️ Buddies Buy
        </Link>
        <nav className="flex space-x-2">
          <NavLink to="/" className={({isActive})=>
          `${navItemClass} ${isActive ? "text-orange-800 font-semibold" : ""}`
          }>
            Home
          </NavLink>
          <NavLink to="/plp" className={navItemClass}>PLP</NavLink>
          <NavLink to="/pdp" className={navItemClass}>PDP</NavLink>
          <NavLink to="/login" className={navItemClass}>LOGIN</NavLink>
          <NavLink to="/cart" className={navItemClass}>Cart</NavLink>
          <NavLink to="/vendor/dashboard" className={navItemClass}>DashBoard</NavLink>
          <NavLink to="/vendor/add-product" className={navItemClass}>Add_Poduct</NavLink>
          <NavLink to="/vendor/products" className={navItemClass}>Product</NavLink>
        </nav>
      </div>
    </header>
  );
}
