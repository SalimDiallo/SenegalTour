"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import { useTranslation } from "react-i18next";

const Search = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const { t } = useTranslation("en");

  return (
    <section className="bg-[url('/assets/images/hero-image.png')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-gray-900/55"></div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-2 leading-tight">
          <ContentTranslation title="tours.search.title" />
        </h1>
        <p className="text-cyan-300 text-sm font-medium mb-8">
          <ContentTranslation title="tours.search.description" />
        </p>
        <form className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <input
              onChange={(e) => setTitle(e.currentTarget.value)}
              type="text"
              placeholder={t("search.title")}
              className="flex-1 outline-none px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400"
            />
            <input
              onChange={(e) => setDescription(e.currentTarget.value)}
              type="number"
              placeholder={t("search.price")}
              className="flex-1 outline-none px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400"
            />
            <input
              onChange={(e) => setCity(e.currentTarget.value)}
              type="text"
              placeholder={t("search.city")}
              className="flex-1 outline-none px-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400"
            />
          </div>
          <Link
            href={`tours?title=${title}&description=${description}&city=${city}`}
            className="block w-full bg-cyan-500 hover:bg-cyan-600 transition-colors text-white text-sm font-semibold py-3 text-center"
          >
            {t("search.submit")}
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Search;
