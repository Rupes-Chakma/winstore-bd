import React, { useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function ReviewSlider() {
  const scrollRef = useRef(null);

  const reviews = [
    { id: 1, img: "/assets/reviews/reviews1.png", name: "কামরুল হাসান" },
    { id: 2, img: "/assets/reviews/reviews2.png", name: "আরিফ আহমেদ" },
    { id: 3, img: "/assets/reviews/reviews3.png", name: "তানভীর হোসাইন" },
    { id: 4, img: "/assets/reviews/reviews4.png", name: "মাহমুদুল ইসলাম" },
    { id: 5, img: "/assets/reviews/reviews5.png", name: "সাকিব হাসান" },
  ];

  // বাটন দিয়ে একটি নির্দিষ্ট আইটেম পরিমাণ সরানোর ফাংশন
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      // একবারে একটি কার্ডের সাইজ অনুযায়ী (320px + gap) স্ক্রোল হবে
      const scrollAmount = 340;

      if (direction === "right") {
        // একদম শেষে পৌঁছে গেলে প্রথম কার্ডে ফেরত যাবে
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

  // ধীরে ধীরে স্লাইড হওয়ার জন্য অটো-টাইমার সেটআপ (৪ সেকেন্ড পর পর)
  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 4000); // ৪ সেকেন্ড পর পর স্মুথভাবে একটি করে কার্ড সরবে

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            গ্রাহকদের সন্তুষ্টি ও রিভিউ
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            আমাদের সম্মানিত গ্রাহকদের আসল পেমেন্ট ও অ্যাক্টিভেশন স্ক্রিনশট
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white p-2.5 rounded-full border border-slate-700 backdrop-blur transition shadow-xl hidden md:flex items-center justify-center"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-slate-800/80 hover:bg-slate-700 text-white p-2.5 rounded-full border border-slate-700 backdrop-blur transition shadow-xl hidden md:flex items-center justify-center"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Sliding Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="min-w-[280px] sm:min-w-[320px] bg-slate-900 border border-slate-800 rounded-2xl p-3 snap-center shrink-0 hover:border-slate-700 transition flex flex-col justify-between shadow-lg"
            >
              <div className="h-96 w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
                <img
                  src={rev.img}
                  alt={rev.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-sm font-semibold text-slate-300 mt-3">
                {rev.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
