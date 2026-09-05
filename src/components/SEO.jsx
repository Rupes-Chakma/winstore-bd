import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, keywords, image, url }) {
  const siteTitle = title
    ? `${title} | KeyShopbd`
    : "KeyShopbd - Genuine Software License Keys in BD";
  const siteDescription =
    description ||
    "Buy genuine Windows 10, Windows 11, Office, and Server license keys at cheap price in Bangladesh with instant delivery via bKash/Nagad.";
  const siteKeywords =
    keywords ||
    "windows 11 bd, win 10 price in bd, office 2021 license key bangladesh, keyshopbd";
  const siteUrl = url || "https://keyshopbd.com"; // আপনার ডোমেইন URL

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
