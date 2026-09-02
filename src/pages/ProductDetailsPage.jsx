import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { windowsData } from "../data/windowsData";
import { CartContext } from "../context/CartContext";
import {
  CheckCircle,
  ShieldCheck,
  ArrowLeft,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);

  let targetEdition = null;
  let targetVersion = "";

  for (const version of windowsData) {
    const found = version.editions.find((e) => e.id === id);
    if (found) {
      targetEdition = found;
      targetVersion = version.versionName;
      break;
    }
  }

  if (!targetEdition) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          প্রোডাক্ট পাওয়া যায়নি!
        </h2>
        <Link
          to="/"
          className="text-blue-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isInCart = cart.some((item) => item.id === targetEdition.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> সব উইন্ডোজ প্রোডাক্ট দেখুন
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
              {targetEdition.type} Edition
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-4 mb-2">
              {targetEdition.name}
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {targetEdition.desc}
            </p>

            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                মূল সুবিধাসমূহ:
              </h3>
              <ul className="space-y-3 text-slate-300">
                {targetEdition.features.map((feat, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/30 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" /> কিভাবে অ্যাক্টিভ
              করবেন?
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm leading-relaxed">
              <li>
                অর্ডার সম্পন্ন করার পর আপনার ইমেইল ও এসএমএস-এ ২৫ ডিজিটের
                লাইসেন্স কি পাঠানো হবে।
              </li>
              <li>
                আপনার পিসির{" "}
                <strong>Settings &gt; System &gt; Activation</strong> অপশনে যান।
              </li>
              <li>
                <strong>Change Product Key</strong> বাটনে ক্লিক করে লাইসেন্স
                কি-টি ইনপুট দিয়ে Activate করুন।
              </li>
            </ol>
          </div>
        </div>

        <div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 sticky top-24 space-y-6">
            <div className="flex items-center gap-2 text-green-400 text-xs font-medium bg-green-500/10 px-3 py-1 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% অফিশিয়াল লাইসেন্স</span>
            </div>

            <div>
              <span className="text-slate-400 text-sm">এককালীন মূল্য</span>
              <div className="text-4xl font-extrabold text-white mt-1">
                ৳{targetEdition.price}
              </div>
              <span className="text-slate-400 text-xs">
                লাইফটাইম ইউজেজ ও আপডেট
              </span>
            </div>

            <button
              onClick={() =>
                addToCart({ ...targetEdition, versionName: targetVersion })
              }
              disabled={isInCart}
              className={`w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                isInCart
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{isInCart ? "কার্টে যুক্ত আছে" : "কার্টে যোগ করুন"}</span>
            </button>

            <div className="text-xs text-slate-400 space-y-2 border-t border-slate-700/50 pt-4">
              <p>✔ বিকাশ ও নগদে নিরাপদ পেমেন্ট</p>
              <p>✔ ২৪/৭ টেকনিক্যাল সাপোর্ট সুবিধা</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
