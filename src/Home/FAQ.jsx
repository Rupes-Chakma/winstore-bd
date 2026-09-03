import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Headset,
  RefreshCw,
  KeyRound,
  Mail,
  Clock,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0); // ১ম প্রশ্নটি ডিফল্টভাবে খোলা থাকবে

  const faqs = [
    {
      q: t("faq1Q"),
      a: t("faq1A"),
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
    {
      q: t("faq2Q"),
      a: t("faq2A"),
      icon: <Clock className="w-5 h-5 text-blue-400 shrink-0" />,
    },
    {
      q: t("faq3Q"),
      a: t("faq3A"),
      icon: <RefreshCw className="w-5 h-5 text-indigo-400 shrink-0" />,
    },
    {
      q: t("faq4Q"),
      a: t("faq4A"),
      icon: <KeyRound className="w-5 h-5 text-amber-400 shrink-0" />,
    },
    {
      q: t("faq5Q"),
      a: t("faq5A"),
      icon: <Mail className="w-5 h-5 text-purple-400 shrink-0" />,
    },
    {
      q: t("faq6Q"),
      a: t("faq6A"),
      icon: <Headset className="w-5 h-5 text-rose-400 shrink-0" />,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-16 max-w-4xl mx-auto px-4">
      {/* FAQ Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-blue-600/10 text-blue-400 rounded-2xl mb-3 border border-blue-500/20">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {t("faqTitle")}
        </h2>
        <p className="text-slate-400 text-sm mt-2">{t("faqSub")}</p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-slate-900/60 border rounded-2xl overflow-hidden transition-all duration-300 ${
              openIndex === index
                ? "border-blue-500/50 bg-slate-900/90 shadow-lg shadow-blue-500/5"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-5 flex justify-between items-center gap-4 text-slate-100 font-semibold focus:outline-none"
            >
              <div className="flex items-center gap-3">
                {faq.icon}
                <span className="text-base md:text-lg text-slate-200">
                  {faq.q}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-blue-400 transition-transform duration-300 shrink-0 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 pl-12 text-sm md:text-base text-slate-300 border-t border-slate-800/60 pt-4 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
