"use client";
import { BrainCog, Lightbulb, TrendingUp, UserCheck } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const WhyMe = () => {
  const { t } = useTranslation("en");
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-6xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {t("home.sections.whyme.title")}
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            {t("home.sections.whyme.description")}
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          {/* grid  1 */}
          <div className="bg-sky-200 bg-opacity-20 p-4  hover:shadow-md hover:shadow-sky-300 rounded-md">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <TrendingUp />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              {t("home.sections.whyme.expertise.title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("home.sections.whyme.expertise.description")}
            </p>
          </div>
          {/* grid 2 */}
          <div className="bg-sky-200 bg-opacity-20  hover:shadow-md hover:shadow-sky-300  p-4 rounded-md">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <Lightbulb />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              {t("home.sections.whyme.mastery.title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("home.sections.whyme.mastery.description")}
            </p>
          </div>
          {/* grid 3 */}
          <div className="bg-sky-200 bg-opacity-20  hover:shadow-md hover:shadow-sky-300 p-4 rounded-md">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <UserCheck />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              {t("home.sections.whyme.tailored.title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("home.sections.whyme.tailored.description")}
            </p>
          </div>
          {/* grid  4 */}
          <div className="bg-sky-200 bg-opacity-20  hover:shadow-md hover:shadow-sky-300 p-4 rounded-md">
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <BrainCog />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              {t("home.sections.whyme.reimagined.title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("home.sections.whyme.reimagined.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMe;
