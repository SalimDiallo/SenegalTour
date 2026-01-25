"use client";
import { Instagram } from "lucide-react";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import ContentTranslation from "@/app/tours/[tourId]/ContentTranslation";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="pt-28">
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto flex flex-col px-4">
          <aside className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
              <div className="flex justify-center items-center text-3xl font-semibold text-gray-900 ">
                <Image
                  src="/logo.png"
                  alt="logo du site"
                  height={50}
                  width={100}
                />
              </div>
              <p className="my-6 text-gray-500 dark:text-gray-400">
                <ContentTranslation title="footer.description" />
              </p>

              <ul className="flex flex-wrap justify-center items-center mb-6 font-bold text-gray-900 dark:text-white">
                <li>
                  <Link href="/" className="mr-4 hover:underline md:mr-6 ">
                    <ContentTranslation title="menu.home" />
                  </Link>
                </li>
                <li>
                  <Link href="/tours" className="mr-4 hover:underline md:mr-6">
                    <ContentTranslation title="menu.destination" />
                  </Link>
                </li>
                <li>
                  <Link
                    target={"_blank"}
                    href="tel:+221772370789"
                    className="mr-4 hover:underline md:mr-6"
                  >
                    <ContentTranslation title="menu.contact" />
                  </Link>
                </li>
              </ul>
              <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                {/* <Link href="#" className="mr-4 hover:underline md:mr-6 ">
                  <Facebook />
                </Link> */}
                <Link
                  target={"_blank"}
                  href="https://www.instagram.com/trip.senegal"
                  className="mr-4 hover:underline md:mr-6 "
                >
                  <Instagram />
                </Link>
                <Link
                  target={"_blank"}
                  href="tel:+221772370789"
                  className="mr-4 hover:underline md:mr-6 "
                >
                  <FaWhatsapp size={"28px"} />
                </Link>
              </ul>
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023-2024{" "}
                <Link href="#" className="hover:underline">
                  SenegalPremiumTour
                </Link>
                .<ContentTranslation title="footer.copyright" />.
              </span>
            </div>
          </aside>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
