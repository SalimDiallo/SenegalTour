"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const TitleSection = ({ title, desc }: { title: string; desc?: string }) => {
  const { t } = useTranslation("en");
  return (
    <div>
      <div className="py-4">
        <div>
          <div className="w-24 h-[0.1rem] bg-sky-500 rounded-full"></div>
          <div className="w-20 h-[0.1rem] bg-sky-500 my-[0.2rem] rounded-full"></div>
        </div>
        <h1 className="font-semibold text-2xl">{t(title)}</h1>
      </div>
      {desc && <p className="text-md py-3">{t(desc)}</p>}
    </div>
  );
};

export default TitleSection;
