"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowUpRight } from "lucide-react";

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
  city,
}: TourData) => {
  const { t } = useTranslation("en");
  return (
    <div
      data-aos="fade-up"
      data-aos-easing="ease-out"
      data-aos-duration="500"
      className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
    >
      <Link href={`/tours/${id}`} className="block relative overflow-hidden">
        <Image
          className="w-full h-52 object-cover img-zoom"
          src={imgTourUrl(image)}
          alt={`Destination ${title} — Senegal Premium Tour`}
          width={400}
          height={300}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* City badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-medium px-2.5 py-1 rounded-full">
          <MapPin size={11} className="text-cyan-500" />
          {city}
        </div>
        {/* Arrow indicator */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight size={14} className="text-gray-700" />
        </div>
      </Link>
      <div className="p-5">
        <h3 className="font-heading text-lg font-semibold text-gray-800 mb-1.5 leading-snug line-clamp-1">
          <ClientComponent fr={titlefr} en={title} />
        </h3>
        <p className="line-clamp-2 text-sm text-gray-500 mb-5 leading-relaxed">
          <ClientComponent fr={descriptionfr} en={description} />
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div>
            <span className="text-[11px] text-gray-400 uppercase tracking-wide">
              {t("common.from")}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-cyan-600 font-bold text-xl">€{price}</span>
              <span className="text-[11px] text-gray-400">
                / {t("common.person")}
              </span>
            </div>
          </div>
          <Link
            href={`/tours/${id}`}
            className="inline-flex items-center gap-1.5 text-cyan-600 hover:text-cyan-700 text-xs font-semibold transition-colors"
          >
            {t("common.more")}
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};
