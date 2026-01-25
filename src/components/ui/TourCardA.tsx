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
      data-aos-easing="linear"
      data-aos-duration="500"
      className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      <Link href={`/tours/${id}`}>
        <Image
          className="rounded-t-lg w-full"
          src={imgTourUrl(image)}
          alt={`picture  of destination with title  ${title} for site senegal premuim  tour (tourism in Senegal)`}
          width={400}
          height={400}
        />
      </Link>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-bold leading-tight text-neutral-800 dark:text-neutral-50">
          <ClientComponent fr={titlefr} en={title} />
        </h5>
        <p className="mb-4 line-clamp-2 text-base text-neutral-600 dark:text-neutral-200">
          <ClientComponent fr={descriptionfr} en={description} />
        </p>
        <div className="flex justify-between items -center">
          <h2 className=" text-base   font-extralight">
            {t("common.from")}
            : <br />
            <span className="text-cyan-500 font-extrabold text-lg">
              €{price}
            </span>{" "}
            <br />
            {t("common.person")}
            <br />
          </h2>
          <Button title={t("common.more")} href={`/tours/${id}`} />
        </div>
      </div>
    </div>
  );
};
