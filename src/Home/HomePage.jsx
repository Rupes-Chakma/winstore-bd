import React, { useState } from "react";
import SEO from "../components/SEO";
import VersionFilter from "../components/product/VersionFilter";
import ProductCard from "../components/product/ProductCard";
import { windowsData } from "../data/windowsData";

export default function HomePage() {
  const [selectedVersion, setSelectedVersion] = useState("all");

  // সিলেক্ট করা ভার্সন অনুযায়ী প্রোডাক্ট ফিল্টার করার লজিক
  const filteredData =
    selectedVersion === "all"
      ? windowsData
      : windowsData.filter((item) => item.id === selectedVersion);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <SEO
        title="হোম - জেনুইন উইন্ডোজ ও সফটওয়্যার লাইসেন্স কি"
        description="বাংলাদেশ থেকে সবচেয়ে কম দামে জেনুইন উইন্ডোজ ১১, ১০ ও মাইক্রোসফট অফিস লাইসেন্স কি কিনুন।"
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          উইন্ডোজ ভার্সন বেছে নিন
        </h1>
        <p className="text-slate-400 text-center text-sm mb-6">
          আপনার পছন্দের এডিশনটি নির্বাচন করুন
        </p>

        {/* ফিল্টার বাটনসমূহ */}
        <VersionFilter
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />

        {/* প্রোডাক্ট কার্ডস গ্রিড সেকশন */}
        <div className="space-y-12 mt-8">
          {filteredData.map((version) => (
            <div key={version.id} className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                {version.versionName}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {version.editions.map((edition) => (
                  <ProductCard key={edition.id} edition={edition} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
