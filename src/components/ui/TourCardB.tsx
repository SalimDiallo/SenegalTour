"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { imgTourUrl } from "../../config/siteConfig";
import { TourData } from "@/src/data/tours";

export const TourCardB = ({ city, image, id, price, title }: TourData) => {
  const { t } = useTranslation("en");
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <Link href={`/tours/${id}`}>
        <Image
          src={imgTourUrl(image)}
          alt={`Destination ${title} — Senegal Premium Tour`}
          className="w-full object-cover md:h-[15rem] transition-transform duration-500 group-hover:scale-105"
          width={600}
          height={400}
        />
      </Link>
      {/* Gradient + info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <h1 className="text-white font-semibold text-sm">{city}</h1>
        <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md">
          {t("common.from")} €{price}
        </span>
      </div>
    </div>
  );
};
