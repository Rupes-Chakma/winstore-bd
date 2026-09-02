import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck } from "lucide-react";

export default function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  onConfirm,
}) {
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phone, setPhone] = useState("");
  const [trxId, setTrxId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone && trxId) {
      onConfirm({ paymentMethod, phone, trxId });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-800/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            পেমেন্ট নিশ্চিত করুন
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-slate-400 text-sm mb-1">পরিশোধ করতে হবে</p>
            <p className="text-3xl font-extrabold text-blue-400">
              ৳{totalAmount}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Payment Method Selector */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                পেমেন্ট মেথড নির্বাচন করুন
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`flex-1 py-2.5 rounded-lg border font-medium text-sm transition ${
                    paymentMethod === "bkash"
                      ? "bg-pink-600/10 border-pink-500 text-pink-400"
                      : "border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  bKash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("nagad")}
                  className={`flex-1 py-2.5 rounded-lg border font-medium text-sm transition ${
                    paymentMethod === "nagad"
                      ? "bg-orange-600/10 border-orange-500 text-orange-400"
                      : "border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  Nagad
                </button>
              </div>
            </div>

            {/* Instruction */}
            <div className="bg-slate-800 p-3 rounded-lg text-sm text-slate-300 border border-slate-700">
              দয়া করে আপনার {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} থেকে
              <span className="font-bold text-white tracking-wider mx-1">
                01648582639
              </span>
              নম্বরে Send Money করুন।
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder={`আপনার ${paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} নম্বর`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <input
                  type="text"
                  required
                  placeholder="Transaction ID (TrxID)"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl flex justify-center items-center gap-2 transition"
            >
              <CheckCircle className="w-5 h-5" />
              অর্ডার কনফার্ম করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
