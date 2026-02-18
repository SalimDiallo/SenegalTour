"use client";
import { BrainCog, Lightbulb, TrendingUp, UserCheck } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const WhyMe = () => {
  const { t } = useTranslation("en");
  const features = [
    {
      icon: <TrendingUp size={22} />,
      titleKey: "home.sections.whyme.expertise.title",
      descKey: "home.sections.whyme.expertise.description",
    },
    {
      icon: <Lightbulb size={22} />,
      titleKey: "home.sections.whyme.mastery.title",
      descKey: "home.sections.whyme.mastery.description",
    },
    {
      icon: <UserCheck size={22} />,
      titleKey: "home.sections.whyme.tailored.title",
      descKey: "home.sections.whyme.tailored.description",
    },
    {
      icon: <BrainCog size={22} />,
      titleKey: "home.sections.whyme.reimagined.title",
      descKey: "home.sections.whyme.reimagined.description",
    },
  ];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="section-divider" />
            <span className="text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
              {t("home.sections.whyme.title")}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 leading-tight">
            {t("home.sections.whyme.title")}
          </h2>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xl">
            {t("home.sections.whyme.description")}
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="flex gap-5 p-6 rounded-2xl border border-gray-100 bg-white hover:border-cyan-100 hover:shadow-lg hover:shadow-cyan-50/50 transition-all duration-500 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 flex items-center justify-center text-cyan-600 group-hover:from-cyan-100 group-hover:to-cyan-50 transition-all duration-500">
                {f.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1.5">
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
