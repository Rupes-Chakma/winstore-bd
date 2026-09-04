import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext"; // যদি ল্যাঙ্গুয়েজ প্রোভাইডার এখানে দিতে চান
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/layout/ScrollToTopButton"; // ১. ইমপোর্ট করুন
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-blue-500 selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />

          {/* ২. ফুটারের নিচে বা একদম শেষের দিকে এটি বসিয়ে দিন */}
          <ScrollToTopButton />
        </div>
      </Router>
    </CartProvider>
  );
}
