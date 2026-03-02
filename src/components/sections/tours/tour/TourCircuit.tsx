"use client";
import { useTranslation } from "react-i18next";
import { TourStop } from "../../../../data/tours";
import { MapPin, Flag, CheckCircle } from "lucide-react";

const TourCircuit = ({ stops }: { stops: TourStop[] }) => {
  const { t, i18n } = useTranslation("en");
  const isFr = i18n.language === "fr";

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-full mb-4">
            <MapPin size={16} className="text-cyan-600" />
            <span className="text-xs text-cyan-600 font-semibold tracking-wide uppercase">
              Itinéraire détaillé
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            {t("tour.circuit")}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("tour.circuitDescription")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-300 to-gray-200" />

          <div className="flex flex-col gap-6">
            {stops.map((stop, index) => {
              const isLast = index === stops.length - 1;
              const isFirst = index === 0;

              return (
                <div key={index} className="relative flex gap-6 md:gap-8 group">
                  {/* Dot and icon */}
                  <div className="flex flex-col items-center flex-shrink-0 z-10">
                    <div
                      className={`relative w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-lg ${
                        isFirst
                          ? "bg-gradient-to-br from-cyan-500 to-cyan-600 group-hover:shadow-cyan-300"
                          : isLast
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-600 group-hover:shadow-emerald-300"
                          : "bg-white border-2 border-cyan-300 group-hover:border-cyan-400"
                      }`}
                    >
                      {isFirst ? (
                        <Flag size={20} className="text-white" />
                      ) : isLast ? (
                        <MapPin size={20} className="text-white" />
                      ) : (
                        <span className="text-sm md:text-base font-bold text-cyan-600">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-0">
                    <div
                      className={`relative p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 bg-white group-hover:shadow-xl group-hover:-translate-y-1 ${
                        isFirst
                          ? "border-cyan-200 shadow-lg shadow-cyan-100/50"
                          : isLast
                          ? "border-emerald-200 shadow-lg shadow-emerald-100/50"
                          : "border-gray-200 shadow-md hover:border-cyan-200"
                      }`}
                    >
                      {/* Badge for first/last */}
                      {(isFirst || isLast) && (
                        <div className="absolute -top-3 right-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shadow-sm ${
                              isFirst
                                ? "bg-cyan-500 text-white"
                                : "bg-emerald-500 text-white"
                            }`}
                          >
                            {isFirst ? "Départ" : "Arrivée"}
                          </span>
                        </div>
                      )}

                      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">
                        {isFr ? stop.labelfr : stop.label}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {isFr ? stop.descriptionfr : stop.description}
                      </p>

                      {/* Decorative element */}
                      <div
                        className={`absolute bottom-0 left-0 h-1 rounded-b-xl transition-all duration-300 ${
                          isFirst
                            ? "bg-gradient-to-r from-cyan-400 to-cyan-600 w-1/3 group-hover:w-full"
                            : isLast
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-600 w-1/3 group-hover:w-full"
                            : "bg-gradient-to-r from-gray-300 to-cyan-300 w-0 group-hover:w-full"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary card */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="border border-gray-200 rounded-xl p-6 md:p-8 bg-white shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={20} className="text-cyan-500" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1">
                  {isFr ? "Tout est organisé pour vous" : "Everything is organized for you"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {isFr
                    ? "Profitez de votre expérience sans vous soucier de la logistique. Notre équipe s'occupe de tout, du transport aux visites guidées."
                    : "Enjoy your experience without worrying about logistics. Our team takes care of everything, from transport to guided tours."
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourCircuit;
