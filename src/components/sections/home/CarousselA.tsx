"use client";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Image from "next/image";
import TitleSection from "../../ui/TitleSection";
import { imgTourUrl } from "../../../config/siteConfig";
import { TourData } from "../../../data/tours";

const CarrouselA = ({ tours }: { tours: TourData[] }) => {
  const autoplay = useRef(Autoplay({ delay: 3500 }));

  return (
    <section className="py-20 md:py-28 bg-white">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="max-w-6xl mx-auto px-4 mb-8"
      >
        <TitleSection title="home.sections.carousselA.title" center />
      </div>
      <div className="max-w-7xl mx-auto">
        <Carousel
          maw="100%"
          mx="auto"
          mah={600}
          loop
          withIndicators
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          styles={{
            indicator: {
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "rgba(0,0,0,0.2)",
              "&[data-active]": {
                backgroundColor: "#06b6d4",
                width: 24,
                borderRadius: 4,
              },
            },
          }}
        >
          {tours.map((experience) => (
            <Carousel.Slide key={experience.id}>
              <div className="relative rounded-xl overflow-hidden mx-2">
                <Image
                  src={imgTourUrl(experience.imageA ?? experience.image)}
                  alt={`${experience.title} — Senegal Premium Tour`}
                  width={1200}
                  height={600}
                  className="w-full h-72 md:h-[30rem] object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-white font-heading text-xl md:text-2xl font-semibold">
                    {experience.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">{experience.city}</p>
                </div>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default CarrouselA;
