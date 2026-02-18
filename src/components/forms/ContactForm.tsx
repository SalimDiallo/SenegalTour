"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { submitContact } from "../../lib/actions";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle, Mail, Phone, Send } from "lucide-react";

const ContactForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { t } = useTranslation("en");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
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
      setSubmitted(true);
      onSuccess?.();
    } else {
      toast.error(t(res.error || "form.errorGeneric"));
    }
  };

  /* ─── SUCCESS SCREEN ─── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-10 px-4">
        {/* Animated checkmark */}
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full bg-cyan-50 animate-ping opacity-20" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-200/50">
            <CheckCircle size={32} className="text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">
          {t("form.successContactTitle")}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
          {t("form.successContactMessage")}
        </p>

        {/* Divider */}
        <div className="w-12 h-[2px] bg-cyan-200 rounded-full my-6" />

        {/* Quick contacts */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
              <Mail size={15} className="text-cyan-600" />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-gray-400 font-medium">Email</p>
              <p className="text-sm text-gray-700 font-medium">
                senegalpremiumtour@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center flex-shrink-0">
              <Phone size={15} className="text-cyan-600" />
            </div>
            <div className="text-left">
              <p className="text-[11px] text-gray-400 font-medium">Phone</p>
              <p className="text-sm text-gray-700 font-medium">
                +221 77 237 07 89
              </p>
            </div>
          </div>
        </div>

        {/* Back to form */}
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", phone: "", message: "" });
          }}
          className="mt-8 text-xs text-cyan-600 hover:text-cyan-700 font-medium underline underline-offset-4 transition-colors"
        >
          {t("form.successBackToForm")}
        </button>
      </div>
    );
  }

  /* ─── FORM ─── */
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label className="block text-[11px] text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">
          {t("form.name")} *
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t("form.namePlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all duration-300 hover:border-gray-300"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-[11px] text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">
          {t("form.email")} *
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("form.emailPlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all duration-300 hover:border-gray-300"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
        )}
      </div>

      {/* Phone (optional) */}
      <div>
        <label className="block text-[11px] text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">
          {t("form.phone")}
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t("form.phonePlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all duration-300 hover:border-gray-300"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-[11px] text-gray-500 font-semibold mb-1.5 uppercase tracking-wide">
          {t("form.message")} *
        </label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={t("form.messagePlaceholder")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all duration-300 resize-none hover:border-gray-300"
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md hover:shadow-cyan-500/20 mt-1"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? (
          t("form.sending")
        ) : (
          <>
            {t("form.send")}
            <Send size={14} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
