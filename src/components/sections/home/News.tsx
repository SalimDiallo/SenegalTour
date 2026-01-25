import React from "react";
import { TourCardB } from "../../ui/TourCardB";

import TitleSection from "../../ui/TitleSection";
import { TourData } from "../../../data/tours";

export const News = ({ tours }: { tours: TourData[] }) => {
  return (
    <section className="relative mt-28 max-2xl:mx-6 mx-3">
      <div className="max-w-6xl mx-auto my-4 h-84 bg-covers">
        <div className="">
          {/* desc section */}
          <div>
            <TitleSection
              title="home.sections.news.title"
              desc="home.sections.news.description"
            />
          </div>
          {/* content */}
          <div className="grid max-sm:grid-cols-1  max-md:grid-cols-2 grid-cols-3  gap-4">
            {tours.slice(tours.length - 4, tours.length - 1).map((tour) => (
              <TourCardB key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
