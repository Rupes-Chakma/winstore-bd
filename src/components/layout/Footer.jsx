import React from "react";
import { ShieldCheck, PhoneCall, Mail } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-10 pb-6 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">WinStore BD</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            আমরা প্রদান করি ১০০% অরিজিনাল ও জেনুইন উইন্ডোজ প্রোডাক্ট কি।
            লাইফটাইম অ্যাক্টিভেশন ও ১-টু-১ ইনস্ট্যান্ট সাপোর্টের বিশ্বস্ত
            মাধ্যম।
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            কেন আমাদের বেছে নেবেন?
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" /> ১০০% অরিজিনাল
              লাইসেন্স কি
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" /> ইনস্ট্যান্ট
              ইমেইল ও এসএমএস ডেলিভারি
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" /> বিকাশ/নগদে
              নিরাপদ পেমেন্ট
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">যোগাযোগ</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-400" /> +880 1648-582639
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" /> support@winstorebd.com
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 border-t border-slate-800 pt-4">
        &copy; {new Date().getFullYear()} WinStore BD. All rights reserved.
      </div>
    </footer>
  );
}
