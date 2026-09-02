import React, { useState } from "react";
import { MessageCircle, X, Phone, Send } from "lucide-react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "8801648582639";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("হ্যালো! আমি উইন্ডোজ লাইসেন্স কি সম্পর্কে জানতে চাই।")}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-slate-900 border border-slate-700 w-80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-lg">
                  W
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-semibold text-sm">WinStoreBD সাপোর্ট</h4>
                <p className="text-xs text-blue-100">অনলাইন আছেন (২৪/৭)</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-500 p-1 rounded-lg transition text-blue-100 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-slate-950/60 space-y-3">
            <div className="bg-slate-800 border border-slate-700 text-slate-200 text-sm p-3 rounded-xl rounded-tl-none max-w-[85%] leading-relaxed">
              স্বাগতম! কোনো প্রশ্ন বা সাহায্যের প্রয়োজন হলে নিচে ক্লিক করে
              সরাসরি আমাদের সাথে হোয়াটসঅ্যাপ বা কলে যোগাযোগ করুন।
            </div>
          </div>

          <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-lg shadow-emerald-600/20"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp-এ চ্যাট করুন</span>
            </a>

            <a
              href={`tel:+${phoneNumber}`}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition border border-slate-700"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>সরাসরি কল দিন: +880 1648-582639</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        aria-label="Live Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute right-0 top-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
