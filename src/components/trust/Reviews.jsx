import React from "react";
import { Star, CheckCircle } from "lucide-react";

export default function Reviews() {
  const reviewsData = [
    {
      id: 1,
      name: "Rashedul Islam",
      product: "Windows 11 Pro",
      rating: 5,
      date: "২ দিন আগে",
      text: "খুব দ্রুত ইমেইলে লাইসেন্স কি পেয়েছি। পিসিতে অ্যাক্টিভ করতে কোনো ঝামেলা হয়নি। অরিজিনাল কি দেওয়ার জন্য ধন্যবাদ।",
    },
    {
      id: 2,
      name: "Tanim Ahmed",
      product: "Windows 10 Pro",
      rating: 5,
      date: "৫ দিন আগে",
      text: "প্রাইস অনুযায়ী সার্ভিস অনেক ভালো। বিকাশ পেমেন্ট করার ৫ মিনিটের মাথায় লাইসেন্স কি মেসেজে চলে আসছে।",
    },
    {
      id: 3,
      name: "Sajib Rahman",
      product: "Windows 11 Home",
      rating: 5,
      date: "১ সপ্তাহ আগে",
      text: "ল্যাপটপের জন্য নিয়েছিলাম। সাপোর্ট টিম খুব হেল্পফুল ছিল। ইনস্টল করতে সমস্যা হলে উনারা দেখিয়ে দিয়েছেন।",
    },
  ];

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          আমাদের গ্রাহকরা যা বলছেন
        </h2>
        <p className="text-slate-400">১০০০+ সন্তুষ্ট গ্রাহকের বিশ্বাস</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {reviewsData.map((review) => (
          <div
            key={review.id}
            className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 relative"
          >
            <div className="absolute -top-3 -right-3 bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md">
              <CheckCircle className="w-3 h-3" />
              Verified Buyer
            </div>

            <div className="flex gap-1 text-yellow-400 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              "{review.text}"
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">
                  {review.name}
                </h4>
                <p className="text-slate-500 text-xs">
                  {review.product} • {review.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
