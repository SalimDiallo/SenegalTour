"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../ui/Button";
import { useTranslation } from "react-i18next";

const ExperianceA = () => {
  const { t } = useTranslation("en");
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div data-aos="fade-right" data-aos-offset="150" data-aos-easing="ease-out">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/people.jpeg"
                alt="Expériences culturelles au Sénégal"
                width={600}
                height={500}
                className="w-full h-[280px] sm:h-[340px] md:h-[420px] object-cover"
              />
            </div>
            {/* Decorative element — hidden on small screens */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border-2 border-cyan-200/50 -z-10" />
          </div>

          {/* Content */}
          <div data-aos="fade-left" data-aos-offset="150" data-aos-duration="600">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="section-divider" />
              <span className="text-[10px] sm:text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
                Expériences
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-3 sm:mb-4 leading-tight">
              {t("home.sections.experiencea.title")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6 sm:mb-8">
              {t("home.sections.experiencea.description")}
            </p>
            <Button title={t("common.discover")} href="/tours" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperianceA;
