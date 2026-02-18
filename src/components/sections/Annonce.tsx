"use client";
import { Instagram, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Annonce = () => {
  return (
    <div className="bg-gray-900 border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Left — Contact info */}
        <div className="hidden sm:flex items-center gap-5 text-[11px] text-gray-400 tracking-wide">
          <a
            target="_blank"
            href="https://wa.me/+221772370789"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors duration-300"
          >
            <FaWhatsapp size={11} className="opacity-60" />
            <span>+221 77 237 07 89</span>
          </a>
          <span className="w-px h-3 bg-gray-700" />
          <a
            target="_blank"
            href="mailto:senegalpremiumtour@gmail.com"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors duration-300"
          >
            <Mail size={11} className="opacity-60" />
            <span>senegalpremiumtour@gmail.com</span>
          </a>
        </div>
        {/* Right — Social */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <Link
            target="_blank"
            href="https://www.instagram.com/trip.senegal"
            className="w-7 h-7 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-pink-500/20 transition-all duration-300 group"
          >
            <Instagram
              size={13}
              className="text-gray-500 group-hover:text-pink-400 transition-colors"
            />
          </Link>
          <Link
            target="_blank"
            href="https://wa.me/+221772370789"
            className="w-7 h-7 rounded-full bg-gray-800/80 flex items-center justify-center hover:bg-green-500/20 transition-all duration-300 group"
          >
            <FaWhatsapp
              size={13}
              className="text-gray-500 group-hover:text-green-400 transition-colors"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Annonce;
