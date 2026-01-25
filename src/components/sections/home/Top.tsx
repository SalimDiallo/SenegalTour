import React from "react";
import { TourCardA } from "../../ui/TourCardA";
import TitleSection from "../../ui/TitleSection";
import { TourData } from "../../../data/tours";

export const Top = ({ tours }: { tours: TourData[] }) => {
  return (
    <section className="relative mb-28 mt-20 mx-3">
      <div className="max-w-6xl mx-auto my-4 h-84 bg-covers">
        <div className="">
          {/* desc section */}
          <div>
            <TitleSection
              title="home.sections.top.title"
              desc="home.sections.top.description"
            />
          </div>
          {/* content */}
          <div className="grid max-sm:grid-cols-1  max-lg:grid-cols-2 grid-cols-3  gap-4">
            {tours.slice(0, 6).map((tour) => (
              <TourCardA key={tour.id} {...tour} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
