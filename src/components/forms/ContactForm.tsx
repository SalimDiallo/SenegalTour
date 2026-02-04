"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { submitContact } from "../../lib/actions";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

const ContactForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { t } = useTranslation("en");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(errors);
    
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.length < 2) errs.name = t("form.errorNameMin");
    if (!form.email.includes("@")) errs.email = t("form.errorEmail");
    if (form.message.length < 10) errs.message = t("form.errorMessageMin");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const res = await submitContact(form);
    setLoading(false);

    if (res.success) {
      toast.success(t("form.successContact"));
      setForm({ name: "", email: "", phone: "", message: "" });
      onSuccess?.();
    } else {
      toast.error(t(res.error || "form.errorGeneric"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

      {/* Phone (optional) */}
      <div>
        <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.phone")}</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t("form.phonePlaceholder")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs text-gray-500 font-medium mb-1">{t("form.message")} *</label>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder={t("form.messagePlaceholder")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors resize-none"
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? t("form.sending") : t("form.send")}
      </button>
    </form>
  );
};

export default ContactForm;
