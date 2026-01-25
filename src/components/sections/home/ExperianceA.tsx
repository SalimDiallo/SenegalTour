"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../ui/Button";
import { useTranslation } from "react-i18next";

const ExperianceA = () => {
  const { t } = useTranslation("en");
  return (
    <section className="my-28 mx-6 overflow-hidden">
      <div className="max-w-6xl mx-auto my-4 bg-white h-84 bg-covers">
        <div className="grid md:grid-cols-2 gap-10">
          <div
            data-aos="fade-right"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
          >
            {" "}
            <Image
              src={"/assets/images/people.jpeg"}
              alt={"Why Visit Senegal around the senegal premium tour agency "}
              width={200}
              height={200}
              className="w-full h-full rounded-md"
            />
          </div>

          <div
            className="p-4"
            data-aos="fade-left"
            data-aos-offset="500"
            data-aos-duration="500"
          >
            <h1 className="text-2xl font-bold mb-6">
              {t("home.sections.experiencea.title")}
            </h1>
            <p className="mb-5">{t("home.sections.experiencea.description")}</p>
            <Button title={t("common.discover")} href={"/tours"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperianceA;
