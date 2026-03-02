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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm"
          : "bg-white/95 backdrop-blur-md"
      }`}
    >
      {/* === TOP BAR === */}
      <div
        className={`hidden md:block border-b transition-all duration-300 ${
          scrolled 
            ? "border-gray-100 opacity-0 max-h-0" 
            : "border-gray-200 opacity-100 max-h-10"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-2">
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <a
              target="_blank"
              href="tel:+221772370789"
              className="flex items-center gap-2 hover:text-cyan-600 transition-colors"
            >
              <Phone size={14} />
              <span>+221 77 237 07 89</span>
            </a>
            <span className="w-px h-4 bg-gray-200" />
            <a
              target="_blank"
              href="mailto:senegalpremiumtour@gmail.com"
              className="flex items-center gap-2 hover:text-cyan-600 transition-colors"
            >
              <Mail size={14} />
              <span>senegalpremiumtour@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              target="_blank"
              href="https://www.instagram.com/trip.senegal"
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </Link>
            <Link
              target="_blank"
              href="https://wa.me/+221772370789"
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* === MAIN NAV === */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Senegal Premium Tour"
              width={48}
              height={48}
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-base lg:text-lg leading-tight">
                Senegal Tour
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
                Premium Experience
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-cyan-500 rounded-full transition-all duration-300 w-0 group-hover:w-8" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+221772370789"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-cyan-600 transition-colors"
            >
              <Phone size={16} />
              <span>+221 77 237 07 89</span>
            </a>
            
            <div className="w-px h-5 bg-gray-200" />
            
            <div className="relative">
              <Globe size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                name="lg"
                onChange={(e) => handleChange(e, isClient)}
                className="appearance-none bg-transparent border border-gray-200 rounded-lg pl-9 pr-8 py-1.5 text-sm text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:border-cyan-500 transition-colors"
                value={lang}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
              <ChevronRight size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
            </div>

            <Button href="/contact" title={t("menu.contact")} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="relative">
              <select
                name="lg-mobile"
                onChange={(e) => handleChange(e, isClient)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 pr-7 py-1.5 text-xs text-gray-700 cursor-pointer focus:outline-none focus:border-cyan-500 transition-colors"
                value={lang}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
              <ChevronRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
            </div>

            <button
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setOpenNav(!openNav)}
              aria-label="Toggle menu"
            >
              {openNav ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* === Mobile Navigation Drawer === */}
      <AnimatePresence>
        {openNav && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setOpenNav(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span className="font-semibold text-gray-900">Menu</span>
                <button
                  onClick={() => setOpenNav(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col h-[calc(100%-73px)] px-6 py-6">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center justify-between text-gray-700 hover:text-cyan-600 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all group"
                        onClick={() => setOpenNav(false)}
                      >
                        <span className="font-medium">{link.label}</span>
                        <ChevronRight
                          size={16}
                          className="text-gray-300 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="my-6 h-px bg-gray-100" />

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-3"
                >
                  <a
                    href="tel:+221772370789"
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-cyan-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Phone size={16} className="text-gray-600" />
                    </div>
                    +221 77 237 07 89
                  </a>

                  <a
                    href="mailto:senegalpremiumtour@gmail.com"
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-cyan-600 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Mail size={16} className="text-gray-600" />
                    </div>
                    <span className="truncate text-xs">
                      senegalpremiumtour@gmail.com
                    </span>
                  </a>
                </motion.div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mt-6 px-4"
                >
                  <Link
                    target="_blank"
                    href="https://www.instagram.com/trip.senegal"
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-pink-50 text-gray-600 hover:text-pink-500 transition-all"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://wa.me/+221772370789"
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-green-50 text-gray-600 hover:text-green-500 transition-all"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </Link>
                </motion.div>

                {/* Contact button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-auto pt-6"
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