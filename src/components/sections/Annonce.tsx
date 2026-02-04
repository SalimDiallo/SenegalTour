"use client";
import { Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Annonce = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-white px-4 py-2">
        {/* left */}
        <div className="hidden sm:flex items-center gap-6 text-xs text-gray-300">
          <a target={"_blank"} href="https://wa.me/+221772370789" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <FaWhatsapp size={12} />
            <span>+221 77 237 07 89</span>
          </a>
          <span className="text-gray-600">|</span>
          <a target={"_blank"} href="mailto:senegalpremiumtour@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={12} />
            <span>senegalpremiumtour@gmail.com</span>
          </a>
        </div>
        {/* right */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <Link
            target={"_blank"}
            href="https://www.instagram.com/trip.senegal"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Instagram size={20} className="text-red-500 hover:text-red-600 transition-colors" />
          </Link>
          <Link target={"_blank"} href="https://wa.me/+221772370789" className="text-green-500 hover:text-green-600 transition-colors">
            <FaWhatsapp size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Annonce;
