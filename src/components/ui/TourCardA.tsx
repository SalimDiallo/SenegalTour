"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./Button";
import { useTranslation } from "react-i18next";

import { imgTourUrl } from "../../config/siteConfig";
import ClientComponent from "../ClientComponent";
import { TourData } from "../../data/tours";

export const TourCardA = ({
  image,
  title,
  description,
  id,
  price,
  titlefr,
  descriptionfr,
}: TourData) => {
  const { t } = useTranslation("en");
  return (
    <div
      data-aos="fade-up"
      data-aos-easing="ease-out"
      data-aos-duration="500"
      className="group rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300"
    >
      <Link href={`/tours/${id}`} className="block">
        <div className="overflow-hidden">
          <Image
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            src={imgTourUrl(image)}
            alt={`Destination ${title} — Senegal Premium Tour`}
            width={400}
            height={300}
          />
        </div>
      </Link>
      <div className="p-5">
        <h5 className="text-base font-semibold text-gray-800 mb-1.5 leading-snug">
          <ClientComponent fr={titlefr} en={title} />
        </h5>
        <p className="line-clamp-2 text-sm text-gray-500 mb-4">
          <ClientComponent fr={descriptionfr} en={description} />
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">{t("common.from")}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-cyan-600 font-bold text-lg">€{price}</span>
              <span className="text-xs text-gray-400">/ {t("common.person")}</span>
            </div>
          </div>
          <Button title={t("common.more")} href={`/tours/${id}`} />
        </div>
      </div>
    </div>
  );
};
