"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "../../src/components/forms/ContactForm";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const ContactPage = () => {
  const { t } = useTranslation("en");

  return (
    <div className="min-h-[70vh]">
      {/* ─── HERO BANNER ─── */}
      <div className="relative bg-gray-900 pt-32 pb-20 px-4 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, #06b6d4 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="text-[11px] text-cyan-400 font-semibold tracking-[0.15em] uppercase">
              Contact
            </span>
          </div>
          <h1 className="font-heading text-white text-4xl md:text-5xl font-semibold leading-tight">
            {t("contact.title")}
          </h1>
          <p className="text-gray-400 text-sm mt-4 max-w-xl leading-relaxed">
            {t("contact.description")}
          </p>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-5 gap-14">
          {/* LEFT — contact info */}
          <div className="lg:col-span-2">
            <h2 className="font-heading text-xl font-semibold text-gray-800 mb-8">
              {t("contact.info.title")}
            </h2>

            <div className="flex flex-col gap-6">
              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-colors duration-300">
                  <Phone size={18} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    Téléphone
                  </p>
                  <Link
                    href="tel:+221772370789"
                    className="text-sm text-gray-700 hover:text-cyan-600 transition-colors font-medium"
                  >
                    {t("contact.info.phone")}
                  </Link>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-colors duration-300">
                  <Mail size={18} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    Email
                  </p>
                  <Link
                    href="mailto:senegalpremiumtour@gmail.com"
                    className="text-sm text-gray-700 hover:text-cyan-600 transition-colors font-medium"
                  >
                    {t("contact.info.email")}
                  </Link>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-colors duration-300">
                  <MapPin size={18} className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    Adresse
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    {t("contact.info.address")}
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 mb-4 uppercase tracking-wide font-medium">
                Contactez-nous directement
              </p>
              <Link
                href="https://wa.me/+221772370789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-green-500/20 group"
              >
                <FaWhatsapp size={18} />
                WhatsApp
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 md:p-10">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-1">
                Envoyez-nous un message
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
