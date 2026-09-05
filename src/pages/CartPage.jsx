import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import CheckoutModal from "../components/cart/CheckoutModal";
import { Trash2, ShoppingBag, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } =
    useContext(CartContext);
  const { language } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirmOrder = (paymentData) => {
    const myWhatsAppNumber = "8801648582639";

    const now = new Date();
    const formattedDateTime = now.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const itemsList = cart
      .map(
        (item, index) =>
          `[${index + 1}] ${item.name}%0A` +
          `    - Edition: ${item.versionName || "Windows"}%0A` +
          `    - Price: BDT ${item.price}`,
      )
      .join("%0A%0A");

    // ডায়নামিক কাস্টমার ইনফরমেশন ব্লক (যা থাকবে শুধু সেটাই শো করবে)
    let customerInfoLines = [];
    if (paymentData.contact) {
      customerInfoLines.push(`• Contact / Email: ${paymentData.contact}`);
    } else if (paymentData.email) {
      customerInfoLines.push(`• Contact / Email: ${paymentData.email}`);
    }

    const customerInfoFormatted =
      customerInfoLines.length > 0
        ? customerInfoLines.join("%0A")
        : `• Contact / Email: N/A`;

    // ফরমাল এবং করপোরেট স্টাইল নোটিফিকেশন ফরম্যাট
    const message =
      `ORDER NOTIFICATION%0A` +
      `--------------------------------------------------%0A%0A` +
      `CUSTOMER INFORMATION%0A` +
      `${customerInfoFormatted}%0A%0A` +
      `PAYMENT DETAILS%0A` +
      `• Method: ${paymentData.method}%0A` +
      `• Sender Number: ${paymentData.sender}%0A` +
      `• Transaction ID: ${paymentData.trx || "N/A"}%0A` +
      `• Total Amount: BDT ${paymentData.amount}%0A%0A` +
      `ORDERED ITEMS (${cart.length} Item${cart.length > 1 ? "s" : ""})%0A` +
      `--------------------------------------------------%0A` +
      `${itemsList}%0A%0A` +
      `--------------------------------------------------%0A` +
      `Timestamp: ${formattedDateTime}`;

    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    setIsModalOpen(false);
    clearCart();
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-slate-800/60 border border-slate-700 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-white">
          {language === "English" ? "Order Successful!" : "অর্ডার সফল হয়েছে!"}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {language === "English"
            ? "After verifying your payment, the license key will be sent via email and SMS within 5-10 minutes."
            : "আপনার পেমেন্ট ভেরিফাই করে আগামী ৫-১০ মিনিটের মধ্যে ইমেইল ও এসএমএস-এর মাধ্যমে লাইসেন্স কি পাঠিয়ে দেওয়া হবে।"}
        </p>
        <Link
          to="/"
          onClick={() => setOrderConfirmed(false)}
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition mt-4"
        >
          {language === "English" ? "Shop More" : "আরও শপিং করুন"}
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="w-16 h-16 text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          {language === "English" ? "Your Cart is Empty!" : "আপনার কার্ট খালি!"}
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          {language === "English"
            ? "No Windows products have been added to the cart."
            : "কার্টে কোনো উইন্ডোজ প্রোডাক্ট যোগ করা হয়নি।"}
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-xl transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          {language === "English"
            ? "View Product Catalog"
            : "প্রোডাক্ট ক্যাটালগ দেখুন"}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
        {language === "English" ? "Your Shopping Cart" : "আপনার শপিং কার্ট"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-white text-base">
                  {item.name}
                </h3>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {item.versionName || "Windows"}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-white">৳{item.price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition"
                  title={language === "English" ? "Remove" : "রিমুভ করুন"}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3">
              {language === "English" ? "Order Summary" : "অর্ডার সামারি"}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>
                  {language === "English" ? "Total Items:" : "মোট আইটেম:"}
                </span>
                <span className="text-white font-medium">
                  {cart.length} {language === "English" ? "Item(s)" : "টি"}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>
                  {language === "English"
                    ? "Delivery Charge:"
                    : "ডেলিভারি চার্জ:"}
                </span>
                <span className="text-green-400 font-medium">
                  {language === "English"
                    ? "Free (Instant)"
                    : "ফ্রি (ইন্সট্যান্ট)"}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white border-t border-slate-700 pt-3">
                <span>
                  {language === "English" ? "Grand Total:" : "সর্বমোট:"}
                </span>
                <span className="text-blue-400">৳{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              {language === "English"
                ? "Proceed to Checkout (bKash/Nagad/Rocket)"
                : "অর্ডার করুন (bKash/Nagad/Rocket)"}
            </button>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={totalPrice}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
