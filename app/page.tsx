import { Top } from "@/src/components/sections/home/Top";
import Hero from "../src/components/sections/home/Hero";
import { News } from "../src/components/sections/home/News";
import ExperianceA from "../src/components/sections/home/ExperianceA";
import ExperianceB from "../src/components/sections/home/ExperienceB";
import CarrouselA from "../src/components/sections/home/CarousselA";
import WhyMe from "../src/components/sections/home/WhyMe";
import TopRaison from "@/src/components/sections/home/TopRaison";
import Destinations from "@/src/components/sections/home/Destinations";

import { toursData } from "@/src/data/tours";

export default function Home() {
  return (
    <div>
      <Hero />
      <Destinations tours={toursData} />
      <News tours={toursData} />
      <WhyMe />
       <CarrouselA tours={toursData} />
      <TopRaison />
       <ExperianceA />
      <Top tours={toursData} />
       <ExperianceB />
    </div>
  );
}
