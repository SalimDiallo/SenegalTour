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
    <div>
      <div
        data-aos="fade-up"
        data-aos-duration="500"
        className="max-w-6xl mx-auto my-4 h-84 bg-covers"
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
                className="w-full h-96 md:h-[35rem] object-cover max-h-[40rem] z-0"
              />
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default CarrouselA;
