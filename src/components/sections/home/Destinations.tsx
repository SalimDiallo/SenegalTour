import Image from "next/image";
import React from "react";
import { imgTourUrl } from "../../../config/siteConfig";
import Link from "next/link";
import TitleSection from "../../ui/TitleSection";
import { TourData } from "../../../data/tours";
import { ArrowUpRight, MapPin } from "lucide-react";

const Destinations = ({ tours }: { tours: TourData[] }) => {
  const featured = tours.slice(4, 8);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <TitleSection title="home.sections.destinations.title" />
        <div className="grid sm:grid-cols-2 gap-4">
          {featured.map((tour, i) => (
            <Link
              href={`/tours/${tour.id}`}
              key={tour.id}
              className={`group relative block rounded-2xl overflow-hidden ${
                i === 0 ? "sm:row-span-2 sm:h-full" : "h-64"
              }`}
            >
              <Image
                src={imgTourUrl(tour.image)}
                alt={`Destination ${tour.title} — Senegal Premium Tour`}
                width={600}
                height={i === 0 ? 800 : 400}
                className={`w-full object-cover img-zoom ${
                  i === 0 ? "h-full" : "h-64"
                }`}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <MapPin size={13} className="text-cyan-400" />
                  <h3 className="text-white text-lg font-bold">{tour.city}</h3>
                </div>
                <p className="text-white/50 text-xs mt-1 line-clamp-1 transition-all duration-300 max-h-0 group-hover:max-h-10 overflow-hidden">
                  {tour.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                <ArrowUpRight size={16} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
