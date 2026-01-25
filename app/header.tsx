"use client";
import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Button } from "../src/components/ui/Button";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [isCLient, setIsClient] = useState(false);
  const [lang, setLng] = useState("");

  const { t } = useTranslation("en");

  React.useEffect(() => {
    setIsClient(true);
    if (!window.localStorage.getItem("lng")) {
      window.localStorage.setItem("lng", lang);
    }
    setLng(window.localStorage.getItem("lng") ?? "en");
    i18next.changeLanguage(localStorage.getItem("lng") ?? "en");
    addEventListener("resize", () => innerWidth >= 960 && setOpenNav(false));
  }, [lang]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    isClient: boolean
  ) => {
    isClient && localStorage.setItem("lng", e.currentTarget.value);
    setLng(e.currentTarget.value);
    i18next.changeLanguage(localStorage.getItem("lng") ?? "en");
  };

  const navList = (
    <div className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 w-">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href={`/`} className="flex items-center">
          {t("menu.home")}
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href={`/tours`} className="flex items-center">
          {" "}
          {t("menu.destination")}
        </Link>
      </Typography>
    </div>
  );

  return (
    <Navbar className="mx-auto max-w-6xl border-none  py-4 px-4 text-black lg:px-8 lg:py-4  items-center">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer  font-medium"
        >
          <Link href={`/`}>
            <Image
              src={"/logo.png"}
              alt="logo de senegal premium Tour"
              width={70}
              height={50}
            />
          </Link>
        </Typography>

        <div className="hidden lg:block">{navList}</div>

        <label htmlFor="underline_select" className="sr-only">
          langue selected
        </label>
        <select
          name="lg"
          onChange={(e) => {
            handleChange(e, isCLient);
          }}
          id="underline_select"
          className="block py-2.5 px-2  text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option
            selected={lang === "en"}
            value="en"
            className=" flex justify-center items-center"
          >
            <span>En</span> <h2 className="text-xl">🏴󠁧󠁢󠁥󠁮󠁧󠁿</h2>
          </option>
          <option
            selected={lang === "fr"}
            value="fr"
            className=" flex justify-center items-center"
          >
            <span>Fr</span> <h2 className="text-xl">🇫🇷</h2>
          </option>
        </select>

        <div className="max-lg:hidden">
          <Button href="tel:+221772370789" title={t("menu.contact")}></Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button href="tel:+221772370789" title={t("menu.contact")}></Button>
        </div>
      </Collapse>
    </Navbar>
  );
}
