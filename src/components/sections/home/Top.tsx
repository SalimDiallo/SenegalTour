import React from "react";
import { TourCardA } from "../../ui/TourCardA";
import TitleSection from "../../ui/TitleSection";
import { TourData } from "../../../data/tours";

export const Top = ({ tours }: { tours: TourData[] }) => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <TitleSection
          title="home.sections.top.title"
          desc="home.sections.top.description"
        />
        <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 gap-6">
          {tours.slice(0, 6).map((tour) => (
            <TourCardA key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
};
