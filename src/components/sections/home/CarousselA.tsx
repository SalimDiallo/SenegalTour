"use client";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Image from "next/image";
import TitleSection from "../../ui/TitleSection";
import { imgTourUrl } from "../../../config/siteConfig";
import { TourData } from "../../../data/tours";

const CarrouselA = ({ tours }: { tours: TourData[] }) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  return (
    <div className="py-16 bg-white">
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="max-w-6xl mx-auto px-4 mb-6"
      >
        <TitleSection title={"home.sections.carousselA.title"} />
      </div>
      <Carousel
        maw={"100%"}
        mx="auto"
        mah={600}
        loop
        withIndicators
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        {tours.map((experience) => (
          <Carousel.Slide key={experience.id}>
            <div className="relative">
              <Image
                src={imgTourUrl(experience.imageA ?? experience.image)}
                alt={`image of section destination with title ${experience.title} - senegal premuim tour (agency tourism in Senegal)`}
                width={500}
                height={500}
                className="w-full h-72 md:h-[28rem] object-cover rounded-xl z-0"
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default CarrouselA;
