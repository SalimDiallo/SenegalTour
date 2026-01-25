"use client";
import { Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Annonce = () => {
  return (
    <div className="bg-black">
      <div className="max-w-6xl mx-auto flex items-center  justify-between   text-white">
        {/* lefft */}
        <div className="sm:flex justify-evenly  items-center max-sm:mx-auto ml-4 text-sm gap-4 text-center">
          <div className="flex items-center gap-1 pl-2">
            <Phone size={14} className="w-7 ml-3" />
            <a target={"_blank"} href="tel:+221772370789<">
              +221 77 237 07 89
            </a>
          </div>
          <div className="flex items-center gap-1 mx-auto">
            <Mail size={14} className="w-7" />
            <a target={"_blank"} href="mailto:senegalpremiumtour@gmail.com">
              senegalpremiumtour@gmail.com
            </a>
          </div>
        </div>
        {/* rigth */}
        <div className="flex items-center w-fit max-sm:mx-auto bg-black h-full py-3 px-3 bg-opacity-20">
          {/* <div className="px-3">
            <Facebook size={14} className="w-7" />
          </div> */}
          <Link
            target={"_blank"}
            href="https://www.instagram.com/trip.senegal"
            className="px-3"
          >
            <Instagram size={14} className="w-7" />
          </Link>
          <Link target={"_blank"} href="tel:+221772370789" className="px-3">
            <FaWhatsapp size={14} className="w-7" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Annonce;
