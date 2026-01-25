"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Button } from "../../ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("en");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  return (
    <div
      data-aos="fade-in"
      className="w-full h-[66rem] max-sm:h-[30rem] relative"
    >
      <div className="md:hidden w-full h-full">
        <Image
          className="w-full h-full object-cover"
          src={"/assets/images/dakar2.jpg"}
          alt="picture illustration dakar senegal premium tour hero section"
          width={300}
          height={300}
        />
      </div>
      <div className="max-md:hidden w-full h-full">
        <Image
          className="w-full h-full object-cover"
          src={"/assets/images/dakar2.jpg"}
          alt="picture illustration dakar senegal premium tour hero section"
          width={800}
          height={800}
        />
      </div>
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/40"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-2xl text-center text-white p-4">
        <motion.h1
          initial={{ y: "2rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            type: "ease-in",
          }}
          className="text-4xl font-extrabold max-sm:text-2xl"
        >
          {t("home.welcome") as ReactNode}{" "}
          <span>
            <span className="text-red-500">Sé</span>
            <span className="text-yellow-200">n⭑</span>
            <span className="text-cyan-300">gal !</span>
          </span>
        </motion.h1>
        <div className="flex items-top justify-center py-4 gap-8">
          <div className="flex flex-col">
            <span className="text-cyan-300 font-extrabold text-2xl max-sm:text-xl">
              <CountUp start={8800} end={9000} duration={3} /> <span>+</span>
            </span>
            <span className="text-base max-sm:text-sm">
              {t("home.visitor")}
            </span>
          </div>

          <div className="flex flex-col px-2 items-center justify-center">
            <span className="text-cyan-300 font-extrabold text-2xl max-sm:text-xl">
              <CountUp start={1950} end={2000} duration={3} /> <span>+</span>
            </span>
            <span className="text-base max-sm:text-sm">
              {t("home.attraction")}
            </span>
          </div>

          <div className="flex flex-col px-2 items-center justify-center">
            <span className="text-cyan-300 font-extrabold  text-2xl max-sm:text-xl">
              <CountUp end={28} /> <span>+</span>
            </span>
            <span className="text-base max-sm:text-sm">
              {t("home.culture")}
            </span>
          </div>
        </div>
        <form
          className="sm:grid grid-cols-9 items-center justify-between max-w-[700px] mx-auto w-full border p-1
          rounded-md text-black bg-gray-100/90"
        >
          <div className="col-span-8 sm:flex">
            <div className="border-2 sm:border-r-black">
              <input
                onChange={(e) => setTitle(e.currentTarget.value)}
                className="bg-transparent w-full outline-none border-none hover:outline-none focus:border-transparent  font-[Poppins] focus:outline-none border-r border-2 border-black
                  "
                type="text"
                placeholder={t("search.title")}
                name="title"
              />
            </div>
            <div className="border-2 sm:border-r-black">
              <input
                onChange={(e) => setDescription(e.currentTarget.value)}
                className="bg-transparent w-full outline-none border-none hover:outline-none focus:border-transparent  font-[Poppins] focus:outline-none border-r border-2 border-black
                  "
                type="number"
                placeholder={t("search.price")}
                name="description"
              />
            </div>
            <div>
              <input
                onChange={(e) => setCity(e.currentTarget.value)}
                className="bg-transparent w-full outline-none border-none hover:outline-none focus:border-transparent  font-[Poppins] focus:outline-none
                  "
                type="text"
                placeholder={t("search.city")}
                name="city"
              />
            </div>
          </div>

          <Button
            href={`tours?title=${title}&description=${description}&city=${city}`}
            title=""
          >
            <AiOutlineSearch
              size={20}
              className="icon z-30"
              style={{ color: "black" }}
            />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
