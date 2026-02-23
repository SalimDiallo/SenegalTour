"use client";

import React from "react";
import { useState, useEffect } from "react";
import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { MapPin } from "lucide-react";

interface SearchProps {
  onSearch?: (title: string, price: number, city: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const { t } = useTranslation("en");

  // Real-time search with debounce
  useEffect(() => {
    if (!onSearch) return;

    const timer = setTimeout(() => {
      const priceValue = description ? parseFloat(description) : 10000;
      onSearch(title, priceValue, city);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [title, description, city, onSearch]);

  return (
    <section className="relative bg-[url('/assets/images/hero-image.png')] bg-cover bg-center overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/90 to-cyan-900/95" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 md:pt-40">
        {/* Header */}
        <div className="text-center mb-10">
          {/* <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-full mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Destinations
          </div> */}

          <h1 className="font-heading text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <ContentTranslation title="tours.search.title" />
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
            <ContentTranslation title="tours.search.description" />
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Search by destination */}
            <div className="group">
              <label className="flex flex-col p-4 cursor-text h-full bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <AiOutlineSearch size={14} className="text-cyan-600" />
                  {t("search.title")}
                </span>
                <input
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  type="text"
                  value={title}
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="Dakar, Gorée, Saint-Louis..."
                  className="bg-transparent outline-none w-full text-base text-gray-800 placeholder:text-gray-400 font-medium"
                  aria-label={t("search.title")}
                />
              </label>
            </div>

            {/* Search by price */}
            <div className="group">
              <label className="flex flex-col p-4 cursor-text h-full bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {t("search.price")}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    type="number"
                    min={0}
                    inputMode="numeric"
                    autoComplete="off"
                    value={description}
                    placeholder="500"
                    className="bg-transparent outline-none w-full text-base text-gray-800 placeholder:text-gray-400 font-medium"
                    aria-label={t("search.price")}
                  />
                  <span className="text-gray-500 text-sm font-semibold">€</span>
                </div>
              </label>
            </div>

            {/* Search by city */}
            <div className="group">
              <label className="flex flex-col p-4 cursor-text h-full bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <MapPin size={14} className="text-cyan-600" />
                  {t("search.city")}
                </span>
                <input
                  onChange={(e) => setCity(e.currentTarget.value)}
                  type="text"
                  spellCheck={false}
                  autoComplete="off"
                  value={city}
                  placeholder="Dakar, Thiès..."
                  className="bg-transparent outline-none w-full text-base text-gray-800 placeholder:text-gray-400 font-medium"
                  aria-label={t("search.city")}
                />
              </label>
            </div>
          </div>

          {/* Search info and clear button */}
          {(title || description || city) && (
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-600">
                Recherche en temps réel activée
              </p>
              <button
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setCity("");
                }}
                className="text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Effacer
              </button>
            </div>
          )}
        </div>

        {/* Search tips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/60">Recherches populaires :</span>
          {["Dakar", "Gorée", "Lac Rose", "Saint-Louis"].map((term) => (
            <button
              key={term}
              onClick={() => setTitle(term)}
              className="text-xs bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full transition-colors border border-white/20"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
