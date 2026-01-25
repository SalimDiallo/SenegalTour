"use client";
import Image from "next/image";
import React from "react";
import TitleSection from "../../ui/TitleSection";
import { useTranslation } from "react-i18next";

const TopRaison = () => {
  const { t } = useTranslation("en");
  return (
    <div className="mt-8  max-w-6xl mx-auto p-2">
      <TitleSection title="home.sections.topRaison.title" />
      <div className="grid sm:grid-cols-2 gap-2">
        {/* grid 1 */}
        <div className="relative ">
          <div className="w-full  hover:opacity-0  h-full absolute bg-black transition-opacity bg-opacity-50 flex justify-center items-center">
            <h1 className="text-white text-2xl font-extrabold">
              {t("home.sections.topRaison.food.title")}
            </h1>
          </div>
          <div className="w-full h-full opacity-0 hover:opacity-100 hover:z-50 px-6  absolute bg-black transition-opacity bg-opacity-90 flex justify-center items-center flex-col text-white">
            <p>{t("home.sections.topRaison.food.description")}</p>
          </div>
          <Image
            src={"/assets/images/food/food1.jpeg"}
            alt={`Senegal Premuim Tour food image for section why to go in Senegal for the tourism`}
            width={200}
            height={200}
            className="h-56 w-full object-cover rounded-lg"
          />
        </div>

        {/* grid 2 */}
        <div className="relative ">
          <div className="w-full  hover:opacity-0  h-full absolute bg-black transition-opacity bg-opacity-50 flex justify-center items-center">
            <h1 className="text-white text-2xl font-extrabold">
              {t("home.sections.topRaison.discover.title")}
            </h1>
          </div>
          <div className="w-full h-full opacity-0 hover:opacity-100 hover:z-50 px-6  absolute bg-black transition-opacity bg-opacity-90 flex justify-center items-center flex-col text-white">
            <p>{t("home.sections.topRaison.discover.description")}</p>
          </div>
          <Image
            src={"/assets/images/Dakar.jpg"}
            alt={`Senegal Premuim Tour dakar image for section why to go in Senegal for the tourism`}
            width={200}
            height={200}
            className="h-56 w-full object-cover rounded-lg"
          />
        </div>

        {/* grid 3 */}
        <div className="relative">
          <div className="w-full  hover:opacity-0  h-full absolute bg-black transition-opacity bg-opacity-50 flex justify-center items-center">
            <h1 className="text-white text-2xl font-extrabold">
              {" "}
              {t("home.sections.topRaison.people.title")}
            </h1>
          </div>
          <div className="w-full h-full opacity-0 hover:opacity-100 hover:z-50 px-6  absolute bg-black transition-opacity bg-opacity-90 flex justify-center items-center flex-col text-white">
            <p> {t("home.sections.topRaison.people.description")}</p>
          </div>
          <Image
            src={"/assets/images/people.jpeg"}
            alt={`Senegal Premuim Tour people of senegal image for section why to go in Senegal for the tourism`}
            width={200}
            height={200}
            className="h-56 w-full object-cover rounded-lg"
          />
        </div>

        {/* grid 4 */}
        <div className="relative ">
          <div className="w-full  hover:opacity-0  h-full absolute bg-black transition-opacity bg-opacity-50 flex justify-center items-center">
            <h1 className="text-white text-2xl font-extrabold">
              {" "}
              {t("home.sections.topRaison.nature.title")}
            </h1>
          </div>
          <div className="w-full h-full opacity-0 hover:opacity-100 hover:z-50 px-6  absolute bg-black transition-opacity bg-opacity-90 flex justify-center items-center flex-col text-white">
            <p> {t("home.sections.topRaison.nature.description")}</p>
          </div>
          <Image
            src={"/assets/images/nature/nature2.jpeg"}
            alt={`Senegal Premuim Tour nuture image in Senegal for section why to go in Senegal for the tourism`}
            width={200}
            height={200}
            className="h-56 w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default TopRaison;
