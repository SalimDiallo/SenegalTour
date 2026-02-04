"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { submitReservation } from "../../lib/actions";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

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
      toast.success(t("form.successReservation"));
      setForm({ name: "", email: "", phone: "", numberOfPersons: 1, travelDate: "", message: "" });
      onSuccess?.();
    } else {
      toast.error(t(res.error || "form.errorGeneric"));
    }
  };

  // Date min = demain
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

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
