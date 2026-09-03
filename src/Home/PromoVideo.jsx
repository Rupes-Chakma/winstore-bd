import React from "react";
import { Play } from "lucide-react";

export default function PromoVideo() {
  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          কীভাবে উইন্ডোজ লাইসেন্স সচল করবেন?
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          মাত্র ১ মিনিটে জেনে নিন কীভাবে আমাদের থেকে লাইসেন্স কি নিয়ে
          অ্যাক্টিভেট করবেন
        </p>

        {/* Video Wrapper */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/d-s778LGf3M" // আপনার ইউটিউব ভিডিও আইডি বসাবেন
            title="Promotional Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
