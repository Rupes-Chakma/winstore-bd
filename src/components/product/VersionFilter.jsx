import React from "react";
import { useLanguage } from "../../context/LanguageContext"; // আপনার প্রজেক্টের পাথ অনুযায়ী এটি ঠিক করে নেবেন

export default function VersionFilter({ selectedVersion, setSelectedVersion }) {
  const { language } = useLanguage();

  // ফিল্টার অপশনগুলোর id সরাসরি windowsData.js এর id গুলোর সাথে মিলিয়ে দেওয়া হয়েছে
  const filters = [
    { id: "all", labelBn: "সব ভার্সন", labelEn: "All Versions" },
    { id: "win11", labelBn: "Windows 11", labelEn: "Windows 11" },
    { id: "win10", labelBn: "Windows 10", labelEn: "Windows 10" },
    { id: "win7", labelBn: "Windows 7", labelEn: "Windows 7" },
    {
      id: "win-server",
      labelBn: "Windows Server",
      labelEn: "Windows Server",
    },
    { id: "ms-office", labelBn: "MS Office", labelEn: "MS Office" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 my-8">
      {filters.map((filter) => {
        const isActive = selectedVersion === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setSelectedVersion(filter.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
              isActive
                ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30"
                : "bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {language === "English" ? filter.labelEn : filter.labelBn}
          </button>
        );
      })}
    </div>
  );
}
