import Image from "next/image";
import React from "react";
import { imgTourUrl } from "../../../config/siteConfig";
import Link from "next/link";

import TitleSection from "../../ui/TitleSection";
import { TourData } from "../../../data/tours";

const Destinations = ({ tours }: { tours: TourData[] }) => {
  return (
    <div className=" max-w-6xl mx-auto p-2 my-8">
      {/* title */}
      <TitleSection title="home.sections.destinations.title" />
      <div className="grid sm:grid-cols-2 gap-2">
        {tours.slice(4, 8).map((tour) => (
          <div className="relative " key={tour.id}>
            <div className="w-full  hover:opacity-0  h-full absolute bg-black transition-opacity bg-opacity-50 flex justify-center items-center">
              <h1 className="text-white text-2xl font-extrabold px-2">
                {tour.city}
              </h1>
            </div>
            <Link
              href={`/tours/${tour.id}`}
              className="w-full h-full opacity-0 hover:opacity-100 hover:z-50 px-6  absolute bg-black transition-opacity bg-opacity-90 flex justify-center items-center flex-col text-white"
            >
              <h2 className="font-bold">{tour.address}</h2>
              <p className="line-clamp-2 px-1">{tour.description}</p>
              <h1 className="text-primary animate-bounce text-2xl font-extrabold">
                {"->"}
              </h1>
            </Link>
            <Image
              src={imgTourUrl(tour.image)}
              alt={`picture  of destination with title  ${tour.title} for site senegal premuim  tour (tourism in Senegal)`}
              width={200}
              height={200}
              className="h-56 w-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
