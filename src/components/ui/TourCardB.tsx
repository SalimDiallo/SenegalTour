"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { imgTourUrl } from "../../config/siteConfig";
import { TourData } from "@/src/data/tours";
import { ArrowUpRight, MapPin } from "lucide-react";

export const TourCardB = ({ city, image, id, price, title }: TourData) => {
  const { t } = useTranslation("en");
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      className="group relative rounded-2xl overflow-hidden aspect-[4/3]"
    >
      <Link href={`/tours/${id}`} className="block w-full h-full">
        <Image
          src={imgTourUrl(image)}
          alt={`Destination ${title} — Senegal Premium Tour`}
          className="w-full h-full object-cover img-zoom"
          width={600}
          height={400}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

        {/* Content at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin size={12} className="text-cyan-400" />
              <h3 className="text-white font-semibold text-base">{city}</h3>
            </div>
            <span className="text-white/50 text-xs font-medium">
              {t("common.from")}{" "}
              <span className="text-white font-semibold">€{price}</span>
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        </div>
      </Link>
    </div>
  );
};
