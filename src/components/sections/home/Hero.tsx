"use client";
import Image from "next/image";
import React, { ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight, Sparkles, Tag, ChevronRight, DollarSign } from "lucide-react";

// Background slider images
const SLIDER_IMAGES = [
  "/assets/images/dakar2.jpg",
  "https://terresenmelees.org/wp-content/uploads/2024/08/Senegal-TerresenMelees.webp",
  "/assets/images/Dakar.jpg",
];

// Quick destination tags
const DESTINATIONS = [
  { name: "Dakar", emoji: "🏙️", color: "from-cyan-400/20 to-cyan-500/10", border: "border-cyan-400/20", hoverBg: "hover:bg-cyan-400/20" },
  { name: "Gorée", emoji: "🏝️", color: "from-amber-400/20 to-amber-500/10", border: "border-amber-400/20", hoverBg: "hover:bg-amber-400/20" },
  { name: "Saint-Louis", emoji: "🌊", color: "from-blue-400/20 to-blue-500/10", border: "border-blue-400/20", hoverBg: "hover:bg-blue-400/20" },
  { name: "Saly", emoji: "☀️", color: "from-orange-400/20 to-orange-500/10", border: "border-orange-400/20", hoverBg: "hover:bg-orange-400/20" },
  { name: "Casamance", emoji: "🌿", color: "from-emerald-400/20 to-emerald-500/10", border: "border-emerald-400/20", hoverBg: "hover:bg-emerald-400/20" },
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
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-900/40 to-gray-950/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/30 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 65%, rgba(0,0,0,0.3) 0%, transparent 70%)' }} />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white px-4 pt-16 sm:pt-20 pb-12 sm:pb-14">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-2 sm:mb-3"
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2 border border-white/15 text-white/70 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.18em] uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-md bg-white/5">
            <Sparkles size={9} className="text-cyan-400" />
            Agence de Tourisme Premium
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading font-semibold leading-[1.08] mb-2 sm:mb-3 text-balance max-w-3xl text-[1.6rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
        >
          {t("home.welcome") as ReactNode}{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500">
              Sénégal
            </span>
            <svg viewBox="0 0 200 10" className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-1.5 sm:h-2">
              <path d="M2 7C40 2 80 2 100 5C120 8 160 3 198 7" fill="none" stroke="rgba(34,211,238,0.45)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-4 sm:mb-5 text-[11px] sm:text-xs md:text-sm font-light max-w-sm sm:max-w-md mx-auto text-white/50 leading-relaxed px-2"
        >
          {t("home.subtitle") ??
            "Explorez la magie, la culture et la diversité du Sénégal à travers des expériences inoubliables."}
        </motion.p>


        {/* ===== SEARCH BAR ===== */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full max-w-[1020px] mx-auto px-1 relative"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `tours?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&city=${encodeURIComponent(city)}`;
          }}
          role="search"
          aria-label={t("search.ariaLabel") || "Recherche de tours"}
        >
          {/* Ambient glow */}
          <div className="absolute -inset-3 sm:-inset-5 rounded-3xl bg-cyan-500/8 blur-2xl -z-10" />
          <div className="absolute -inset-6 sm:-inset-8 rounded-3xl bg-black/15 blur-3xl -z-20" />

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 overflow-hidden border border-white/80">
            {/* Search bar header - desktop */}
            <div className="hidden sm:flex items-center gap-2 px-5 pt-3 pb-1">
              <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
                Trouvez votre prochaine aventure
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:px-2 sm:pb-2.5">
              {/* Tour Name */}
              <div
                className={`flex-1 flex items-center gap-2.5 px-3.5 py-3 sm:py-2.5 sm:rounded-xl border-b sm:border-b-0 transition-all duration-200 ${
                  focusedField === "title" ? "sm:bg-gray-50 sm:ring-1 sm:ring-cyan-200/50" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    Recherche
                  </label>
                  <input
                    autoComplete="on"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-700 text-[13px] placeholder:text-gray-300 font-medium bg-transparent border-1 border-gray-200 rounded-lg"
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

              {/* Separator - desktop */}
              <div className="hidden sm:flex items-center px-0.5">
                <div className="w-px h-8 bg-gray-200/70" />
              </div>

              {/* Budget */}
              <div
                className={`flex-1 flex items-center gap-2.5 px-3.5 py-3 sm:py-2.5 sm:rounded-xl border-b sm:border-b-0 transition-all duration-200 ${
                  focusedField === "price" ? "sm:bg-gray-50 sm:ring-1 sm:ring-amber-200/50" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <DollarSign size={14} className="text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    Budget
                  </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    onFocus={() => setFocusedField("price")}
                    onBlur={() => setFocusedField(null)}
                   className="w-full outline-none text-gray-700 text-[13px] placeholder:text-gray-300 font-medium bg-transparent border-1 border-gray-200 rounded-lg"
                   type="number"
                    min="0"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder={t("search.price") || "Prix max"}
                    name="description"
                    aria-label={t("search.price")}
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-300 flex-shrink-0 bg-gray-100 px-1.5 py-0.5 rounded-md">
                  €
                </span>
              </div>

              {/* Separator - desktop */}
              <div className="hidden sm:flex items-center px-0.5">
                <div className="w-px h-8 bg-gray-200/70" />
              </div>

              {/* City */}
              <div
                className={`flex-1 flex items-center gap-2.5 px-3.5 py-3 sm:py-2.5 sm:rounded-xl border-b sm:border-b-0 transition-all duration-200 ${
                  focusedField === "city" ? "sm:bg-gray-50 sm:ring-1 sm:ring-emerald-200/50" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin size={14} className="text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                    Destination
                  </label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.currentTarget.value)}
                    onFocus={() => setFocusedField("city")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full outline-none text-gray-700 text-[13px] placeholder:text-gray-300 font-medium bg-transparent border-1 border-gray-200 rounded-lg"
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
              <div className="flex items-center sm:pl-1 sm:pr-0.5">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 active:scale-95 transition-all duration-300 px-5 sm:px-5 py-3 sm:py-0 sm:h-[52px] sm:rounded-xl flex items-center justify-center gap-2 group shadow-lg shadow-cyan-500/20"
                  aria-label="Rechercher"
                >
                  <AiOutlineSearch
                    size={16}
                    className="text-white group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-white text-xs font-semibold sm:hidden">
                    Rechercher
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-white/70 hidden sm:block group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.form>

        {/* ===== STATS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center justify-center gap-5 sm:gap-8 md:gap-10 mt-5 sm:mt-8"
        >
          {[
            { end: 9000, start: 8800, label: t("home.visitor"), suffix: "+" },
            { end: 2000, start: 1950, label: t("home.attraction"), suffix: "+" },
            { end: 28, start: 0, label: t("home.culture"), suffix: "+" },
          ].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
              )}
              <div className="flex flex-col items-center cursor-default">
                <span className="text-white font-semibold text-base sm:text-lg md:text-xl tabular-nums tracking-tight">
                  <CountUp start={stat.start} end={stat.end} duration={3} />
                  <span className="text-cyan-400 font-bold">{stat.suffix}</span>
                </span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/35 font-medium tracking-[0.1em] uppercase mt-0.5">
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* ===== SLIDE INDICATORS ===== */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 sm:gap-2">
        {SLIDER_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-500 rounded-full ${
              bgIndex === idx
                ? "w-5 sm:w-7 h-1 bg-cyan-400"
                : "w-1.5 h-1 bg-white/25 hover:bg-white/40"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
