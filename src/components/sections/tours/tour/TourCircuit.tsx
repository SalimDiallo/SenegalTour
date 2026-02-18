"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { TourStop } from "../../../../data/tours";

const TourCircuit = ({ stops }: { stops: TourStop[] }) => {
  const { t, i18n } = useTranslation("en");
  const isFr = i18n.language === "fr";

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="section-divider" />
            <span className="text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
              Itinéraire
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800">
            {t("tour.circuit")}
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-lg leading-relaxed">
            {t("tour.circuitDescription")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-200 via-gray-200 to-gray-100" />

          <div className="flex flex-col gap-0">
            {stops.map((stop, index) => {
              const isLast = index === stops.length - 1;
              const isFirst = index === 0;

              return (
                <div key={index} className="relative flex gap-5">
                  {/* Dot */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 transition-all duration-300 ${
                        isFirst || isLast
                          ? "bg-cyan-500 border-cyan-500 shadow-sm shadow-cyan-200"
                          : "bg-white border-cyan-300"
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold ${
                          isFirst || isLast ? "text-white" : "text-cyan-600"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`pb-6 ${isLast ? "pb-0" : ""} flex-1`}>
                    <div
                      className={`p-5 rounded-xl border transition-all duration-300 hover:shadow-md ${
                        isFirst || isLast
                          ? "bg-cyan-50/50 border-cyan-100 hover:border-cyan-200"
                          : "bg-gray-50/50 border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <h3 className="text-sm font-semibold text-gray-800">
                        {isFr ? stop.labelfr : stop.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
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
