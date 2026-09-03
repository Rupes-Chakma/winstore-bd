import React, { useState } from "react";
import { X, CheckCircle, Copy, QrCode } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function CheckoutModal({
  isOpen,
  onClose,
  totalAmount = 0,
  onConfirm,
}) {
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Form States
  const [contactInfo, setContactInfo] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const paymentNumbers = {
    bKash: "01648582639",
    Nagad: "01648582639",
    Rocket: "01648582639",
  };

  const paymentQRs = {
    bKash: "/assets/bkash-qr.png",
    Nagad: "/assets/nagad-qr.png",
    Rocket: "/assets/rocket-qr.png",
  };

  if (!isOpen) return null;

  // ১. ফোন নম্বর ভ্যালিডেশন
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setSenderNumber(value);
    }
  };

  // ২. TrxID ভ্যালিডেশন
  const handleTrxChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (value.length <= 12) {
      setTrxId(value);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentNumbers[paymentMethod]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ৩. ফর্ম সাবমিশন
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(senderNumber)) {
      setErrorMsg(
        t("phoneError") ||
          "সঠিক ১১ ডিজিটের বাংলাদেশি ফোন নম্বর দিন (যেমন: 017xxxxxxxx)",
      );
      return;
    }

    const paymentData = {
      method: paymentMethod,
      contact: contactInfo,
      sender: senderNumber,
      trx: trxId,
      amount: totalAmount,
    };

    if (onConfirm && typeof onConfirm === "function") {
      onConfirm(paymentData);
    }

    setContactInfo("");
    setSenderNumber("");
    setTrxId("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">
            {t("securePayment") || "নিরাপদ পেমেন্ট"}
          </h3>
        </div>

        {/* Price Box */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-center mb-6">
          <p className="text-xs text-slate-400">
            {t("totalToPay") || "মোট পরিশোধ করতে হবে"}
          </p>
          <p className="text-3xl font-extrabold text-blue-400 mt-1">
            ৳{totalAmount}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Payment Method */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              ১. {t("selectPaymentMethod") || "পেমেন্ট মেথড নির্বাচন করুন"}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["bKash", "Nagad", "Rocket"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method);
                    setShowQR(false);
                  }}
                  className={`py-2.5 rounded-xl font-bold text-sm border transition flex items-center justify-center ${
                    paymentMethod === method
                      ? method === "bKash"
                        ? "bg-pink-600 text-white border-pink-500"
                        : method === "Nagad"
                          ? "bg-orange-600 text-white border-orange-500"
                          : "bg-purple-600 text-white border-purple-500"
                      : "bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Send Money Box */}
          <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-300">
                ২. <span className="font-bold">Send Money</span>{" "}
                {t("doSendMoney") || "করুন"}:
              </span>
              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="text-xs flex items-center gap-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-lg hover:bg-blue-600/30 transition"
              >
                <QrCode className="w-3.5 h-3.5" />
                {showQR
                  ? t("hideQR") || "QR লুকান"
                  : t("scanQR") || "QR স্ক্যান করুন"}
              </button>
            </div>

            {showQR ? (
              <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-lg border border-slate-800 mt-2">
                <img
                  src={paymentQRs[paymentMethod]}
                  alt={`${paymentMethod} QR`}
                  className="w-36 h-36 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150?text=QR+Code";
                  }}
                />
                <p className="text-xs text-slate-400 mt-2">
                  {t("scanWithApp") ||
                    `${paymentMethod} অ্যাপ দিয়ে স্ক্যান করুন`}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-3 mt-2">
                <span className="text-lg font-bold tracking-wider text-amber-400">
                  {paymentNumbers[paymentMethod]}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-md text-slate-200 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? t("copied") || "কপি হয়েছে!" : t("copy") || "কপি"}
                </button>
              </div>
            )}
          </div>

          {/* 3. Input Details */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-300">
              ৩. {t("providePaymentInfo") || "পেমেন্টের তথ্য দিন"}
            </label>

            <input
              type="text"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder={
                t("contactPlaceholder") ||
                "ইমেইল বা হোয়াটসঅ্যাপ নম্বর (যেখানে কি পাঠানো হবে)"
              }
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={senderNumber}
                onChange={handlePhoneChange}
                placeholder={
                  t("senderPlaceholder") ||
                  `আপনার ${paymentMethod} নম্বর (১১ ডিজিট)`
                }
                className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
              <input
                type="text"
                value={trxId}
                onChange={handleTrxChange}
                placeholder={t("trxPlaceholder") || "TRXID (ঐচ্ছিক)"}
                className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 mt-2"
          >
            <CheckCircle className="w-5 h-5" />
            {t("confirmOrder") || "অর্ডার কনফার্ম করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
