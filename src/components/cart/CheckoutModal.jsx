import React, { useState } from "react";
import {
  X,
  CheckCircle,
  Copy,
  QrCode,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
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

  // Validate mobile number
  const validateNumber = (value) => {
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (value.length > 0 && !bdPhoneRegex.test(value)) {
      setErrorMsg(
        t("phoneError") ||
          "Please enter a valid 11-digit Bangladeshi mobile number (e.g., 017XXXXXXXX)",
      );
    } else {
      setErrorMsg("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setSenderNumber(value);
      validateNumber(value);
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(senderNumber)) {
      setErrorMsg(
        t("phoneError") ||
          "Please enter a valid 11-digit Bangladeshi mobile number (e.g., 017XXXXXXXX)",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-slate-800/80 rounded-3xl p-6 md:p-7 shadow-2xl text-slate-100">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {t("secureCheckout") || "Secure Checkout"}
              </h3>
              <p className="text-xs text-slate-400">
                {t("completePaymentSecurely") ||
                  "Complete your payment securely"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Price Banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-4 mb-6">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              {t("totalPayableAmount") || "Total Payable Amount"}
            </span>
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mt-0.5">
              ৳{totalAmount}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-semibold">
              {t("encryptedAndSecure") || "Encrypted & Secure"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Payment Method Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              1. {t("selectPaymentMethod") || "Select Payment Method"}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {["bKash", "Nagad", "Rocket"].map((method) => {
                const isActive = paymentMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method);
                      setShowQR(false);
                    }}
                    className={`py-2.5 px-3 rounded-xl font-bold text-xs tracking-wide border transition-all flex items-center justify-center ${
                      isActive
                        ? method === "bKash"
                          ? "bg-pink-600/90 text-white border-pink-500 shadow-lg shadow-pink-600/20 ring-1 ring-pink-400"
                          : method === "Nagad"
                            ? "bg-orange-600/90 text-white border-orange-500 shadow-lg shadow-orange-600/20 ring-1 ring-orange-400"
                            : "bg-purple-600/90 text-white border-purple-500 shadow-lg shadow-purple-600/20 ring-1 ring-purple-400"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Account Number Box */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                2. {t("sendMoneyToThisNumber") || `Send Money to this number`}
              </span>
              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="text-xs flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium transition"
              >
                <QrCode className="w-3.5 h-3.5" />
                {showQR
                  ? t("viewNumber") || "View Number"
                  : t("qrCode") || "QR Code"}
              </button>
            </div>

            {showQR ? (
              <div className="flex flex-col items-center justify-center p-3 bg-slate-900/80 rounded-xl border border-slate-800 mt-2">
                <img
                  src={paymentQRs[paymentMethod]}
                  alt={`${paymentMethod} QR`}
                  className="w-32 h-32 object-contain rounded-lg bg-white p-1"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150?text=QR+Code";
                  }}
                />
                <p className="text-[11px] text-slate-400 mt-2">
                  {t("scanWithApp") || `Scan with your ${paymentMethod} app`}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-900/70 border border-slate-800/80 rounded-xl px-3.5 py-2.5 mt-1">
                <span className="text-base font-bold tracking-wider text-amber-400 font-mono">
                  {paymentNumbers[paymentMethod]}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 px-3 py-1.5 rounded-lg text-slate-200 transition font-medium"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  {copied ? t("copied") || "Copied!" : t("copy") || "Copy"}
                </button>
              </div>
            )}
          </div>

          {/* 3. Form Inputs */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
              3. {t("providePaymentInfo") || "Provide Payment Information"}
            </label>

            <input
              type="text"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder={
                t("contactPlaceholder") ||
                "Your Email or WhatsApp number (for delivery)"
              }
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 transition"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                required
                value={senderNumber}
                onChange={handlePhoneChange}
                maxLength={11}
                placeholder={
                  t("senderNumberPlaceholder") || "Sender Number (017XXXXXXXX)"
                }
                className={`bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition font-mono ${
                  errorMsg
                    ? "border-red-500/80 focus:border-red-500"
                    : "border-slate-800 focus:border-blue-500/80"
                }`}
              />
              <input
                type="text"
                value={trxId}
                onChange={handleTrxChange}
                placeholder={t("trxPlaceholder") || "TrxID (Optional)"}
                className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/80 transition font-mono uppercase"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-[0.98]"
          >
            <CheckCircle className="w-4 h-4" />
            {t("confirmPayment") || "Confirm Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
