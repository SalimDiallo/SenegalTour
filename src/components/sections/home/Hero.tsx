"use client";
import { motion } from "framer-motion";
import { ArrowRight, Camera, DollarSign, MapPin, Search, Star, Users } from "lucide-react";
import Image from "next/image";
import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";

// Background slider images
const SLIDER_IMAGES = [
  "/assets/images/dakar2.jpg",
  "https://terresenmelees.org/wp-content/uploads/2024/08/Senegal-TerresenMelees.webp",
  "/assets/images/Dakar.jpg",
];

interface HeroProps {
  onSearch?: (title: string, price: number, city: string) => void;
}

const Hero = ({ onSearch }: HeroProps = {}) => {
  const { t } = useTranslation("en");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time search with debounce
  useEffect(() => {
    if (!onSearch) return;
    const timer = setTimeout(() => {
      const priceValue = description ? parseFloat(description) : 10000;
      onSearch(title, priceValue, city);
    }, 300);
    return () => clearTimeout(timer);
  }, [title, description, city, onSearch]);

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
      className="w-full relative overflow-hidden flex flex-col justify-center items-center"
      id="hero"
      style={{ minHeight: "100svh" }}
    >
      {/* ===== BACKGROUND SLIDER ===== */}
      <div className="absolute inset-0 w-full h-full z-0">
        {SLIDER_IMAGES.map((img, idx) => (
          <motion.div
            key={img}
            className="absolute inset-0 w-full h-full"
            animate={{
              opacity: bgIndex === idx ? 1 : 0,
              scale: bgIndex === idx ? 1 : 1.06,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
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

        {/* Premium overlay — cinematic gradient */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.20) 35%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.55) 100%)"
        }} />
        {/* Subtle warm tint for travel feel */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/8 via-transparent to-amber-900/8" />
        {/* le vert par primary (above: from-primary/8 instead of from-emerald-900/8) */}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 flex flex-col justify-center items-center w-full h-full text-center text-white px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24">

        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-7"
        >
          <span className="inline-flex items-center gap-2.5 border border-white/20 rounded-full px-5 py-2 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-white/75 font-medium backdrop-blur-sm">
            <Star size={11} className="text-amber-300/80" fill="currentColor" />
            Agence de tourisme — Sénégal
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading font-semibold leading-[1.12] mb-5 sm:mb-6 text-balance max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
          style={{ textShadow: "0 3px 25px rgba(0,0,0,0.25)" }}
        >
          {t("home.welcome") as ReactNode}{" "}
          <span className="relative inline-block" style={{ isolation: "isolate" }}>
            <span
              className="relative z-10"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #07C500 33%, #FDEF42 33%, #FDEF42 66%, #E31B23 66%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sénégal
            </span>
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-20"
              style={{ color: "#FFFFFF", fontSize: "0.35em", lineHeight: 1 }}
            >
              ★
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 sm:mb-12 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto text-white/70 leading-relaxed"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
        >
          {t("home.subtitle") ??
            "Explorez la magie, la culture et la diversité du Sénégal à travers des expériences inoubliables."}
        </motion.p>

        {/* ===== SEARCH BAR ===== */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full max-w-[920px] mx-auto relative"
          onSubmit={(e) => {
            e.preventDefault();
            if (onSearch) {
              const priceValue = description ? parseFloat(description) : 10000;
              onSearch(title, priceValue, city);
            } else {
              window.location.href = `tours?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&city=${encodeURIComponent(city)}`;
            }
          }}
          role="search"
          aria-label={t("search.ariaLabel") || "Recherche de tours"}
        >
          {/* Desktop search bar */}
          <div className="hidden sm:block">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 overflow-hidden border border-white/30">
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                {/* Tour Name */}
                <div
                  className={`flex flex-col gap-1.5 p-4 lg:p-5 transition-colors duration-150 cursor-text ${
                    focusedField === "title"
                      ? "bg-amber-50/30"
                      : "hover:bg-gray-50/50"
                  }`}
                  onClick={() => document.getElementById("search-title")?.focus()}
                >
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.12em]">
                    <Search size={12} className="text-amber-600" />
                    Recherche
                  </label>
                  <input
                    id="search-title"
                    autoComplete="on"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-400 font-medium bg-transparent"
                    type="text"
                    placeholder="Dakar, Gorée, Saint-Louis..."
                    name="title"
                    aria-label={t("search.title")}
                    list="hero-tour-suggestions"
                  />
                  <datalist id="hero-tour-suggestions">
                    <option value="Dakar City Tour" />
                    <option value="Goree Island" />
                    <option value="Pink Lake" />
                    <option value="Bandia Reserve" />
                  </datalist>
                </div>

                {/* Budget */}
                <div
                  className={`flex flex-col gap-1.5 p-4 lg:p-5 transition-colors duration-150 cursor-text ${
                    focusedField === "price"
                      ? "bg-amber-50/30"
                      : "hover:bg-gray-50/50"
                  }`}
                  onClick={() => document.getElementById("search-price")?.focus()}
                >
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.12em]">
                    <DollarSign size={12} className="text-amber-600" />
                    Budget Max
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="search-price"
                      value={description}
                      onChange={(e) => setDescription(e.currentTarget.value)}
                      onFocus={() => setFocusedField("price")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-400 font-medium bg-transparent"
                      type="number"
                      min="0"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="500"
                      name="description"
                      aria-label={t("search.price")}
                    />
                    <span className="text-gray-400 text-sm font-semibold">€</span>
                  </div>
                </div>

                {/* City */}
                <div
                  className={`flex flex-col gap-1.5 p-4 lg:p-5 transition-colors duration-150 cursor-text ${
                    focusedField === "city"
                      ? "bg-amber-50/30"
                      : "hover:bg-gray-50/50"
                  }`}
                  onClick={() => document.getElementById("search-city")?.focus()}
                >
                  <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.12em]">
                    <MapPin size={12} className="text-amber-600" />
                    Destination
                  </label>
                  <input
                    id="search-city"
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    onFocus={() => setFocusedField("city")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-400 font-medium bg-transparent"
                    type="text"
                    placeholder="Dakar, Thiès..."
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

              {/* Search info bar */}
              {onSearch && (title || description || city) && (
                <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    Recherche en temps réel activée
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setDescription("");
                      setCity("");
                    }}
                    className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Effacer
                  </button>
                </div>
              )}

              {/* Desktop search button */}
              {!onSearch && (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary transition-all duration-300 px-6 py-3.5 flex items-center justify-center gap-2.5 group shadow-md shadow-primary/20"
                  aria-label="Rechercher"
                >
                  <AiOutlineSearch size={17} className="text-white" />
                  <span className="text-white text-sm font-semibold tracking-wide">
                    Rechercher
                  </span>
                  <ArrowRight
                    size={15}
                    className="text-white/80 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Mobile search bar — compact */}
          <div className="sm:hidden">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 overflow-hidden border border-white/30">
              <div className="p-3 space-y-2">
                {/* Tour Name */}
                <div
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-colors duration-150 ${
                    focusedField === "title"
                      ? "bg-amber-50 ring-1 ring-amber-200/50"
                      : "bg-gray-50"
                  }`}
                >
                  <Search size={16} className="text-amber-600 shrink-0" />
                  <input
                    autoComplete="on"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-400 font-medium bg-transparent"
                    type="text"
                    placeholder="Rechercher un tour..."
                    name="title-mobile"
                    aria-label={t("search.title")}
                    list="hero-tour-suggestions-mobile"
                  />
                  <datalist id="hero-tour-suggestions-mobile">
                    <option value="Dakar City Tour" />
                    <option value="Goree Island" />
                    <option value="Pink Lake" />
                    <option value="Bandia Reserve" />
                  </datalist>
                </div>

                {/* Budget + City on same row */}
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl transition-colors duration-150 ${
                      focusedField === "price"
                        ? "bg-amber-50 ring-1 ring-amber-200/50"
                        : "bg-gray-50"
                    }`}
                  >
                    <DollarSign size={15} className="text-amber-600 shrink-0" />
                    <input
                      value={description}
                      onChange={(e) => setDescription(e.currentTarget.value)}
                      onFocus={() => setFocusedField("price")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-400 font-medium bg-transparent"
                      type="number"
                      min="0"
                      inputMode="numeric"
                      placeholder="Budget €"
                      name="description-mobile"
                      aria-label={t("search.price")}
                    />
                  </div>
                  <div
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl transition-colors duration-150 ${
                      focusedField === "city"
                        ? "bg-amber-50 ring-1 ring-amber-200/50"
                        : "bg-gray-50"
                    }`}
                  >
                    <MapPin size={15} className="text-amber-600 shrink-0" />
                    <input
                      value={city}
                      onChange={(e) => setCity(e.currentTarget.value)}
                      onFocus={() => setFocusedField("city")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full outline-none text-gray-800 text-sm placeholder:text-gray-400 font-medium bg-transparent"
                      type="text"
                      placeholder="Ville"
                      name="city-mobile"
                      aria-label={t("search.city")}
                      list="hero-city-suggestions-mobile"
                    />
                    <datalist id="hero-city-suggestions-mobile">
                      <option value="Dakar" />
                      <option value="Saint-Louis" />
                      <option value="Saly" />
                      <option value="Ziguinchor" />
                    </datalist>
                  </div>
                </div>
              </div>

              {/* Mobile real-time info */}
              {onSearch && (title || description || city) && (
                <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <p className="text-[11px] text-gray-500">Recherche en direct</p>
                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setDescription("");
                      setCity("");
                    }}
                    className="text-[11px] text-amber-700 hover:text-amber-800 font-medium transition-colors"
                  >
                    Effacer
                  </button>
                </div>
              )}

              {/* Mobile search button */}
              {!onSearch && (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary transition-all duration-300 px-5 py-3.5 flex items-center justify-center gap-2 group shadow-md shadow-primary/20"
                  aria-label="Rechercher"
                >
                  <AiOutlineSearch size={16} className="text-white" />
                  <span className="text-white text-[13px] font-semibold tracking-wide">
                    Rechercher
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/80 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
              )}
            </div>
          </div>
        </motion.form>

        {/* ===== STATS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-6 sm:gap-10 lg:gap-14 mt-10 sm:mt-14"
        >
          {[
            {
              end: 9000,
              start: 8800,
              label: t("home.visitor"),
              suffix: "+",
              icon: <Users size={13} className="text-white/50" />,
            },
            {
              end: 2000,
              start: 1950,
              label: t("home.attraction"),
              suffix: "+",
              icon: <Camera size={13} className="text-white/50" />,
            },
            {
              end: 28,
              start: 0,
              label: t("home.culture"),
              suffix: "+",
              icon: <Star size={13} className="text-amber-300/60" />,
            },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="w-px h-8 sm:h-10 bg-white/15 rounded-full" />
              )}
              <div className="flex flex-col items-center cursor-default group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="hidden sm:block opacity-60 group-hover:opacity-80 transition-opacity">
                    {stat.icon}
                  </span>
                  <span className="text-white font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums tracking-tight">
                    <CountUp start={stat.start} end={stat.end} duration={2.5} />
                    <span className="text-white/50 font-medium ml-0.5">{stat.suffix}</span>
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-white/50 font-medium tracking-[0.12em] uppercase">
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ===== SLIDE INDICATORS ===== */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-500 rounded-full ${
              bgIndex === idx
                ? "w-8 h-1 bg-white"
                : "w-2 h-1 bg-white/25 hover:bg-white/45"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom gradient fade for smooth transition to next section */}
    </section>
  );
};

export default Hero;
