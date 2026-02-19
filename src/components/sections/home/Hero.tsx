"use client";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight, DollarSign } from "lucide-react";

// Background slider images
const SLIDER_IMAGES = [
  "/assets/images/dakar2.jpg",
  "https://terresenmelees.org/wp-content/uploads/2024/08/Senegal-TerresenMelees.webp",
  "/assets/images/Dakar.jpg",
];

const Hero = () => {
  const { t } = useTranslation("en");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 7000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goToSlide = useCallback((idx: number) => {
    setBgIndex(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 7000);
  }, []);

  return (
    <section
      className="w-full relative overflow-hidden min-h-screen flex justify-center items-center"
      id="hero"
    >
      {/* ===== BACKGROUND SLIDER ===== */}
      <div className="absolute inset-0 w-full h-full z-0">
        {SLIDER_IMAGES.map((img, idx) => (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full"
            animate={{
              opacity: bgIndex === idx ? 1 : 0,
              scale: bgIndex === idx ? 1.02 : 1.08,
            }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ pointerEvents: "none" }}
          >
            <Image
              src={img}
              alt="Senegal tourisme"
              fill
              style={{ objectFit: "cover" }}
              priority={idx === 0}
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        ))}
        {/* Overlay sobre — dégradé vertical + couche sombre */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white px-4 pt-20 sm:pt-24 pb-16 sm:pb-20">

        {/* Ligne d'accroche discrète */}
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-3 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/50 font-medium"
        >
          Agence de tourisme — Sénégal
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-heading font-semibold leading-[1.1] mb-4 sm:mb-5 text-balance max-w-3xl text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
        >
          {t("home.welcome") as ReactNode}{" "}
          <span className="relative inline-block" style={{ isolation: "isolate" }}>
            {/* Texte avec dégradé drapeau via background-clip */}
            <span
              className="relative z-10"
              style={{
                backgroundImage: "linear-gradient(90deg, #00853F 33%, #FDEF42 33%, #FDEF42 66%, #E31B23 66%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sénégal
            </span>
            {/* Étoile — percée transparente dans le dégradé via mix-blend-mode */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-20"
              style={{
                color: "#000000",
                fontSize: "0.35em",
                lineHeight: 1,
              }}
            >
              ★
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-7 sm:mb-8 text-[11px] sm:text-xs md:text-sm font-light max-w-sm sm:max-w-md mx-auto text-white/55 leading-relaxed px-2"
        >
          {t("home.subtitle") ??
            "Explorez la magie, la culture et la diversité du Sénégal à travers des expériences inoubliables."}
        </motion.p>

        {/* ===== SEARCH BAR ===== */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-full max-w-[960px] mx-auto px-1 relative"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `tours?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&city=${encodeURIComponent(city)}`;
          }}
          role="search"
          aria-label={t("search.ariaLabel") || "Recherche de tours"}
        >
          <div className="bg-white rounded-xl shadow-xl shadow-black/30 overflow-hidden border border-white/10">
            <div className="flex flex-col sm:flex-row sm:px-2 sm:py-2">
              {/* Tour Name */}
              <div
                className={`flex-1 flex items-center gap-3 px-4 py-3.5 sm:py-2.5 sm:rounded-lg border-b sm:border-b-0 transition-colors duration-150 ${
                  focusedField === "title" ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Recherche
                  </label>
                  <input
                    autoComplete="on"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-300 font-normal bg-transparent"
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
              </div>

              {/* Separator */}
              <div className="hidden sm:flex items-center">
                <div className="w-px h-7 bg-gray-200" />
              </div>

              {/* Budget */}
              <div
                className={`flex-1 flex items-center gap-3 px-4 py-3.5 sm:py-2.5 sm:rounded-lg border-b sm:border-b-0 transition-colors duration-150 ${
                  focusedField === "price" ? "bg-gray-50" : ""
                }`}
              >
                <DollarSign size={14} className="text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Budget
                  </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    onFocus={() => setFocusedField("price")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-300 font-normal bg-transparent"
                    type="number"
                    min="0"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder={t("search.price") || "Prix max (€)"}
                    name="description"
                    aria-label={t("search.price")}
                  />
                </div>
              </div>

              {/* Separator */}
              <div className="hidden sm:flex items-center">
                <div className="w-px h-7 bg-gray-200" />
              </div>

              {/* City */}
              <div
                className={`flex-1 flex items-center gap-3 px-4 py-3.5 sm:py-2.5 sm:rounded-lg border-b sm:border-b-0 transition-colors duration-150 ${
                  focusedField === "city" ? "bg-gray-50" : ""
                }`}
              >
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Destination
                  </label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    onFocus={() => setFocusedField("city")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-300 font-normal bg-transparent"
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

              {/* Search Button */}
              <div className="flex items-center sm:pl-1.5 sm:pr-1">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gray-900 hover:bg-gray-700 active:scale-95 transition-all duration-200 px-5 py-3.5 sm:py-0 sm:h-[48px] sm:rounded-lg flex items-center justify-center gap-2 group"
                  aria-label="Rechercher"
                >
                  <AiOutlineSearch size={16} className="text-white" />
                  <span className="text-white text-xs font-medium sm:hidden">
                    Rechercher
                  </span>
                  <ArrowRight
                    size={13}
                    className="text-white/60 hidden sm:block group-hover:translate-x-0.5 transition-transform duration-200"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.form>

        {/* ===== STATS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center justify-center gap-6 sm:gap-10 mt-8 sm:mt-10"
        >
          {[
            { end: 9000, start: 8800, label: t("home.visitor"), suffix: "+" },
            { end: 2000, start: 1950, label: t("home.attraction"), suffix: "+" },
            { end: 28, start: 0, label: t("home.culture"), suffix: "+" },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="w-px h-5 sm:h-7 bg-white/15" />
              )}
              <div className="flex flex-col items-center cursor-default">
                <span className="text-white font-semibold text-base sm:text-lg tabular-nums">
                  <CountUp start={stat.start} end={stat.end} duration={3} />
                  <span className="text-white/70">{stat.suffix}</span>
                </span>
                <span className="text-[8px] sm:text-[9px] text-white/40 font-medium tracking-[0.12em] uppercase mt-0.5">
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ===== SLIDE INDICATORS ===== */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-400 rounded-full ${
              bgIndex === idx
                ? "w-6 h-[3px] bg-white"
                : "w-1.5 h-[3px] bg-white/25 hover:bg-white/40"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
