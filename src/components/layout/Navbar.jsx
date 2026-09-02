import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Monitor } from "lucide-react";
import { CartContext } from "../../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-400 hover:text-blue-300 transition"
        >
          <Monitor className="w-6 h-6" />
          <span>WinStore BD</span>
        </Link>

        {/* Links & Cart Icon */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-400 transition font-medium text-sm"
          >
            হোম
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-600/20"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>কার্ট</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white font-bold px-2 py-0.5 rounded-full border-2 border-slate-900 animate-pulse">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
