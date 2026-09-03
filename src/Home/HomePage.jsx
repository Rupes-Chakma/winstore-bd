import React, { useState } from "react";
import SEO from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import VersionFilter from "../components/product/VersionFilter";
import PromoVideo from "./PromoVideo";
import FAQ from "./FAQ";

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedVersion, setSelectedVersion] = useState("all");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
      <SEO title={t("seoTitle")} description={t("seoDesc")} />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          {t("selectVersion")}
        </h1>
        <p className="text-slate-400 text-center text-sm mb-6">
          {t("selectEditionSub")}
        </p>

        <VersionFilter
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
        />

        <PromoVideo />
        <FAQ />
      </div>
    </div>
  );
}
