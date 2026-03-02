"use client";
import React, { useState, useEffect, useCallback } from "react";
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
  MapPin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [lang, setLng] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const { t } = useTranslation("en");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (openNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openNav]);

  useEffect(() => {
    setIsClient(true);
    if (!window.localStorage.getItem("lng")) {
      window.localStorage.setItem("lng", lang);
    }
    setLng(window.localStorage.getItem("lng") ?? "en");
    i18next.changeLanguage(localStorage.getItem("lng") ?? "en");

    const handleResize = () => {
      if (innerWidth >= 1024) setOpenNav(false);
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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, client: boolean) => {
      client && localStorage.setItem("lng", e.currentTarget.value);
      setLng(e.currentTarget.value);
      i18next.changeLanguage(localStorage.getItem("lng") ?? "en");
    },
    []
  );

  const closeMenu = useCallback(() => setOpenNav(false), []);

  const navLinks = [
    { href: "/", label: t("menu.home") },
    { href: "/tours", label: t("menu.destination") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        {/* === TOP BAR (desktop only) === */}
        <div
          className={`hidden lg:block border-b border-gray-100 transition-all duration-500 overflow-hidden ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 xl:px-8 py-2">
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <a
                target="_blank"
                href="tel:+221772370789"
                className="flex items-center gap-2 hover:text-cyan-600 transition-colors duration-200"
              >
                <Phone size={13} strokeWidth={1.8} />
                <span>+221 77 237 07 89</span>
              </a>
              <span className="w-px h-3.5 bg-gray-200" />
              <a
                target="_blank"
                href="mailto:senegalpremiumtour@gmail.com"
                className="flex items-center gap-2 hover:text-cyan-600 transition-colors duration-200"
              >
                <Mail size={13} strokeWidth={1.8} />
                <span>senegalpremiumtour@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Link
                target="_blank"
                href="https://www.instagram.com/trip.senegal"
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={14} strokeWidth={1.8} />
              </Link>
              <Link
                target="_blank"
                href="https://wa.me/+221772370789"
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-green-500 hover:bg-green-50 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* === MAIN NAV BAR === */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[68px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <Image
                src="/logo.png"
                alt="Senegal Premium Tour"
                width={44}
                height={44}
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm sm:text-base lg:text-[17px] leading-tight tracking-tight">
                  Senegal Tour
                </span>
                <span className="text-[9px] sm:text-[10px] text-cyan-600/80 uppercase tracking-[0.18em] font-semibold">
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
                  className="relative px-5 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-500 rounded-full transition-all duration-300 w-0 group-hover:w-6" />
                </Link>
              ))}
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+221772370789"
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-cyan-600 transition-colors duration-200"
              >
                <Phone size={15} strokeWidth={1.8} />
                <span className="text-[13px]">+221 77 237 07 89</span>
              </a>

              <span className="w-px h-5 bg-gray-200" />

              <div className="relative">
                <Globe
                  size={14}
                  strokeWidth={1.8}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <select
                  name="lg"
                  onChange={(e) => handleChange(e, isClient)}
                  className="appearance-none bg-transparent border border-gray-200 rounded-lg pl-8 pr-7 py-1.5 text-[13px] text-gray-600 cursor-pointer hover:border-gray-300 focus:outline-none focus:border-cyan-500 transition-colors duration-200"
                  value={lang}
                >
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
                <ChevronRight
                  size={12}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                />
              </div>

              <Button href="/contact" title={t("menu.contact")} />
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Language selector - compact */}
              <div className="relative">
                <select
                  name="lg-mobile"
                  onChange={(e) => handleChange(e, isClient)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-2.5 pr-6 py-1.5 text-[11px] font-semibold text-gray-600 cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors uppercase tracking-wide"
                  value={lang}
                >
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
                <ChevronRight
                  size={10}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Hamburger button */}
              <button
                className="relative w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                onClick={() => setOpenNav(!openNav)}
                aria-label="Toggle menu"
                aria-expanded={openNav}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {openNav ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={22} strokeWidth={2} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={22} strokeWidth={2} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MOBILE DRAWER (portal-level, outside header) ===== */}
      <AnimatePresence>
        {openNav && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[9998] lg:hidden"
              onClick={closeMenu}
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[9999] lg:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Senegal Tour"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                  <span className="font-semibold text-gray-900 text-sm">
                    Senegal Tour
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-5">
                {/* Navigation links */}
                <nav className="space-y-0.5">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center justify-between text-gray-700 hover:text-cyan-600 hover:bg-cyan-50/50 px-4 py-3.5 rounded-xl transition-all duration-200 group"
                        onClick={closeMenu}
                      >
                        <span className="font-medium text-[15px]">
                          {link.label}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-gray-300 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all duration-200"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Divider */}
                <div className="my-5 mx-4 h-px bg-gray-100" />

                {/* Contact info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <p className="px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.14em] mb-2.5">
                    Contact
                  </p>
                  <a
                    href="tel:+221772370789"
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-cyan-600 px-4 py-3 rounded-xl hover:bg-cyan-50/50 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                      <Phone
                        size={15}
                        className="text-cyan-600"
                        strokeWidth={1.8}
                      />
                    </div>
                    <span className="text-[13px] font-medium">
                      +221 77 237 07 89
                    </span>
                  </a>
                  <a
                    href="mailto:senegalpremiumtour@gmail.com"
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-cyan-600 px-4 py-3 rounded-xl hover:bg-cyan-50/50 transition-all duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                      <Mail
                        size={15}
                        className="text-cyan-600"
                        strokeWidth={1.8}
                      />
                    </div>
                    <span className="text-[13px] font-medium truncate">
                      senegalpremiumtour@gmail.com
                    </span>
                  </a>
                </motion.div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  className="mt-5"
                >
                  <p className="px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.14em] mb-2.5">
                    Réseaux sociaux
                  </p>
                  <div className="flex items-center gap-2 px-4">
                    <Link
                      target="_blank"
                      href="https://www.instagram.com/trip.senegal"
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:border-pink-200 text-gray-500 hover:text-pink-500 transition-all duration-200"
                      aria-label="Instagram"
                    >
                      <Instagram size={17} strokeWidth={1.8} />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://wa.me/+221772370789"
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-green-50 hover:border-green-200 text-gray-500 hover:text-green-500 transition-all duration-200"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp size={17} />
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Drawer footer (CTA) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="shrink-0 px-5 py-4 border-t border-gray-100 bg-gray-50/50"
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl py-3 text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-cyan-500/20"
                >
                  <MapPin size={15} strokeWidth={2} />
                  {t("menu.contact")}
                  <ChevronRight size={14} strokeWidth={2} />
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}