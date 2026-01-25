"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../ui/Button";
import { useTranslation } from "react-i18next";

const ExperianceB = () => {
  const { t } = useTranslation("en");
  return (
    <section className="my-28 mx-6 overflow-x-hidden">
      <div className="max-w-6xl shadow-sm bg-white mx-auto my-4 h-84 bg-cover">
        <div className="grid md:grid-cols-2 gap-10">
          <div
            className="p-3"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
          >
            <h1 className="text-2xl font-bold mb-6">
              {t("home.sections.experienceb.title")}
            </h1>
            <p className="mb-5">{t("home.sections.experienceb.description")}</p>
            <Button title={t("common.discover")} href="/tours" />
          </div>
          <div
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="300"
            data-aos-duration="300"
          >
            {" "}
            <Image
              src={"/assets/images/Dakar.jpg"}
              alt={"Why Visit Senegal around the senegal premium tour agency "}
              width={200}
              height={200}
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperianceB;
