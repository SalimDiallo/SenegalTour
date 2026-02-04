"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "../../src/components/forms/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const ContactPage = () => {
  const { t } = useTranslation("en");

  return (
    <div className="min-h-[70vh]">
      {/* ─── HERO BANNER ─── */}
      <div className="relative bg-gray-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
          </div>
          <h1 className="font-heading text-white text-4xl md:text-5xl font-semibold">
            {t("contact.title")}
          </h1>
          <p className="text-gray-400 text-sm mt-3 max-w-xl leading-relaxed">
            {t("contact.description")}
          </p>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* LEFT — infos de contact */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-xl font-semibold text-gray-800 mb-6">
              {t("contact.info.title")}
            </h2>

            <div className="flex flex-col gap-5">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Téléphone</p>
                  <Link
                    href="tel:+221772370789"
                    className="text-sm text-gray-700 hover:text-cyan-600 transition-colors font-medium"
                  >
                    {t("contact.info.phone")}
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
                  <Link
                    href="mailto:senegalpremiumtour@gmail.com"
                    className="text-sm text-gray-700 hover:text-cyan-600 transition-colors font-medium"
                  >
                    {t("contact.info.email")}
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Adresse</p>
                  <p className="text-sm text-gray-700 font-medium">{t("contact.info.address")}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-3">Vous pouvez aussi nous contacter sur</p>
              <Link
                href="https://wa.me/+221772370789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <FaWhatsapp size={18} />
                WhatsApp
              </Link>
            </div>
          </div>

          {/* RIGHT — formulaire */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 max-w-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
