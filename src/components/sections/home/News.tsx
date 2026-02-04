import React from "react";
import { TourCardB } from "../../ui/TourCardB";

import TitleSection from "../../ui/TitleSection";
import { TourData } from "../../../data/tours";

export const News = ({ tours }: { tours: TourData[] }) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <TitleSection
          title="home.sections.news.title"
          desc="home.sections.news.description"
        />
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 gap-5">
          {tours.slice(tours.length - 4, tours.length - 1).map((tour) => (
            <TourCardB key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
};
