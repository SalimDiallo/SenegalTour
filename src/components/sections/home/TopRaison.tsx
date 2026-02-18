"use client";
import Image from "next/image";
import React from "react";
import TitleSection from "../../ui/TitleSection";
import { useTranslation } from "react-i18next";

const TopRaison = () => {
  const { t } = useTranslation("en");
  const items = [
    {
      titleKey: "home.sections.topRaison.food.title",
      descKey: "home.sections.topRaison.food.description",
      src: "/assets/images/food/food1.jpeg",
      alt: "Cuisine sénégalaise",
    },
    {
      titleKey: "home.sections.topRaison.discover.title",
      descKey: "home.sections.topRaison.discover.description",
      src: "/assets/images/Dakar.jpg",
      alt: "Découvrir Dakar",
    },
    {
      titleKey: "home.sections.topRaison.people.title",
      descKey: "home.sections.topRaison.people.description",
      src: "/assets/images/people.jpeg",
      alt: "Peuples du Sénégal",
    },
    {
      titleKey: "home.sections.topRaison.nature.title",
      descKey: "home.sections.topRaison.nature.description",
      src: "/assets/images/nature/nature2.jpeg",
      alt: "Nature du Sénégal",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50/80">
      <div className="max-w-6xl mx-auto px-4">
        <TitleSection title="home.sections.topRaison.title" />
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="group relative rounded-2xl overflow-hidden aspect-[3/2]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className="w-full h-full object-cover img-zoom"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
              {/* Number badge */}
              <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  0{i + 1}
                </span>
              </div>
              {/* Text content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {t(item.titleKey)}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed max-w-xs transition-all duration-400 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {t(item.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRaison;
