import React, { useState } from "react";
import {
  X,
  CheckCircle,
  Copy,
  QrCode,
  AlertCircle,
  ShieldCheck,
  Loader2,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [contactInfo, setContactInfo] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [contactError, setContactError] = useState("");
  const [senderError, setSenderError] = useState("");

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

  // Contact Info Validation
  const handleContactChange = (e) => {
    let value = e.target.value;
    const fullBdPhoneRegex = /^01[3-9]\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (/^\d/.test(value)) {
      value = value.replace(/\D/g, "");
      if (value.length > 11) return;
    }

    setContactInfo(value);

    if (value.length === 0) {
      setContactError("");
    } else if (/^\d/.test(value)) {
      if (!fullBdPhoneRegex.test(value)) {
        setContactError("Please enter a valid 11-digit mobile number");
      } else {
        setContactError("");
      }
    } else {
      if (!emailRegex.test(value)) {
        setContactError("Please enter a valid email address");
      } else {
        setContactError("");
      }
    }
  };

  // Sender Number Validation
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setSenderNumber(value);
      const bdPhoneRegex = /^01[3-9]\d{8}$/;
      if (value.length > 0 && !bdPhoneRegex.test(value)) {
        setSenderError("Please enter a valid 11-digit BD sender number");
      } else {
        setSenderError("");
      }
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
    setContactError("");
    setSenderError("");

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let hasError = false;

    if (/^\d/.test(contactInfo)) {
      if (!bdPhoneRegex.test(contactInfo)) {
        setContactError("Please enter a valid 11-digit mobile number");
        hasError = true;
      }
    } else {
      if (!emailRegex.test(contactInfo)) {
        setContactError("Please enter a valid email address");
        hasError = true;
      }
    }

    if (!bdPhoneRegex.test(senderNumber)) {
      setSenderError("Please enter a valid 11-digit BD sender number");
      hasError = true;
    }

    if (hasError) return;

    const paymentData = {
      method: paymentMethod,
      contact: contactInfo,
      sender: senderNumber,
      trx: trxId,
      amount: totalAmount,
    };

    setIsSubmitting(true);

    setTimeout(() => {
      if (onConfirm && typeof onConfirm === "function") {
        onConfirm(paymentData);
      }
      setIsSubmitting(false);
      setContactInfo("");
      setSenderNumber("");
      setTrxId("");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-md animate-fade-in">
      {/* Reduced padding, max-width, and gaps for a compact size */}
      <div className="relative w-full max-w-sm bg-[#0f172a] border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-2xl text-slate-100 max-h-[96vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {t("secureCheckout") || "Secure Checkout"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {t("completePaymentSecurely") ||
                  "Complete your payment securely"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal Price Banner */}
        <div className="flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800/80 rounded-xl p-3 mb-4">
          <div>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {t("totalPayableAmount") || "Total Payable Amount"}
            </span>
            <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mt-0.5">
              ৳{totalAmount}
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-semibold">
              {t("encryptedAndSecure") || "Encrypted & Secure"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 1. Payment Method Selection */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              1. {t("selectPaymentMethod") || "Select Payment Method"}
            </label>
            <div className="grid grid-cols-3 gap-2">
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
                    const
                    className={`py-2 px-2.5 rounded-lg font-bold text-xs tracking-wide border transition-all flex items-center justify-center cursor-pointer ${
                      isActive
                        ? method === "bKash"
                          ? "bg-pink-600/90 text-white border-pink-500 shadow-md shadow-pink-600/20 ring-1 ring-pink-400"
                          : method === "Nagad"
                            ? "bg-orange-600/90 text-white border-orange-500 shadow-md shadow-orange-600/20 ring-1 ring-orange-400"
                            : "bg-purple-600/90 text-white border-purple-500 shadow-md shadow-purple-600/20 ring-1 ring-purple-400"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-250"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Account Number Box */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                2. {t("sendMoneyToThisNumber") || `Send Money to this number`}
              </span>
              <button
                type="button"
                onClick={() => setShowQR(!showQR)}
                className="text-[11px] flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer"
              >
                <QrCode className="w-3 h-3" />
                {showQR
                  ? t("viewNumber") || "View Number"
                  : t("qrCode") || "QR"}
              </button>
            </div>

            {showQR ? (
              <div className="flex flex-col items-center justify-center p-2 bg-slate-900/80 rounded-lg border border-slate-800 mt-1">
                <img
                  src={paymentQRs[paymentMethod]}
                  alt={`${paymentMethod} QR`}
                  className="w-28 h-28 object-contain rounded-md bg-white p-1"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/150?text=QR+Code";
                  }}
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  {t("scanWithApp") || `Scan with ${paymentMethod} app`}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-slate-900/70 border border-slate-800/80 rounded-lg px-3 py-2 mt-1">
                <span className="text-sm font-bold tracking-wider text-amber-400 font-mono">
                  {paymentNumbers[paymentMethod]}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 px-2.5 py-1 rounded-md text-slate-200 transition font-medium cursor-pointer"
                >
                  <Copy className="w-3 h-3 text-slate-400" />
                  {copied ? t("copied") || "Copied!" : t("copy") || "Copy"}
                </button>
              </div>
            )}
          </div>

          {/* 3. Form Inputs */}
          <div className="space-y-2.5">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              3. {t("providePaymentInfo") || "Provide Payment Information"}
            </label>

            {/* First Input */}
            <div>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={handleContactChange}
                maxLength={contactInfo.startsWith("0") ? 11 : undefined}
                placeholder="Email Address or WhatsApp Number for Key Delivery"
                className={`w-full bg-slate-950/60 border rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                  contactError
                    ? "border-red-500/80 focus:border-red-500"
                    : "border-slate-800 focus:border-blue-500/80"
                }`}
              />
              {contactError && (
                <p className="text-[10px] text-red-400 mt-0.5 ml-1">
                  {contactError}
                </p>
              )}
            </div>

            {/* Second Row Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  required
                  value={senderNumber}
                  onChange={handlePhoneChange}
                  maxLength={11}
                  placeholder="Enter payment number (Sender Number)"
                  className={`w-full bg-slate-950/60 border rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition font-mono ${
                    senderError
                      ? "border-red-500/80 focus:border-red-500"
                      : "border-slate-800 focus:border-blue-500/80"
                  }`}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={trxId}
                  onChange={handleTrxChange}
                  placeholder={t("trxPlaceholder") || "TrxID (Optional)"}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/80 transition font-mono uppercase"
                />
              </div>
            </div>

            {/* Sender Error Message Box */}
            {senderError && (
              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 p-2 rounded-xl text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{senderError}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>{t("processing") || "Processing Payment..."}</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t("confirmPayment") || "Confirm Payment"}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
