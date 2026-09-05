import React, { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  English: {
    // Navbar
    home: "Home",
    cart: "Cart",

    // Hero Section
    badgeInstant: "Instant Delivery & 100% Official License",
    heroTitlePart1: "Original",
    heroTitlePart2: "Windows OS Product Keys",
    heroTitlePart3: "for Your PC",
    heroSubtitle:
      "Avoid cracked or fake software and use genuine Windows license keys. Get full genuine security and official updates with ease.",
    guaranteeGenuine: "100% Genuine Guarantee",
    guaranteeDelivery: "Instant Email & SMS Delivery",
    guaranteeLifetime: "Lifetime Validity & Updates",

    // Filter Buttons
    allVersions: "All Versions",
    windows11: "Windows 11",
    windows10: "Windows 10",
    windows7: "Windows 7",
    windowsServer: "Windows Server",
    msOffice: "MS Office",

    // Windows Section Heading & Cards
    selectWinVersionTitle: "Choose Your Windows Version",
    selectWinVersionSub: "Select your preferred edition",
    win11EditionGroup: "Windows 11 Editions",

    proBadge: "PRO",
    homeBadge: "HOME",
    enterpriseBadge: "ENTERPRISE",
    serverBadge: "SERVER",
    officeBadge: "OFFICE",
    currencySymbol: "৳",
    lifetimeLabel: "/ lifetime",

    genuineKey: "Genuine Key",
    lifetime: "Lifetime",

    // Windows 11
    win11ProDesc:
      "Best performance and security for professional users and businesses.",
    win11ProFeature1: "BitLocker Device Encryption",
    win11ProFeature2: "Windows Sandbox Support",
    win11ProFeature3: "Remote Desktop Feature",
    win11ProFeature4: "Lifetime Digital License",

    win11HomeDesc: "Ideal edition for everyday home tasks and gaming.",
    win11HomeFeature1: "Digital Security",
    win11HomeFeature2: "Gaming Mode & DirectStorage",
    win11HomeFeature3: "Smart App Control",
    win11HomeFeature4: "Lifetime Validity",

    win11EntDesc:
      "Advanced security and control for large corporate & IT organizations.",
    win11EntFeature1: "DirectAccess & AppLocker",
    win11EntFeature2: "Advanced Threat Protection",
    win11EntFeature3: "Lifetime Corporate Volume License",

    // Windows 10
    win10ProDesc:
      "Familiar and powerful performance for daily multitasking and office work.",
    win10ProFeature1: "BitLocker Encryption",
    win10ProFeature2: "Remote Desktop Support",
    win10ProFeature3: "Windows Defender Security",
    win10ProFeature4: "Lifetime Activation",

    win10HomeDesc: "Great for personal use, web browsing, and casual gaming.",
    win10HomeFeature1: "Built-in Antivirus Protection",
    win10HomeFeature2: "Cortana Assistant Support",
    win10HomeFeature3: "Lifetime Digital License",

    win10EntDesc:
      "Enterprise grade management and security for business environments.",
    win10EntFeature1: "Advanced Enterprise Security",
    win10EntFeature2: "Centralized IT Management",
    win10EntFeature3: "Lifetime Volume License",

    // Windows 7
    win7ProDesc: "Classic and lightweight operating system for older hardware.",
    win7ProFeature1: "Windows XP Mode",
    win7ProFeature2: "Domain Join Capability",
    win7ProFeature3: "Advanced Backup Features",

    win7UltDesc:
      "Combines remarkable ease-of-use with the entertainment features of Home Premium.",
    win7UltFeature1: "BitLocker Drive Encryption",
    win7UltFeature2: "Multilingual Support",
    win7UltFeature3: "Complete Security Protection",

    // Windows Server
    server2022Desc:
      "Enterprise-class cloud-ready operating system for modern infrastructure.",
    server2022Feature1: "Advanced Multi-layer Security",
    server2022Feature2: "Hybrid Capabilities with Azure",
    server2022Feature3: "Flexible Application Platform",

    server2019Desc:
      "Hybrid cloud platform that supports existing workloads while enabling new cloud tech.",
    server2019Feature1: "Hybrid Cloud Support",
    server2019Feature2: "Shielded Virtual Machines",
    server2019Feature3: "Windows Defender Advanced Threat Protection",

    // MS Office
    office2021Desc:
      "Essential tools for documents, spreadsheets, presentations, and emails.",
    office2021Feature1: "Word, Excel, PowerPoint & Outlook",
    office2021Feature2: "One-time purchase for 1 PC",
    office2021Feature3: "Official Microsoft Lifetime License",

    office2019Desc:
      "Classic version of office productivity apps for individual users and small businesses.",
    office2019Feature1: "Word, Excel, PowerPoint",
    office2019Feature2: "Classic 2019 Apps Version",
    office2019Feature3: "Lifetime Activation for 1 PC",

    office365Desc: "Always up-to-date premium apps and cloud storage services.",
    office365Feature1: "Runs on up to 5 Devices",
    office365Feature2: "Cloud Storage Included",
    office365Feature3: "Always Latest App Updates",

    // Common Buttons & Labels
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart",
    viewDetails: "View Details",
    buyNow: "Buy Now",
    price: "Price:",

    // Checkout Modal
    checkoutTitle: "Checkout Details",
    nameLabel: "Your Name",
    phoneLabel: "Phone Number",
    emailLabel: "Email Address",
    confirmOrder: "Confirm Order",
    securePayment: "Secure Payment",
    totalToPay: "Total Amount Payable",
    selectPaymentMethod: "Select Payment Method",
    doSendMoney: "Send Money via",
    scanQR: "Scan QR",
    hideQR: "Hide QR",
    scanWithApp: "Scan using mobile banking app",
    copy: "Copy",
    copied: "Copied!",
    providePaymentInfo: "Provide Payment Information",
    contactPlaceholder: "Your Email or WhatsApp number (for delivery)",
    senderPlaceholder: "Sender bKash/Nagad Number (e.g., 017XXXXXXXX)",
    trxPlaceholder: " Transaction ID / TrxID (e.g., 9N7A... - Optional)",
    phoneError:
      "Please enter a valid 11-digit Bangladeshi mobile number (e.g., 017XXXXXXXX)",

    secureCheckout: "Secure Checkout",
    completePaymentSecurely: "Complete your payment securely",
    totalPayableAmount: "Total Payable Amount",
    encryptedAndSecure: "Encrypted & Secure",
    sendMoneyToThisNumber: "Send Money to this number",
    viewNumber: "View Number",
    qrCode: "QR Code",
    confirmPayment: "Confirm Payment",

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    faqSub:
      "Find clear answers to common questions and purchase with confidence",
    faq1Q: "Are these license keys 100% original and genuine?",
    faq1A:
      "Yes, absolute 100% genuine Retail License Keys. These licenses bind directly with Microsoft official servers for permanent lifetime activation.",
    faq2Q: "How fast will I receive my product after order?",
    faq2A:
      "Our process is instant. Within 5 to 15 minutes of payment confirmation, your license key and step-by-step activation guide will be sent directly to your Email or WhatsApp.",
    faq3Q: "Can I reactivate if I reinstall or format Windows?",
    faq3A:
      "Yes! Since these are Retail Licenses, they bind to your PC motherboard/Microsoft account. You can reuse the key on the same PC even after formatting.",
    faq4Q: "What if the key doesn't work or displays an error?",
    faq4A:
      "We offer a 100% Activation Guarantee. If you face any issues, our support team will assist you via AnyDesk/TeamViewer, or provide an instant replacement/full refund.",
    faq5Q: "What payment methods do you accept?",
    faq5A:
      "We accept all major Bangladeshi Mobile Financial Services including bKash, Nagad, and Rocket through automated and secure Send Money options.",
    faq6Q: "How can I contact customer support if I need help?",
    faq6A:
      "Our dedicated support team is active every day. You can reach out to us directly through WhatsApp or Email for instant technical aid.",
  },

  Bengali: {
    // Navbar
    home: "হোম",
    cart: "কার্ট",

    // Hero Section
    badgeInstant: "ইনস্ট্যান্ট ডেলিভারি ও ১০০% অফিশিয়াল লাইসেন্স",
    heroTitlePart1: "আপনার পিসির জন্য অরিজিনাল",
    heroTitlePart2: "Windows OS প্রোডাক্ট কি",
    heroTitlePart3: "",
    heroSubtitle:
      "কোনো ক্র্যাক বা ভুয়া সফটওয়্যার ব্যবহার না করে জেনুইন উইন্ডোজ লাইসেন্স কি ব্যবহার করুন। সম্পূর্ণ জেনুইন সিকিউরিটি ও অফিশিয়াল আপডেট পান সহজেই।",
    guaranteeGenuine: "১০০% জেনুইন গ্যারান্টি",
    guaranteeDelivery: "ইনস্ট্যান্ট ইমেইল ও এসএমএস ডেলিভারি",
    guaranteeLifetime: "লাইফটাইম মেয়াদ ও আপডেট",

    // Filter Buttons
    allVersions: "সব ভার্সন",
    windows11: "Windows 11",
    windows10: "Windows 10",
    windows7: "Windows 7",
    windowsServer: "Windows Server",
    msOffice: "MS Office",

    // Windows Section Heading & Cards
    selectWinVersionTitle: "উইন্ডোজ ভার্সন বেছে নিন",
    selectWinVersionSub: "আপনার পছন্দের এডিশনটি নির্বাচন করুন",
    win11EditionGroup: "Windows 11 Edition-সমূহ",

    proBadge: "PRO",
    homeBadge: "HOME",
    enterpriseBadge: "ENTERPRISE",
    serverBadge: "SERVER",
    officeBadge: "OFFICE",
    currencySymbol: "৳",
    lifetimeLabel: "/ লাইফটাইম",

    genuineKey: "জেনুইন কি",
    lifetime: "লাইফটাইম",

    // Windows 11
    win11ProDesc:
      "প্রফেশনাল ইউজার এবং বিজনেসের জন্য সেরা পারফরম্যান্স ও সিকিউরিটি।",
    win11ProFeature1: "BitLocker ডিভাইস এনক্রিপশন",
    win11ProFeature2: "Windows Sandbox সাপোর্ট",
    win11ProFeature3: "Remote Desktop সুবিধা",
    win11ProFeature4: "লাইফটাইম ডিজিটাল লাইসেন্স",

    win11HomeDesc: "বাসাবাড়ির সাধারণ কাজ ও গেমিংয়ের জন্য উপযুক্ত এডিশন।",
    win11HomeFeature1: "ডিজিটাল সিকিউরিটি",
    win11HomeFeature2: "গেমিং মোড ও ডাইরেক্ট স্টোরেজ",
    win11HomeFeature3: "স্মার্ট অ্যাপ কন্ট্রোল",
    win11HomeFeature4: "লাইফটাইম সুবিধা",

    win11EntDesc:
      "বৃহৎ কর্পোরেট ও আইটি অর্গানাইজেশনের জন্য অ্যাডভান্সড সিকিউরিটি ও কন্ট্রোল।",
    win11EntFeature1: "DirectAccess ও AppLocker",
    win11EntFeature2: "অ্যাডভান্সড থ্রেট প্রোটেকশন",
    win11EntFeature3: "লাইফটাইম কর্পোরেট ভলিউম লাইসেন্স",

    // Windows 10
    win10ProDesc:
      "দৈনিক মাল্টিটাস্কিং এবং অফিসের কাজের জন্য পরিচিত ও শক্তিশালী পারফরম্যান্স।",
    win10ProFeature1: "BitLocker এনক্রিপশন",
    win10ProFeature2: "রিমোট ডেস্কটপ সাপোর্ট",
    win10ProFeature3: "উইন্ডোজ ডিফেন্ডার সিকিউরিটি",
    win10ProFeature4: "লাইফটাইম অ্যাক্টিভেশন",

    win10HomeDesc:
      "ব্যক্তিগত ব্যবহার, ব্রাউজিং এবং সাধারণ গেমিংয়ের জন্য চমৎকার।",
    win10HomeFeature1: "বিল্ট-ইন অ্যান্টিভাইরাস সুরক্ষা",
    win10HomeFeature2: "কোর্টানা অ্যাসিস্ট্যান্ট সাপোর্ট",
    win10HomeFeature3: "লাইফটাইম ডিজিটাল লাইসেন্স",

    win10EntDesc:
      "ব্যবসায়িক পরিবেশ ও এন্টারপ্রাইজ লেভেলের ম্যানেজমেন্ট এবং সিকিউরিটি।",
    win10EntFeature1: "অ্যাডভান্সড এন্টারপ্রাইজ সিকিউরিটি",
    win10EntFeature2: "সেন্ট্রালাইজড আইটি ম্যানেজমেন্ট",
    win10EntFeature3: "লাইফটাইম ভলিউম লাইসেন্স",

    // Windows 7
    win7ProDesc: "পুরাতন পিসির জন্য ক্লাসিক এবং লাইটওয়েট অপারেটিং সিস্টেম।",
    win7ProFeature1: "Windows XP মোড",
    win7ProFeature2: "ডোমেন জয় ক্যাপাবিলিটি",
    win7ProFeature3: "অ্যাডভান্সড ব্যাকআপ ফিচার",

    win7UltDesc:
      "হোম প্রিমিয়ামের বিনোদনমূলক বৈশিষ্ট্যের সাথে দারুণ ব্যবহারযোগ্যতার সমন্বয়।",
    win7UltFeature1: "BitLocker ড্রাইভ এনক্রিপশন",
    win7UltFeature2: "বহুভাষিক সাপোর্ট",
    win7UltFeature3: "সম্পূর্ণ সিকিউরিটি সুরক্ষা",

    // Windows Server
    server2022Desc:
      "আধুনিক অবকাঠামোর জন্য এন্টারপ্রাইজ-ক্লাস ক্লাউড-রেডি অপারেটিং সিস্টেম।",
    server2022Feature1: "উন্নত মাল্টি-লেয়ার সিকিউরিটি",
    server2022Feature2: "Azure এর সাথে হাইব্রিড সক্ষমতা",
    server2022Feature3: "নমনীয় অ্যাপ্লিকেশন প্ল্যাটফর্ম",

    server2019Desc:
      "হাইব্রিড ক্লাউড প্ল্যাটফর্ম যা নতুন ক্লাউড প্রযুক্তির পাশাপাশি পূর্বের কাজের চাপ সামলায়।",
    server2019Feature1: "হাইব্রিড ক্লাউড সাপোর্ট",
    server2019Feature2: "শিল্ডেড ভার্চুয়াল মেশিন",
    server2019Feature3: "উইন্ডোজ ডিফেন্ডার থ্রেট প্রোটেকশন",

    // MS Office
    office2021Desc:
      "ডকুমেন্ট, স্প্রেডশিট, প্রেজেন্টেশন এবং ইমেইলের জন্য প্রয়োজনীয় টুলস।",
    office2021Feature1: "Word, Excel, PowerPoint ও Outlook",
    office2021Feature2: "১টি পিসির জন্য ওয়ান-টাইম ক্রয়",
    office2021Feature3: "অফিশিয়াল মাইক্রোসফট লাইফটাইম লাইসেন্স",

    office2019Desc:
      "ব্যক্তিগত ব্যবহার ও ছোট ব্যবসার জন্য অফিস অ্যাপসগুলোর ক্লাসিক সংস্করণ।",
    office2019Feature1: "Word, Excel, PowerPoint",
    office2019Feature2: "ক্লাসিক ২০১৯ অ্যাপস ভার্সন",
    office2019Feature3: "১ পিসির জন্য লাইফটাইম অ্যাক্টিভেশন",

    office365Desc: "সবসময় আপডেট প্রিমিয়াম অ্যাপস এবং ক্লাউড স্টোরেজ সুবিধা।",
    office365Feature1: "সর্বোচ্চ ৫টি ডিভাইসে ব্যবহারযোগ্য",
    office365Feature2: "ক্লাউড স্টোরেজ সুবিধা",
    office365Feature3: "সর্বদা সর্বশেষ অ্যাপ আপডেট",

    // Common Buttons & Labels
    addToCart: "কার্টে যোগ করুন",
    addedToCart: "কার্টে যুক্ত আছে",
    viewDetails: "বিস্তারিত দেখুন",
    buyNow: "এখনই কিনুন",
    price: "মূল্য:",

    // Checkout Modal
    checkoutTitle: "অর্ডার কনফার্ম করুন",
    nameLabel: "আপনার নাম",
    phoneLabel: "মোবাইল নম্বর",
    emailLabel: "ইমেইল এড্রেস",
    confirmOrder: "অর্ডার সম্পন্ন করুন",
    securePayment: "নিরাপদ পেমেন্ট",
    totalToPay: "মোট পরিশোধ করতে হবে",
    selectPaymentMethod: "পেমেন্ট মেথড নির্বাচন করুন",
    doSendMoney: "এ সেন্ড মানি করুন",
    scanQR: "QR স্ক্যান করুন",
    hideQR: "QR লুকান",
    scanWithApp: "অ্যাপ দিয়ে স্ক্যান করুন",
    copy: "কপি",
    copied: "কপি হয়েছে!",
    providePaymentInfo: "পেমেন্টের তথ্য দিন",
    contactPlaceholder: "ইমেইল বা হোয়াটসঅ্যাপ নম্বর (যেখানে কি পাঠানো হবে)",
    senderPlaceholder: "প্রেরক নম্বর (০১৭XXXXXXXX)",
    trxPlaceholder: "TRXID (ঐচ্ছিক)",
    phoneError: "সঠিক ১১ ডিজিটের বাংলাদেশি ফোন নম্বর দিন",

    secureCheckout: "নিরাপদ চেকআউট",
    completePaymentSecurely: "আপনার পেমেন্টটি নিরাপদে সম্পন্ন করুন",
    totalPayableAmount: "সর্বমোট প্রদেয় পরিমাণ",
    encryptedAndSecure: "এনক্রিপ্টেড ও নিরাপদ",
    sendMoneyToThisNumber: "এই নম্বরে Send Money করুন",
    viewNumber: "নম্বর দেখুন",
    qrCode: "QR কোড",
    confirmPayment: "পেমেন্ট নিশ্চিত করুন",

    // FAQ Section
    faqTitle: "সাধারণ জিজ্ঞাসা (FAQ)",
    faqSub:
      "আপনার মনে থাকা সকল প্রশ্নের উত্তর ও শতভাগ বিশ্বস্ততার বিবরণ জেনে নিন",
    faq1Q: "এগুলো কি ১০০% আসল বা জেনুইন উইন্ডোজ লাইসেন্স কি?",
    faq1A:
      "হ্যাঁ, এগুলো ১০০% জেনুইন রিটেইল (Retail) লাইসেন্স কি। এটি সরাসরি মাইক্রোসফটের অফিশিয়াল সার্ভার থেকে আপনার পিসিতে লাইফটাইম বা আজীবনের জন্য অ্যাক্টিভেট হয়ে যাবে।",
    faq2Q: "অর্ডার কনফার্ম করার পর কতক্ষণের মধ্যে লাইসেন্স কি পাবো?",
    faq2A:
      "পেমেন্ট সফল হওয়ার মাত্র ৫ থেকে ১৫ মিনিটের মধ্যেই আপনার ইমেইল বা হোয়াটসঅ্যাপে লাইসেন্স কি এবং অ্যাক্টিভেশন গাইড পাঠিয়ে দেওয়া হয়।",
    faq3Q: "পিসি ফরম্যাট বা উইন্ডোজ রি-ইনস্টল দিলে কি আবার ব্যবহার করা যাবে?",
    faq3A:
      "হ্যাঁ, অবশ্যই! এটি রিটেইল কি হওয়ায় আপনার পিসির মাদারবোর্ডের সাথে লাইফটাইম যুক্ত থাকে। তাই যতবারই পিসি ফরম্যাট দেন না কেন, একই কি দিয়ে পুনরায় অ্যাক্টিভেট করতে পারবেন।",
    faq4Q: "লাইসেন্স কি কাজ না করলে বা কোনো সমস্যা দেখা দিলে করণীয় কী?",
    faq4A:
      "আমরা ১০০% অ্যাক্টিভেশন গ্যারান্টি দিচ্ছি। কোনো সমস্যা হলে আমাদের টেকনিক্যাল টিম অ্যানিডেস্ক বা স্ক্রিনশটের মাধ্যমে সাহায্য করবে। সমাধান না হলে সাথে সাথে নতুন কি বা ফুল রিফান্ড প্রদান করা হবে।",
    faq5Q: "পেমেন্ট করার কী কী মাধ্যম রয়েছে?",
    faq5A:
      "আপনার সুবিধার জন্য আমরা বিকাশ, নগদ এবং রকেট-এর মাধ্যমে পেমেন্ট গ্রহণ করি।",
    faq6Q: "যেকোনো প্রয়োজনে সাপোর্ট পাওয়ার জন্য কীভাবে যোগাযোগ করবো?",
    faq6A:
      "আমাদের সাপোর্ট টিম সপ্তাহে ৭ দিনই সক্রিয় থাকে। ওয়েবসাইট বা চেকআউটে দেওয়া আমাদের অফিশিয়াল হোয়াটসঅ্যাপ বা ইমেইলে মেসেজ দিলেই দ্রুত সমাধান পাবেন।",
  },
};

export const LanguageProvider = ({ children }) => {
  // ডিফল্ট ল্যাঙ্গুয়েজ English সেট করা হলো, এবং localStorage ব্যবহার করা হয়েছে যাতে ইউজারের চয়েস সেভ থাকে
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app_language") || "English";
  });

  useEffect(() => {
    localStorage.setItem("app_language", language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
