import React, { useState } from "react";
import VersionFilter from "../components/product/VersionFilter";
import ProductCard from "../components/product/ProductCard";
import Reviews from "../components/trust/Reviews";
import LiveChat from "../components/trust/LiveChat";
import { windowsData } from "../data/windowsData";
import { Shield, Zap, RefreshCw } from "lucide-react";

export default function HomePage() {
  const [selectedVersion, setSelectedVersion] = useState("all");

  const filteredData =
    selectedVersion === "all"
      ? windowsData
      : windowsData.filter((item) => item.id === selectedVersion);

  return (
    <div className="min-h-screen text-slate-100">
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
            <Zap className="w-3.5 h-3.5" /> ইনস্ট্যান্ট ডেলিভারি ও ১০০% অফিশিয়াল
            লাইসেন্স
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            আপনার পিসির জন্য অরিজিনাল <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Windows OS প্রোডাক্ট কি
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
            কোনো ক্র্যাক বা ভুয়া সফটওয়্যার ব্যবহার না করে জেনুইন উইন্ডোজ
            লাইসেন্স কি ব্যবহার করুন। সম্পূর্ণ জেনুইন সিকিউরিটি ও অফিশিয়াল আপডেট
            পান সহজেই।
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-slate-300 text-sm font-medium">
            <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50">
              <Shield className="w-4 h-4 text-blue-400" />
              <span>১০০% জেনুইন গ্যারান্টি</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>ইন্সট্যান্ট ইমেইল ও এসএমএস ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>লাইফটাইম মেয়াদ ও আপডেট</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-6" id="products">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            উইন্ডোজ ভার্সন বেছে নিন
          </h2>
          <p className="text-slate-400 text-sm">
            আপনার পছন্দের এডিশনটি নির্বাচন করুন
          </p>
        </div>

        <VersionFilter
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />

        <div className="space-y-12">
          {filteredData.map((version) => (
            <div key={version.id} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white">
                  {version.versionName} Edition-সমূহ
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {version.editions.map((edition) => (
                  <ProductCard
                    key={edition.id}
                    edition={edition}
                    versionName={version.versionName}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Reviews />
      <LiveChat />
    </div>
  );
}
