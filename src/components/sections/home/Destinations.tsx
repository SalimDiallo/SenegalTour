import Image from "next/image";
import React from "react";
import { imgTourUrl } from "../../../config/siteConfig";
import Link from "next/link";

import TitleSection from "../../ui/TitleSection";
import { TourData } from "../../../data/tours";

const Destinations = ({ tours }: { tours: TourData[] }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <TitleSection title="home.sections.destinations.title" />
      <div className="grid sm:grid-cols-2 gap-4">
        {tours.slice(4, 8).map((tour) => (
          <Link
            href={`/tours/${tour.id}`}
            key={tour.id}
            className="group relative block rounded-xl overflow-hidden"
          >
            <Image
              src={imgTourUrl(tour.image)}
              alt={`Destination ${tour.title} — Senegal Premium Tour`}
              width={600}
              height={400}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay permanent pour le titre */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            {/* Contenu au bas */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
              <h1 className="text-white text-lg font-bold">{tour.city}</h1>
              <p className="text-white/60 text-xs mt-0.5 line-clamp-1 transition-opacity duration-300 group-hover:opacity-100 opacity-0">{tour.description}</p>
            </div>
            {/* Flèche indicator au hover */}
            <div className="absolute top-4 right-4 bg-white/90 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
              <span className="text-sm">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
