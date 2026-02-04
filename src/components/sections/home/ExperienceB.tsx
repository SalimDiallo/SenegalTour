"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../ui/Button";
import { useTranslation } from "react-i18next";

const ExperianceB = () => {
  const { t } = useTranslation("en");
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            data-aos="fade-right"
            data-aos-offset="150"
            data-aos-duration="600"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {t("home.sections.experienceb.title")}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">{t("home.sections.experienceb.description")}</p>
            <Button title={t("common.discover")} href="/tours" />
          </div>
          <div
            data-aos="fade-left"
            data-aos-offset="150"
            data-aos-duration="600"
          >
            <Image
              src={"/assets/images/Dakar.jpg"}
              alt={"Découvrir Dakar — Senegal Premium Tour"}
              width={600}
              height={500}
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperianceB;
