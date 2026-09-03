import React, { useState } from "react";
import {
  X,
  Copy,
  CheckCircle,
  ShieldCheck,
  QrCode,
  Smartphone,
} from "lucide-react";

export default function CheckoutModal({
  isOpen,
  onClose,
  totalPrice = 0,
  clearCart,
}) {
  const [method, setMethod] = useState("bKash");
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    contact: "",
    senderNumber: "",
    trxId: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const paymentNumber = "01648582639";

  const qrImages = {
    bKash: "/assets/bkash-qr.png",
    Nagad: "/assets/nagad-qr.png",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ম্যানুয়াল ভ্যালিডেশন চেক
    if (!formData.contact.trim()) {
      setErrorMsg("দয়া করে ইমেইল বা হোয়াটসঅ্যাপ নম্বর দিন!");
      return;
    }
    if (!formData.senderNumber.trim()) {
      setErrorMsg("দয়া করে আপনার পেমেন্টকৃত বিকাশ/নগদ নম্বর দিন!");
      return;
    }

    setErrorMsg("");

    // কার্ট খালি করা এবং সাকসেস মেসেজ দেখানো
    if (typeof clearCart === "function") {
      clearCart();
    }
    setIsSuccess(true);
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
    setShowQR(false);
    setErrorMsg("");
    setFormData({ contact: "", senderNumber: "", trxId: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white">অর্ডার সফল হয়েছে!</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              আপনার দেওয়া তথ্যটি সফলভাবে জমা হয়েছে। আগামী{" "}
              <span className="text-emerald-400 font-semibold">
                ৫-১৫ মিনিটের মধ্যে
              </span>{" "}
              লাইসেন্স কি পাঠিয়ে দেওয়া হবে।
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/30"
            >
              ঠিক আছে
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span>নিরাপদ পেমেন্ট</span>
            </div>

            {/* Price Banner */}
            <div className="text-center my-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
              <span className="text-xs text-slate-400 uppercase tracking-wider block">
                মোট পরিশোধ করতে হবে
              </span>
              <span className="text-3xl font-extrabold text-blue-400">
                ৳{totalPrice}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400">
                ১. পেমেন্ট মেথড নির্বাচন করুন
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMethod("bKash")}
                  className={`py-2.5 rounded-xl font-bold text-sm transition border ${
                    method === "bKash"
                      ? "bg-pink-600/20 border-pink-500 text-pink-400"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  bKash
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("Nagad")}
                  className={`py-2.5 rounded-xl font-bold text-sm transition border ${
                    method === "Nagad"
                      ? "bg-orange-600/20 border-orange-500 text-orange-400"
                      : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  Nagad
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-3 p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 space-y-2">
              <div className="flex justify-between items-center">
                <span>
                  ২. <strong className="text-white">Send Money</strong> করুন:
                </span>
                <button
                  type="button"
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center gap-1 text-[11px] bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 px-2 py-1 rounded transition"
                >
                  {showQR ? (
                    <Smartphone className="w-3.5 h-3.5" />
                  ) : (
                    <QrCode className="w-3.5 h-3.5" />
                  )}
                  <span>{showQR ? "নম্বর দেখুন" : "QR স্ক্যান করুন"}</span>
                </button>
              </div>

              {showQR ? (
                <div className="text-center py-2 bg-slate-950 p-3 rounded-lg border border-slate-700">
                  <img
                    src={qrImages[method]}
                    alt={`${method} QR Code`}
                    className="w-36 h-36 mx-auto rounded-lg border border-slate-800 object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-700 font-mono text-sm text-yellow-400">
                  <span>{paymentNumber}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded transition border border-slate-700"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "কপি হয়েছে!" : "কপি"}
                  </button>
                </div>
              )}
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
              <label className="text-xs font-medium text-slate-400 block mb-1">
                ৩. পেমেন্টের তথ্য দিন
              </label>

              {errorMsg && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="ইমেইল বা হোয়াটসঅ্যাপ নম্বর (যেখানে কি পাঠানো হবে)"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    placeholder={`আপনার ${method} নম্বর`}
                    value={formData.senderNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, senderNumber: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="TrxID (ঐচ্ছিক)"
                    value={formData.trxId}
                    onChange={(e) =>
                      setFormData({ ...formData, trxId: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500 text-slate-100 placeholder-slate-500 font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span>অর্ডার কনফার্ম করুন</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
