"use client";
import Image from "next/image";
import React from "react";
import TitleSection from "../../ui/TitleSection";
import { useTranslation } from "react-i18next";

const TopRaison = () => {
  const { t } = useTranslation("en");
  const items = [
    { titleKey: "home.sections.topRaison.food.title", descKey: "home.sections.topRaison.food.description", src: "/assets/images/food/food1.jpeg", alt: "Cuisine sénégalaise" },
    { titleKey: "home.sections.topRaison.discover.title", descKey: "home.sections.topRaison.discover.description", src: "/assets/images/Dakar.jpg", alt: "Découvrir Dakar" },
    { titleKey: "home.sections.topRaison.people.title", descKey: "home.sections.topRaison.people.description", src: "/assets/images/people.jpeg", alt: "Peuples du Sénégal" },
    { titleKey: "home.sections.topRaison.nature.title", descKey: "home.sections.topRaison.nature.description", src: "/assets/images/nature/nature2.jpeg", alt: "Nature du Sénégal" },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <TitleSection title="home.sections.topRaison.title" />
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.alt}
                width={600}
                height={400}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient permanent */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              {/* Texte au bas — titre toujours visible */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h1 className="text-white font-semibold text-lg">{t(item.titleKey)}</h1>
                <p className="text-white/60 text-xs mt-1 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t(item.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRaison;
