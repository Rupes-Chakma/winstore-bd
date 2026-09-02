import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingCart, ShieldCheck } from "lucide-react";
import { CartContext } from "../../context/CartContext";

export default function ProductCard({ edition, versionName }) {
  const { addToCart, cart } = useContext(CartContext);

  const isInCart = cart.some((item) => item.id === edition.id);

  return (
    <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/5 group">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            {edition.type}
          </span>
          <div className="flex items-center gap-1 text-green-400 text-xs font-medium bg-green-500/10 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>জেনুইন কি</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {edition.name}
        </h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {edition.desc}
        </p>

        <div className="mb-6 flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-white">
            ৳{edition.price}
          </span>
          <span className="text-slate-500 text-xs">/ লাইফটাইম</span>
        </div>

        <ul className="space-y-2.5 mb-6 text-sm text-slate-300">
          {edition.features.map((feat, index) => (
            <li key={index} className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2.5 pt-4 border-t border-slate-700/50">
        <button
          onClick={() => addToCart({ ...edition, versionName })}
          disabled={isInCart}
          className={`w-full py-2.5 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
            isInCart
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isInCart ? "কার্টে যুক্ত আছে" : "কার্টে যোগ করুন"}</span>
        </button>

        <Link
          to={`/product/${edition.id}`}
          className="block text-center w-full py-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          বিস্তারিত দেখুন &rarr;
        </Link>
      </div>
    </div>
  );
}
