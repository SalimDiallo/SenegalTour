"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReservationForm from "../../forms/ReservationForm";

interface ReservationCTAProps {
  tourId: number;
  tourTitle: string;
  tourTitleFr: string;
}

const ReservationCTA = ({
  tourId,
  tourTitle,
  tourTitleFr,
}: ReservationCTAProps) => {
  const { t, i18n } = useTranslation("en");
  const [open, setOpen] = useState(false);

  const displayTitle = i18n.language === "fr" ? tourTitleFr : tourTitle;

  return (
    <>
      {/* ─── CTA Buttons ─── */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-cyan-500/20 group"
        >
          <FaWhatsapp size={18} />
          {t("tour.reserveBtn")}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-cyan-300 hover:text-cyan-600 text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300"
        >
          {t("tour.contactBtn")}
        </Link>
      </div>

      {/* ─── Modal ─── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-3">
              <div>
                <h3 className="font-heading text-lg font-semibold text-gray-800">
                  {t("tour.reserveTitle")}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{displayTitle}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gray-100" />

            {/* Form */}
            <div className="px-6 py-5">
              <ReservationForm tourId={tourId} tourTitle={displayTitle} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationCTA;
