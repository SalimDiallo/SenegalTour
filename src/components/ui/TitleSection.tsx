"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const TitleSection = ({
  title,
  desc,
  center = false,
}: {
  title: string;
  desc?: string;
  center?: boolean;
}) => {
  const { t } = useTranslation("en");
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-3 mb-3 ${
          center ? "justify-center" : ""
        }`}
      >
        <div className="section-divider" />
        <span className="text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
          {t(title)}
        </span>
        <div className="section-divider" />
      </div>
      <h2 className="font-heading font-semibold text-3xl md:text-4xl text-gray-800 leading-tight text-balance">
        {t(title)}
      </h2>
      {desc && (
        <p
          className={`text-sm text-gray-500 mt-3 leading-relaxed ${
            center ? "max-w-lg mx-auto" : "max-w-xl"
          }`}
        >
          {t(desc)}
        </p>
      )}
    </div>
  );
};

export default TitleSection;
