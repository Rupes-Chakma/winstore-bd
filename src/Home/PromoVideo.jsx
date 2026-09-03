import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function PromoVideo() {
  const { language } = useLanguage();

  return (
    <div className="my-12 max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
        {language === "English"
          ? "Why Buy From Us & Activation Guide"
          : "কেন আমাদের থেকে কিনবেন ও অ্যাক্টিভেশন গাইড"}
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        {language === "English"
          ? "Watch the video below to see how fast you get your license."
          : "নিচের ভিডিওটি দেখে জেনে নিন কীভাবে খুব দ্রুত লাইসেন্স পাবেন।"}
      </p>

      {/* রেসপনসিভ ভিডিও প্লেয়ার কন্টেইনার */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 bg-slate-900">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/d-s778LGf3M"
          title="Promo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
