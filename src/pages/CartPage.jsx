import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CheckoutModal from "../components/cart/CheckoutModal";
import { Trash2, ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } =
    useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirmOrder = (paymentData) => {
    setIsModalOpen(false);
    clearCart();
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-slate-800/60 border border-slate-700 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-white">অর্ডার সফল হয়েছে!</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          আপনার পেমেন্ট ভেরিফাই করে আগামী ৫-১০ মিনিটের মধ্যে ইমেইল ও এসএমএস-এর
          মাধ্যমে লাইসেন্স কি পাঠিয়ে দেওয়া হবে।
        </p>
        <Link
          to="/"
          onClick={() => setOrderConfirmed(false)}
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition mt-4"
        >
          আরও শপিং করুন
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="w-16 h-16 text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          আপনার কার্ট খালি!
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          কার্টে কোনো উইন্ডোজ প্রোডাক্ট যোগ করা হয়নি।
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> প্রোডাক্ট ক্যাটালগ দেখুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        আপনার শপিং কার্ট
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-white text-base">
                  {item.name}
                </h3>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {item.versionName || "Windows"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-white">৳{item.price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition"
                  title="রিমুভ করুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3">
              অর্ডার সামারি
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>মোট আইটেম:</span>
                <span className="text-white font-medium">{cart.length} টি</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ডেলিভারি চার্জ:</span>
                <span className="text-green-400 font-medium">
                  ফ্রি (ইন্সট্যান্ট)
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white border-t border-slate-700 pt-3">
                <span>সর্বমোট:</span>
                <span className="text-blue-400">৳{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              অর্ডার করুন (bKash/Nagad)
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={totalPrice}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
