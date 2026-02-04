"use client";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

// Array of images for background slider
const SLIDER_IMAGES = [
  "/assets/images/dakar2.jpg",
  "https://terresenmelees.org/wp-content/uploads/2024/08/Senegal-TerresenMelees.webp",
];

const Hero = () => {
  const { t } = useTranslation("en");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Automatic background slider
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBgIndex((prevIdx) => (prevIdx + 1) % SLIDER_IMAGES.length);
    }, 5200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      data-aos="fade-in"
      className="w-full h-[56rem] max-sm:h-[36rem] relative overflow-hidden"
    >
      {/* Sliding images as animated backgrounds */}
      <div className="absolute inset-0 w-full h-full z-0">
        {SLIDER_IMAGES.map((img, idx) => (
          <motion.div
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000`}
            animate={{
              opacity: bgIndex === idx ? 1 : 0,
              scale: bgIndex === idx ? 1 : 1.05,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ pointerEvents: "none" }}
          >
            {/* For responsiveness: show main img for all, use lowres only mobile */}
            <Image
              src={img}
              alt="Senegal background hero"
              fill
              style={{ objectFit: "cover" }}
              priority={bgIndex === idx}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gray-900/50" />
          </motion.div>
        ))}
    
      </div>
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white p-4">
        {/* Tag / badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block border border-white/30 text-white/80 text-xs tracking-widest uppercase px-4 py-1.5 rounded-full backdrop-blur-sm bg-white/10">
            Agence de Tourisme
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: "1.5rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-5xl md:text-7xl font-semibold max-sm:text-3xl leading-tight mb-3"
        >
          {t("home.welcome") as ReactNode}{" "}
          <span className="text-cyan-300">Sénégal</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-2 mb-6 text-base md:text-lg font-light max-w-xl mx-auto text-white/80 leading-relaxed"
        >
          {t("home.subtitle") ??
            "Explorez la magie, la culture et la diversité du Sénégal à travers des expériences inoubliables."}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center gap-8 max-sm:gap-4 mb-6"
        >
          <div className="flex flex-col items-center">
            <span className="text-cyan-300 font-bold text-xl md:text-2xl">
              <CountUp start={8800} end={9000} duration={3} /><span>+</span>
            </span>
            <span className="text-xs md:text-sm text-white/60 font-medium mt-0.5">
              {t("home.visitor")}
            </span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-cyan-300 font-bold text-xl md:text-2xl">
              <CountUp start={1950} end={2000} duration={3} /><span>+</span>
            </span>
            <span className="text-xs md:text-sm text-white/60 font-medium mt-0.5">
              {t("home.attraction")}
            </span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-cyan-300 font-bold text-xl md:text-2xl">
              <CountUp end={28} /><span>+</span>
            </span>
            <span className="text-xs md:text-sm text-white/60 font-medium mt-0.5">
              {t("home.culture")}
            </span>
          </div>
        </motion.div>
        {/* Search box */}
        <form
          className="w-full max-w-[780px] mx-auto mt-2"
          onSubmit={e => {
            e.preventDefault();
            window.location.href = `tours?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&city=${encodeURIComponent(city)}`;
          }}
          role="search"
          aria-label={t("search.ariaLabel") || "Recherche de tours"}
        >
          <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row flex-1 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              <div className="flex-1 relative">
                <input
                  autoComplete="on"
                  value={title}
                  onChange={e => setTitle(e.currentTarget.value)}
                  className="w-full outline-none text-gray-800 px-4 py-3.5 text-sm placeholder:text-gray-400"
                  type="text"
                  placeholder={t("search.title") || "Tour, activité..."}
                  name="title"
                  aria-label={t("search.title")}
                  list="hero-tour-suggestions"
                />
                <datalist id="hero-tour-suggestions">
                  <option value="Excursion Dakar" />
                  <option value="Safari Parc National" />
                  <option value="Musée Histoire" />
                </datalist>
              </div>
              <div className="flex-1 relative">
                <input
                  value={description}
                  onChange={e => setDescription(e.currentTarget.value)}
                  className="w-full outline-none text-gray-800 px-4 py-3.5 pr-10 text-sm placeholder:text-gray-400"
                  type="number"
                  min="0"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder={t("search.price") || "Prix max"}
                  name="description"
                  aria-label={t("search.price")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium">€</span>
              </div>
              <div className="flex-1 relative">
                <input
                  value={city}
                  onChange={e => setCity(e.currentTarget.value)}
                  className="w-full outline-none text-gray-800 px-4 py-3.5 text-sm placeholder:text-gray-400"
                  type="text"
                  placeholder={t("search.city") || "Ville, région..."}
                  name="city"
                  aria-label={t("search.city")}
                  list="hero-city-suggestions"
                />
                <datalist id="hero-city-suggestions">
                  <option value="Dakar" />
                  <option value="Saint-Louis" />
                  <option value="Saly" />
                  <option value="Ziguinchor" />
                </datalist>
              </div>
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 transition-colors px-6 py-3.5 flex items-center justify-center"
              aria-label="Rechercher"
            >
              <AiOutlineSearch size={20} className="text-white" />
            </button>
          </div>
        </form>

      
      </div>
    </div>
  );
};

export default Hero;
