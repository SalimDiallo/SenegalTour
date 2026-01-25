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
      data-aos-duration="1000"
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 relative h-fit"
    >
      <div className="absolute top-2 right-2 z-50 text-xl flex items-center justify-center  bg-opacity-50 rounded-md px-1">
        {/* <Heart isFav={isFav} tourId={id} /> */}
      </div>
      {/* images */}
      <div className="absolute bottom-0 rounded-b-md  bg-gray-500 bg-opacity-70  left-0 w-full p-2 font-extrabold  text-xs md:text-md flex items-center justify-between text-white px-2   ">
        <h1> {city} </h1>
        <h2 className="text-[0.6rem] font-bold">
          {t("common.from")} :{" "}
          <span className="font-extrabold text-lg">€{price}</span>{" "}
        </h2>
      </div>

      <div>
        <Link href={`/tours/${id}`}>
          <Image
            src={imgTourUrl(image)}
            alt={`picture  of destination with title  ${title} for site senegal premuim  tour (tourism in Senegal)`}
            className="rounded-lg object-cover md:h-[15rem]"
            width={600}
            height={600}
          />
        </Link>
      </div>
    </div>
  );
};
