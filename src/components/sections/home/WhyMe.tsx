"use client";
import { BrainCog, Lightbulb, TrendingUp, UserCheck } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const WhyMe = () => {
  const { t } = useTranslation("en");
  const features = [
    { icon: <TrendingUp size={20} />, titleKey: "home.sections.whyme.expertise.title", descKey: "home.sections.whyme.expertise.description" },
    { icon: <Lightbulb size={20} />, titleKey: "home.sections.whyme.mastery.title", descKey: "home.sections.whyme.mastery.description" },
    { icon: <UserCheck size={20} />, titleKey: "home.sections.whyme.tailored.title", descKey: "home.sections.whyme.tailored.description" },
    { icon: <BrainCog size={20} />, titleKey: "home.sections.whyme.reimagined.title", descKey: "home.sections.whyme.reimagined.description" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800">
            {t("home.sections.whyme.title")}
          </h2>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            {t("home.sections.whyme.description")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl border border-gray-100 hover:border-cyan-200 bg-gray-50 hover:bg-white transition-all duration-300">
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {t(f.titleKey)}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t(f.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMe;
