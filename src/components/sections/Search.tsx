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
    <section className="bg-[url('/assets/images/hero-image.png')] bg-cover h-[40rem] mb-20">
      <div className="w-full h-full flex bg-black bg-opacity-50">
        <form className="max-w-5xl mx-auto flex flex-col items-center justify-center w-fit ">
          <h1 className=" text-white py-2 px-2 italic text-4xl font-light text-center  leading-[3rem]">
            <ContentTranslation title="tours.search.title" />
          </h1>

          <h3 className="text-sky-500  font-extrabold text-xl pb-6">
            <ContentTranslation title="tours.search.description" />
          </h3>
          <div className="py-3 w-[80%]">
            <input
              onChange={(e) => setTitle(e.currentTarget.value)}
              type="text"
              placeholder={t("search.title")}
              className="w-full p-2 rounded-md"
            />
          </div>
          <div className="py-3 w-[80%]">
            <input
              onChange={(e) => setDescription(e.currentTarget.value)}
              type="number"
              placeholder={t("search.price")}
              className="w-full p-2 rounded-md"
            />
          </div>
          <div className="py-3 w-[80%]">
            <input
              onChange={(e) => setCity(e.currentTarget.value)}
              type="text"
              placeholder={t("search.city")}
              className=" p-2 rounded-md w-full"
            />
          </div>

          <div className="py-3 w-[80%]">
            <Link
              href={`tours?title=${title}&description=${description}&city=${city}`}
              placeholder="send"
              type={"submit"}
              className="bg-primary hover:bg-primary px-1 py-2  text-center text-white rounded-lg p-2 w-full text-lg"
            >
              {t("search.submit")}
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
