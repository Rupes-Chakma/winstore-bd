import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'অর্ডার করার কতক্ষণের মধ্যে লাইসেন্স কি পাবো?',
      a: 'পেমেন্ট কনফার্ম করার ৫ থেকে ১৫ মিনিটের মধ্যে আপনার ইমেইল বা হোয়াটসঅ্যাপ নম্বরে লাইসেন্স কি পাঠিয়ে দেওয়া হবে।'
    },
    {
      q: 'এই লাইসেন্স কি অরিজিনাল এবং স্থায়ী (Lifetime)?',
      a: 'হ্যাঁ, এগুলো ১০০% অরিজিনাল অফিশিয়াল রিটেইল লাইসেন্স কি এবং এটি আজীবন (Lifetime) ব্যবহার করতে পারবেন।'
    },
    {
      q: 'লাইসেন্স অ্যাক্টিভেট করতে সমস্যা হলে কি সাপোর্ট পাওয়া যাবে?',
      a: 'অবশ্যই! আমাদের হোয়াটসঅ্যাপ সাপোর্টে যোগাযোগ করলে সরাসরি টিমভিউয়ার বা এনিডেস্কের মাধ্যমে অ্যাক্টিভেশনে সাহায্য করা হবে।'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-slate-900 border-t border-slate-800">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8">
          সাধারণ জিজ্ঞাসা (FAQ)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-slate-800/60 border border-slate-700/60 rounded-xl overflow-hidden transition"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 text-left flex justify-between items-center text-sm md:text-base font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-4 text-xs md:text-sm text-slate-400 border-t border-slate-700/40 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}