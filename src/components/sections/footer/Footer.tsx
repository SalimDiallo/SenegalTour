"use client";
import { Instagram } from "lucide-react";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Logo + description */}
          <div>
            <Image src="/logo.png" alt="Senegal Premium Tour" height={44} width={90} className="mb-4" />
            <p className="text-sm text-gray-400 leading-relaxed">
              <ContentTranslation title="footer.description" />
            </p>
          </div>
          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Navigation</h4>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"><ContentTranslation title="menu.home" /></Link></li>
              <li><Link href="/tours" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"><ContentTranslation title="menu.destination" /></Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"><ContentTranslation title="menu.contact" /></Link></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">Contact</h4>
            <p className="text-sm text-gray-400 mb-1">+221 77 237 07 89</p>
            <p className="text-sm text-gray-400 mb-4">senegalpremiumtour@gmail.com</p>
            <div className="flex items-center gap-3">
              <Link target={"_blank"} href="https://www.instagram.com/trip.senegal" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram size={18} />
              </Link>
              <Link target={"_blank"} href="tel:+221772370789" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <FaWhatsapp size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-gray-500">
            © 2023–2024 SenegalPremiumTour. <ContentTranslation title="footer.copyright" />.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
