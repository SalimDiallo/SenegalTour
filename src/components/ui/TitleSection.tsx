"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const TitleSection = ({ title, desc }: { title: string; desc?: string }) => {
  const { t } = useTranslation("en");
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
      </div>
      <h1 className="font-bold text-2xl md:text-3xl text-gray-800">{t(title)}</h1>
      {desc && <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">{t(desc)}</p>}
    </div>
  );
};

export default TitleSection;
