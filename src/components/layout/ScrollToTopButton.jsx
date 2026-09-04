import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // বর্তমান স্ক্রল পজিশন
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight; // মোট স্ক্রলযোগ্য উচ্চতা
      const scrollPercent = (scrollTop / docHeight) * 100; // পার্সেন্টেজ হিসাব

      setScrollProgress(scrollPercent);

      // ৫০% বা তার বেশি নামলে বাটন দেখাবে
      if (scrollPercent > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ক্লিক করলে স্মুথলি একদম উপরে চলে যাবে
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  // SVG সার্কেল ক্যালকুলেশন (ব্যাসার্ধ ১৮ হলে পরিধি প্রায় ১১৩)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 left-6 z-50 p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-full shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer border border-slate-700 backdrop-blur-md group animate-[waterDrop_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]"
    >
      {/* স্টাইলিশ ওয়াটার ড্রপ বা বাউন্স অ্যানিমেশনের জন্য ইনলাইন কাস্টম কি-ফ্রেম */}
      <style>{`
        @keyframes waterDrop {
          0% {
            opacity: 0;
            transform: translateY(-30px) scale(0.6);
          }
          60% {
            opacity: 1;
            transform: translateY(6px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* সার্কুলার প্রোগ্রেস রিং (SVG) */}
      <svg
        className="absolute w-12 h-12 -rotate-90 pointer-events-none"
        viewBox="0 0 44 44"
      >
        {/* ব্যাকগ্রাউন্ড ট্র্যাক সার্কেল */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          strokeWidth="3"
          className="stroke-slate-700 fill-transparent"
        />
        {/* রানিং প্রোগ্রেস সার্কেল */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          strokeWidth="3"
          className="stroke-blue-500 fill-transparent transition-all duration-100"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            strokeLinecap: "round",
          }}
        />
      </svg>

      {/* মাঝের আপ-অ্যারো আইকন */}
      <ArrowUp className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors duration-200" />
    </button>
  );
}
