import React, { useRef, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ReviewSlider() {
  const scrollRef = useRef(null);
  const { language } = useLanguage();

  const reviews = [
    {
      id: 1,
      img: "/assets/reviews/reviews1.png",
      name: "সুমাইয়া আক্তার",
      nameEn: "Sumaiya Akter",
      review:
        "সার্ভিস এক কথায় অসাধারণ! অর্ডার করার পর খুব দ্রুত প্রোডাক্ট পেয়েছি। প্রোডাক্টের মান দেখে আমি মুগ্ধ। ধন্যবাদ আপনাদের!",
      reviewEn:
        "Service is simply amazing! Received the product very quickly. Impressed by the quality. Thank you!",
    },
    {
      id: 2,
      img: "/assets/reviews/reviews2.png",
      name: "আরিফুল ইসলাম",
      nameEn: "Ariful Islam",
      review:
        "অনলাইনে অনেক শপিং করেছি, কিন্তু আপনাদের সার্ভিস আমার কাছে সবচেয়ে ভালো লেগেছে। প্রোডাক্ট ১০০% অরিজিনাল।",
      reviewEn:
        "I've shopped online a lot, but your service is the best. 100% original product.",
    },
    {
      id: 3,
      img: "/assets/reviews/reviews3.png",
      name: "তানিয়া ইসলাম",
      nameEn: "Tania Islam",
      review:
        "প্রোডাক্টের কোয়ালিটি সত্যিই চমৎকার। যেমনটা দেখেছিলাম, ঠিক তেমনই পেয়েছি। কাস্টমার সাপোর্টও খুবই হেল্পফুল।",
      reviewEn:
        "Product quality is truly fantastic. Got exactly what I saw. Customer support is also very helpful.",
    },
    {
      id: 4,
      img: "/assets/reviews/reviews4.png",
      name: "তানভীর হোসাইন",
      nameEn: "Tanvir Hossain",
      review:
        "খুব কম সময়ে জেনুইন লাইসেন্স কি পেয়েছি। কোনো ঝামেলা ছাড়াই অ্যাক্টিভেশন সম্পন্ন হয়েছে। হাইলি রিকমেন্ডেড!",
      reviewEn:
        "Got the genuine license key in no time. Activation was smooth without any hassle. Highly recommended!",
    },
    {
      id: 5,
      img: "/assets/reviews/reviews5.png",
      name: "সাকিব হাসান",
      nameEn: "Sakib Hasan",
      review:
        "বিশ্বস্ত একটি পেজ। দামেও কম এবং সাপোর্টও খুব ফাস্ট। ভবিষ্যতে আরও নিব ইনশাআল্লাহ।",
      reviewEn:
        "A trustworthy page. Affordable price and very fast support. Will buy more in sha Allah.",
    },
  ];

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = 400;

      if (direction === "right") {
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollLeft <= 0) {
          scrollRef.current.scrollTo({
            left: scrollWidth,
            behavior: "smooth",
          });
        } else {
          scrollRef.current.scrollTo({
            left: scrollLeft - scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-amber-500/5">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>
              {language === "English"
                ? "Customer Satisfaction & Reviews"
                : "গ্রাহকদের সন্তুষ্টি ও রিভিউ"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {language === "English"
              ? "Trusted by Our Clients"
              : "আমাদের সম্মানিত গ্রাহকগণ"}
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {language === "English"
              ? "Real experiences and reviews shared by our valued customers."
              : "দেশজুড়ে আমাদের সম্মানিত গ্রাহকদের শেয়ার করা আসল অভিজ্ঞতা।"}
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 hover:bg-blue-600 text-white p-3.5 rounded-full border border-slate-700/80 backdrop-blur-md transition-all shadow-2xl hidden md:flex items-center justify-center group"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 hover:bg-blue-600 text-white p-3.5 rounded-full border border-slate-700/80 backdrop-blur-md transition-all shadow-2xl hidden md:flex items-center justify-center group"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Sliding Cards Container */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar py-8 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[320px] sm:min-w-[380px] md:min-w-[420px] bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 pt-12 snap-center shrink-0 transition-all duration-300 shadow-2xl flex flex-col justify-between relative group mt-6"
            >
              {/* Top Left Floating Avatar (Inspired by your reference image) */}
              <div className="absolute -top-7 left-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-slate-950 bg-slate-900 shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={rev.img}
                    alt={language === "English" ? rev.nameEn : rev.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Verified Dot */}
                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full border-2 border-slate-950">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Main Content */}
              <div>
                {/* Name & Verified Tag */}
                <div className="flex flex-col mb-4 pt-2">
                  <h3 className="text-white font-extrabold text-xl md:text-2xl tracking-wide group-hover:text-blue-400 transition-colors">
                    {language === "English" ? rev.nameEn : rev.name}
                  </h3>
                  <span className="text-xs text-blue-400 font-medium mt-0.5">
                    {language === "English"
                      ? "Verified Customer"
                      : "ভেরিফাইড কাস্টমার"}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-normal">
                  "{language === "English" ? rev.reviewEn : rev.review}"
                </p>
              </div>

              {/* Bottom: Stars & Quote Icon */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-slate-700/60 group-hover:text-blue-500/40 transition-colors rotate-180" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
