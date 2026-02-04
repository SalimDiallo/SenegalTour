"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import Link from "next/link";
import ReservationForm from "../../forms/ReservationForm";

interface ReservationCTAProps {
  tourId: number;
  tourTitle: string;
  tourTitleFr: string;
}

const ReservationCTA = ({ tourId, tourTitle, tourTitleFr }: ReservationCTAProps) => {
  const { t, i18n } = useTranslation("en");
  const [open, setOpen] = useState(false);

  const displayTitle = i18n.language === "fr" ? tourTitleFr : tourTitle;

  return (
    <>
      {/* ─── Boutons CTA ─── */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <FaWhatsapp size={18} />
          {t("tour.reserveBtn")}
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-cyan-300 hover:text-cyan-600 text-sm font-medium px-6 py-3 rounded-lg transition-colors"
        >
          {t("tour.contactBtn")}
        </Link>
      </div>

      {/* ─── Modal Réservation ─── */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header modal */}
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <h3 className="font-heading text-lg font-semibold text-gray-800">
                {t("tour.reserveTitle")}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gray-100" />

            {/* Form */}
            <div className="px-6 py-5">
              <ReservationForm
                tourId={tourId}
                tourTitle={displayTitle}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationCTA;
