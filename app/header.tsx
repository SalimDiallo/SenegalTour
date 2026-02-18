"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Button } from "../src/components/ui/Button";
import {
  Menu,
  X,
  Globe,
  Phone,
  ChevronRight,
  Instagram,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [lang, setLng] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { t } = useTranslation("en");

  useEffect(() => {
    setIsClient(true);
    if (!window.localStorage.getItem("lng")) {
      window.localStorage.setItem("lng", lang);
    }
    setLng(window.localStorage.getItem("lng") ?? "en");
    i18next.changeLanguage(localStorage.getItem("lng") ?? "en");

    const handleResize = () => {
      if (innerWidth >= 960) setOpenNav(false);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    addEventListener("resize", handleResize);
    addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      removeEventListener("resize", handleResize);
      removeEventListener("scroll", handleScroll);
    };
  }, [lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    isClient: boolean
  ) => {
    isClient && localStorage.setItem("lng", e.currentTarget.value);
    setLng(e.currentTarget.value);
    i18next.changeLanguage(localStorage.getItem("lng") ?? "en");
  };

  const navLinks = [
    { href: "/", label: t("menu.home") },
    { href: "/tours", label: t("menu.destination") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      {/* === TOP BAR — hidden on scroll & hidden on small mobile === */}
      <div
        className={`hidden sm:block transition-all duration-500 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-9 opacity-100"
        }`}
      >
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-1.5">
            <div className="flex items-center gap-4 text-[10px] text-white/50 tracking-wide">
              <a
                target="_blank"
                href="https://wa.me/+221772370789"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <FaWhatsapp size={10} className="opacity-60" />
                <span>+221 77 237 07 89</span>
              </a>
              <span className="w-px h-3 bg-white/15" />
              <a
                target="_blank"
                href="mailto:senegalpremiumtour@gmail.com"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
              >
                <Mail size={10} className="opacity-60" />
                <span>senegalpremiumtour@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Link
                target="_blank"
                href="https://www.instagram.com/trip.senegal"
                className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-500/20 transition-all group"
              >
                <Instagram size={11} className="text-white/40 group-hover:text-pink-400 transition-colors" />
              </Link>
              <Link
                target="_blank"
                href="https://wa.me/+221772370789"
                className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-500/20 transition-all group"
              >
                <FaWhatsapp size={11} className="text-white/40 group-hover:text-green-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* === MAIN NAV === */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0 flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Senegal Premium Tour"
              width={40}
              height={30}
              className="w-auto h-8 sm:h-9 lg:h-10 object-contain"
            />
            <div className="hidden xs:flex flex-col">
              <span
                className={`font-heading text-sm sm:text-base font-semibold leading-tight transition-colors duration-500 ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                Senegal<span className="text-cyan-400"> Tour</span>
              </span>
              <span
                className={`text-[7px] sm:text-[8px] tracking-[0.18em] uppercase font-medium transition-colors duration-500 ${
                  scrolled ? "text-gray-400" : "text-white/40"
                }`}
              >
                Premium Experience
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-4 py-2 text-[12px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-500 hover:text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] bg-cyan-400 rounded-full transition-all duration-400 w-0 group-hover:w-3/4" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="tel:+221772370789"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-300 ${
                scrolled
                  ? "text-gray-500 hover:text-cyan-600 hover:bg-cyan-50"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              <Phone size={11} />
              <span className="hidden xl:inline">+221 77 237 07 89</span>
            </a>
            <div className={`w-px h-4 ${scrolled ? "bg-gray-200" : "bg-white/15"}`} />
            <div className="relative flex items-center gap-1">
              <Globe size={12} className={scrolled ? "text-gray-400" : "text-white/40"} />
              <select
                name="lg"
                onChange={(e) => handleChange(e, isClient)}
                className={`appearance-none bg-transparent text-[11px] font-medium cursor-pointer outline-none pr-2 ${
                  scrolled ? "text-gray-600" : "text-white/70"
                }`}
                value={lang}
              >
                <option value="en" className="text-gray-800">EN</option>
                <option value="fr" className="text-gray-800">FR</option>
              </select>
            </div>
            <div className={`w-px h-4 ${scrolled ? "bg-gray-200" : "bg-white/15"}`} />
            <Button href="/contact" title={t("menu.contact")} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Language switcher on mobile */}
            <div className="flex items-center gap-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors shadow-sm border border-white/15">
        
              <div className="relative">
                <select
                  name="lg-mobile"
                  onChange={(e) => handleChange(e, isClient)}
                  className={`appearance-none bg-transparent text-[11px] font-medium cursor-pointer outline-none px-4 py-1 pr-6 rounded-full transition-colors border-0 ${
                    scrolled
                      ? "text-gray-700 focus:bg-cyan-50"
                      : "text-white/80 focus:bg-cyan-500/10"
                  }`}
                  value={lang}
                  style={{ minWidth: 56 }}
                >
                  <option value="en" className="text-gray-800 bg-white">
                    🇬🇧 EN
                  </option>
                  <option value="fr" className="text-gray-800 bg-white">
                    🇫🇷 FR
                  </option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400 text-xs">
                  ▼
                </span>
              </div>
            </div>

            <button
              className={`relative z-10 p-1.5 rounded-lg transition-colors duration-300 ${
                openNav
                  ? scrolled ? "bg-gray-100" : "bg-white/10"
                  : "bg-transparent"
              }`}
              onClick={() => setOpenNav(!openNav)}
              aria-label="Toggle menu"
            >
              {openNav ? (
                <X size={18} className={scrolled ? "text-gray-800" : "text-white"} />
              ) : (
                <Menu size={18} className={scrolled ? "text-gray-800" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Navigation Drawer === */}
      <AnimatePresence>
        {openNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenNav(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 h-full w-[260px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between px-4 pt-3 pb-2.5 border-b border-gray-100">
                <span className="font-heading text-sm font-semibold text-gray-800">Menu</span>
                <button
                  onClick={() => setOpenNav(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>

              <div className="flex flex-col h-[calc(100%-44px)] px-4 pt-3 pb-5">
                <nav className="flex flex-col gap-0.5">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-gray-600 hover:text-cyan-600 text-sm font-medium py-2.5 px-2.5 rounded-lg hover:bg-cyan-50/50 transition-all duration-300"
                        onClick={() => setOpenNav(false)}
                      >
                        {link.label}
                        <ChevronRight size={12} className="text-gray-200 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="my-3 h-px bg-gray-100" />

                <motion.a
                  href="tel:+221772370789"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 }}
                  className="flex items-center gap-2 text-xs text-gray-500 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-cyan-50 flex items-center justify-center">
                    <Phone size={11} className="text-cyan-500" />
                  </div>
                  +221 77 237 07 89
                </motion.a>

                <motion.a
                  href="mailto:senegalpremiumtour@gmail.com"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 }}
                  className="flex items-center gap-2 text-xs text-gray-500 px-2.5 py-2 rounded-lg hover:bg-gray-50 transition-colors mt-0.5"
                >
                  <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center">
                    <Mail size={11} className="text-gray-400" />
                  </div>
                  <span className="truncate">senegalpremiumtour@gmail.com</span>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.26 }}
                  className="flex items-center gap-2 mt-3 px-2.5"
                >
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/trip.senegal"
                    className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-pink-50 transition-colors group"
                  >
                    <Instagram size={12} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://wa.me/+221772370789"
                    className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center hover:bg-green-50 transition-colors group"
                  >
                    <FaWhatsapp size={12} className="text-gray-400 group-hover:text-green-500 transition-colors" />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-auto pt-3"
                >
                  <Button href="/contact" title={t("menu.contact")} />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
