"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { submitReservation } from "../../lib/actions";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle, Mail, Phone, MapPin } from "lucide-react";

const ReservationForm = ({
  tourId,
  tourTitle,
  onSuccess,
}: {
  tourId: number;
  tourTitle: string;
  onSuccess?: () => void;
}) => {
  const { t } = useTranslation("en");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedDate, setSubmittedDate] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPersons: 1,
    travelDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "numberOfPersons" ? Number(value) : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.length < 2) errs.name = t("form.errorNameMin");
    if (!form.email.includes("@")) errs.email = t("form.errorEmail");
    if (form.phone.length < 6) errs.phone = t("form.errorPhone");
    if (form.numberOfPersons < 1) errs.numberOfPersons = t("form.errorPersons");
    if (!form.travelDate) errs.travelDate = t("form.errorDate");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const res = await submitReservation({ tourId, tourTitle, ...form });
    setLoading(false);

    if (res.success) {
      setSubmittedDate(form.travelDate);
      setSubmitted(true);
      onSuccess?.();
    } else {
      toast.error(t(res.error || "form.errorGeneric"));
    }
  };

  // Date min = demain
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  /* ─── SUCCESS SCREEN ─── */
  if (submitted) {
    // Format la date pour l'affichage
    const dateFormatted = submittedDate
      ? new Date(submittedDate + "T00:00:00").toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

    return (
      <div className="flex flex-col items-center text-center py-6 px-2">
        {/* Cercle avec checkmark */}
        <div className="relative w-24 h-24 mb-5">
          <div className="absolute inset-0 rounded-full bg-cyan-50 border-4 border-cyan-100"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-200">
              <CheckCircle size={32} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Titre */}
        <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">
          {t("form.successReservationTitle")}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
          {t("form.successReservationMessage")}
        </p>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-cyan-200 rounded-full my-5"></div>

        {/* Récapitulatif réservation */}
        <div className="flex flex-col gap-2.5 w-full max-w-xs">
          <div className="flex items-center gap-3 bg-cyan-50 border border-cyan-100 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
              <MapPin size={15} className="text-cyan-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-cyan-600 font-semibold">{t("form.reservationFor")}</p>
              <p className="text-sm text-gray-800 font-medium">{tourTitle}</p>
            </div>
          </div>

          {dateFormatted && (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400">Date</p>
                <p className="text-sm text-gray-700 font-medium capitalize">{dateFormatted}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
              <Mail size={15} className="text-cyan-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm text-gray-700 font-medium">senegalpremiumtour@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
              <Phone size={15} className="text-cyan-600" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">Phone</p>
              <p className="text-sm text-gray-700 font-medium">+221 77 237 07 89</p>
            </div>
          </div>
        </div>

        {/* Retour au formulaire */}
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", numberOfPersons: 1, travelDate: "", message: "" });
          }}
          className="mt-6 text-xs text-cyan-600 hover:text-cyan-700 font-medium underline underline-offset-4 transition-colors"
        >
          {t("form.successBackToForm")}
        </button>
      </div>
    );
  }

  /* ─── FORM ─── */
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Tour badge */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg px-3 py-2">
        <p className="text-xs text-cyan-700 font-semibold">{t("form.reservationFor")}</p>
        <p className="text-sm text-gray-800 font-medium mt-0.5">{tourTitle}</p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.name")} *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t("form.namePlaceholder")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.email")} *</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("form.emailPlaceholder")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.phone")} *</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t("form.phonePlaceholder")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Nombre de personnes + Date côte à côte */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.persons")} *</label>
          <input
            name="numberOfPersons"
            type="number"
            min={1}
            max={50}
            value={form.numberOfPersons}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors"
          />
          {errors.numberOfPersons && <p className="text-red-500 text-xs mt-1">{errors.numberOfPersons}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.date")} *</label>
          <input
            name="travelDate"
            type="date"
            min={minDate}
            value={form.travelDate}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors"
          />
          {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate}</p>}
        </div>
      </div>

      {/* Message (optional) */}
      <div>
        <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.message")}</label>
        <textarea
          name="message"
          rows={2}
          value={form.message}
          onChange={handleChange}
          placeholder={t("form.messagePlaceholder")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? t("form.sending") : t("form.reserve")}
      </button>
    </form>
  );
};

export default ReservationForm;
