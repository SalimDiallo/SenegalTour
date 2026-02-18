"use client";
import { Instagram, ArrowUpRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo + description */}
          <div className="md:col-span-2">
            <Image
              src="/logo.png"
              alt="Senegal Premium Tour"
              height={44}
              width={90}
              className="mb-5"
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              <ContentTranslation title="footer.description" />
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              <Link
                target="_blank"
                href="https://www.instagram.com/trip.senegal"
                className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700/50 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/30 transition-all duration-300 group"
              >
                <Instagram
                  size={15}
                  className="text-gray-500 group-hover:text-pink-400 transition-colors"
                />
              </Link>
              <Link
                target="_blank"
                href="https://wa.me/+221772370789"
                className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700/50 flex items-center justify-center hover:bg-green-500/20 hover:border-green-500/30 transition-all duration-300 group"
              >
                <FaWhatsapp
                  size={15}
                  className="text-gray-500 group-hover:text-green-400 transition-colors"
                />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white/80 mb-5 tracking-[0.15em] uppercase">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-1"
                >
                  <ContentTranslation title="menu.home" />
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-1"
                >
                  <ContentTranslation title="menu.destination" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 inline-flex items-center gap-1"
                >
                  <ContentTranslation title="menu.contact" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white/80 mb-5 tracking-[0.15em] uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-400">+221 77 237 07 89</p>
              <p className="text-sm text-gray-400">senegalpremiumtour@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-gray-500 tracking-wide">
            © 2023–2025 SenegalPremiumTour.{" "}
            <ContentTranslation title="footer.copyright" />
          </span>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-[11px] text-gray-500 hover:text-cyan-400 transition-colors inline-flex items-center gap-1"
          >
            Retour en haut
            <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
