"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { TourStop } from "../../../../data/tours";

const TourCircuit = ({ stops }: { stops: TourStop[] }) => {
  const { t, i18n } = useTranslation("en");
  const isFr = i18n.language === "fr";

  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800">
            {t("tour.circuit")}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {t("tour.circuitDescription")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl">
          {/* Ligne verticale connectée */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="flex flex-col gap-0">
            {stops.map((stop, index) => {
              const isLast = index === stops.length - 1;
              const isFirst = index === 0;

              return (
                <div key={index} className="relative flex gap-5">
                  {/* Dot + connector */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    {/* Dot */}
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm flex-shrink-0 ${
                        isFirst
                          ? "bg-cyan-500"
                          : isLast
                          ? "bg-cyan-500"
                          : "bg-white border-cyan-400"
                      }`}
                    >
                      {/* Numéro étape */}
                      <span
                        className={`text-xs font-bold ${
                          isFirst || isLast ? "text-white" : "text-cyan-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card contenu */}
                  <div className={`pb-6 ${isLast ? "pb-0" : ""} flex-1`}>
                    <div
                      className={`p-4 rounded-xl border transition-colors duration-200 hover:border-cyan-200 hover:shadow-sm ${
                        isFirst || isLast
                          ? "bg-cyan-50 border-cyan-200"
                          : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <h3 className="text-sm font-semibold text-gray-800">
                        {isFr ? stop.labelfr : stop.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {isFr ? stop.descriptionfr : stop.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourCircuit;
