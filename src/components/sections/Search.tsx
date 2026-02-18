"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { MapPin, Calendar } from "lucide-react";

const Search = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const { t } = useTranslation("en");

  return (
    <section className="relative bg-[url('/assets/images/hero-image.png')] bg-cover bg-center bg-fixed">
      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 border border-white/15 text-white/60 text-[11px] tracking-[0.2em] uppercase px-5 py-2 rounded-full backdrop-blur-md bg-white/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Destinations
        </span>

        <h1 className="font-heading text-white text-4xl md:text-6xl font-semibold mb-3 leading-tight text-balance">
          <ContentTranslation title="tours.search.title" />
        </h1>
        <p className="text-cyan-300/80 text-sm font-medium mb-10 max-w-md">
          <ContentTranslation title="tours.search.description" />
        </p>

        {/* Search form */}
        <form
          className="w-full bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `/tours?title=${title}&description=${description}&city=${city}`;
          }}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
              <AiOutlineSearch size={18} className="text-gray-300 flex-shrink-0" />
              <input
                onChange={(e) => setTitle(e.currentTarget.value)}
                type="text"
                placeholder={t("search.title")}
                className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400 border-1 border-gray-200"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
              <Calendar size={16} className="text-gray-300 flex-shrink-0" />
              <input
                onChange={(e) => setDescription(e.currentTarget.value)}
                type="number"
                placeholder={t("search.price")}
                className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400 border-1 border-gray-200"
              />
              <span className="text-gray-400 text-xs font-medium flex-shrink-0">€</span>
            </div>
            <div className="flex-1 flex items-center gap-3 px-5 py-4">
              <MapPin size={16} className="text-gray-300 flex-shrink-0" />
              <input
                onChange={(e) => setCity(e.currentTarget.value)}
                type="text"
                placeholder={t("search.city")}
                className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400 border-1 border-gray-200"
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white text-sm font-semibold py-3.5 text-center"
          >
            {t("search.submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Search;
