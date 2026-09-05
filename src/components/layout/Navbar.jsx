import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Monitor, Globe } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { language, setLanguage, t } = useLanguage();

  // লোগো বা হোম লিঙ্কে ক্লিক করলে স্মুথলি একদম উপরে স্ক্রল করার ফাংশন
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-xl font-bold text-blue-400 hover:text-blue-300 transition"
        >
          <Monitor className="w-6 h-6" />
          <span>
            Key<span className="text-white">ShopBD</span>
          </span>
        </Link>

        {/* Links, Language Toggle & Cart Icon */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="hover:text-blue-400 transition font-medium text-sm hidden sm:block"
          >
            {t("home")}
          </Link>

          {/* 🌐 Language Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer py-1"
            >
              <option value="English" className="bg-slate-900 text-white">
                EN
              </option>
              <option value="Bengali" className="bg-slate-900 text-white">
                BN
              </option>
            </select>
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-medium transition shadow-lg shadow-blue-600/20"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t("cart")}</span>
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
