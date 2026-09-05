import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { windowsData } from "../data/windowsData";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import {
  CheckCircle,
  ShieldCheck,
  ArrowLeft,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";
// আপনি চাইলে react-hot-toast ইনস্টল করে নিচের টোস্টটি ব্যবহার করতে পারেন (npm install react-hot-toast)
// import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  // পেজ ওপেন বা রেন্ডার হওয়ার সাথে সাথে স্ক্রিন একদম উপরে নিয়ে যাওয়ার জন্য
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { id } = useParams();
  const { addToCart, cart } = useContext(CartContext);
  const { t, language } = useLanguage();
  const [isAdding, setIsAdding] = useState(false); // বাটনে ক্লিক অ্যানিমেশন বা ফিডব্যাকের জন্য

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">
          {language === "English"
            ? "Product not found!"
            : "প্রোডাক্ট পাওয়া যায়নি!"}
        </h2>
        <Link
          to="/"
          className="text-blue-400 hover:underline flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          {language === "English" ? "Back to Home" : "হোম পেজে ফিরে যান"}
        </Link>
      </div>
    );
  }

  const isInCart = cart.some((item) => item.id === targetEdition.id);

  const handleAddToCart = () => {
    setIsAdding(true);

    // কার্টে অ্যাড করার ফাংশন কল
    addToCart({
      ...targetEdition,
      desc: t(targetEdition.descKey),
      versionName: targetVersion,
    });

    // অল্প একটু সময় পর অ্যানিমেশন স্টেট রিসেট করা
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />{" "}
        {language === "English"
          ? "View all Windows products"
          : "সব উইন্ডোজ প্রোডাক্ট দেখুন"}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full inline-block">
              {targetEdition.type} Edition
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-4 mb-2 tracking-tight">
              {targetEdition.name}
            </h1>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {t(targetEdition.descKey)}
            </p>

            <div className="border-t border-slate-800/80 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {language === "English" ? "Key Features:" : "মূল সুবিধাসমূহ:"}
              </h3>
              <ul className="space-y-3 text-slate-300">
                {targetEdition.featureKeys.map((featKey, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>{t(featKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />{" "}
              {language === "English"
                ? "How to Activate?"
                : "কিভাবে অ্যাক্টিভ করবেন?"}
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm leading-relaxed">
              <li>
                {language === "English"
                  ? "After completing the order, a 25-digit license key will be sent to your email and SMS."
                  : "অর্ডার সম্পন্ন করার পর আপনার ইমেইল ও এসএমএস-এ ২৫ ডিজিটের লাইসেন্স কি পাঠানো হবে।"}
              </li>
              <li>
                {language === "English" ? "Go to your PC's " : "আপনার পিসির "}
                <strong className="text-white">
                  Settings &gt; System &gt; Activation
                </strong>{" "}
                {language === "English" ? "option." : "অপশনে যান।"}
              </li>
              <li>
                {language === "English" ? "Click on " : ""}
                <strong className="text-white">Change Product Key</strong>{" "}
                {language === "English"
                  ? "button and input the license key to activate."
                  : "বাটনে ক্লিক করে লাইসেন্স কি-টি ইনপুট দিয়ে Activate করুন।"}
              </li>
            </ol>
          </div>
        </div>

        <div>
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sticky top-24 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {language === "English"
                  ? "100% Official License"
                  : "১০০% অফিশিয়াল লাইসেন্স"}
              </span>
            </div>

            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">
                {language === "English" ? "One-time Price" : "এককালীন মূল্য"}
              </span>
              <div className="text-4xl font-extrabold text-white mt-1">
                ৳{targetEdition.price}
              </div>
              <span className="text-slate-400 text-xs mt-0.5 block">
                {language === "English"
                  ? "Lifetime Usage & Updates"
                  : "লাইফটাইম ইউজেজ ও আপডেট"}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isInCart || isAdding}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-[0.98] ${
                isInCart
                  ? "bg-slate-800/80 text-slate-400 border border-slate-700/50 cursor-not-allowed"
                  : isAdding
                    ? "bg-blue-500 text-white scale-95 shadow-lg shadow-blue-500/30"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25"
              }`}
            >
              <ShoppingCart
                className={`w-5 h-5 ${isAdding ? "animate-bounce" : ""}`}
              />
              <span>
                {isInCart
                  ? language === "English"
                    ? "Added to Cart"
                    : "কার্টে যুক্ত আছে"
                  : isAdding
                    ? language === "English"
                      ? "Adding..."
                      : "যুক্ত হচ্ছে..."
                    : language === "English"
                      ? "Add to Cart"
                      : "কার্টে যোগ করুন"}
              </span>
            </button>

            <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800/80 pt-4">
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✔</span>
                {language === "English"
                  ? "Secure payment via bKash & Nagad"
                  : "বিকাশ ও নগদে নিরাপদ পেমেন্ট"}
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✔</span>
                {language === "English"
                  ? "24/7 Technical Support"
                  : "২৪/৭ টেকনিক্যাল সাপোর্ট সুবিধা"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
