"use client";
import React, { useState } from "react";
import { Star, Loader2, CheckCircle, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { submitReview } from "../../lib/actions";

interface ReviewFormProps {
  tourId: number;
  onSuccess?: () => void;
}

/* ─── Modal de confirmation ─── */
const ConfirmModal = ({
  name,
  rating,
  onConfirm,
  onCancel,
  loading,
}: {
  name: string;
  rating: number;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) => {
  const { t } = useTranslation("en");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Boîte */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 z-10">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-cyan-50 border-2 border-cyan-100 flex items-center justify-center mb-4">
            <Star size={26} className="fill-amber-400 text-amber-400" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-gray-800 mb-1">
            {t("review.confirmTitle")}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {t("review.confirmMessage", { name })}
          </p>

          {/* Étoiles recap */}
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={20}
                className={
                  s <= rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-100 text-gray-300"
                }
              />
            ))}
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              {t("review.confirmCancel")}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {t("review.confirmSend")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Formulaire principal ─── */
const ReviewForm = ({ tourId, onSuccess }: ReviewFormProps) => {
  const { t } = useTranslation("en");

  const [form, setForm] = useState({ name: "", message: "", rating: 0 });
  const [hovered, setHovered] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = t("review.errorName");
    if (form.rating === 0) errs.rating = t("review.errorRating");
    if (form.message.trim().length < 5) errs.message = t("review.errorMessage");
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* Clic sur "Envoyer" → ouvre le modal de confirmation */
  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirm(true);
  };

  /* Confirmation dans le modal → appel Supabase */
  const handleConfirm = async () => {
    setSubmitting(true);
    setServerError("");
    const res = await submitReview({
      tourId,
      name: form.name.trim(),
      rating: form.rating,
      message: form.message.trim(),
    });
    setSubmitting(false);
    setShowConfirm(false);

    if (res.success) {
      setSubmitted(true);
      onSuccess?.();
    } else {
      setServerError(t(res.error ?? "form.errorGeneric"));
    }
  };

  const handleReset = () => {
    setForm({ name: "", message: "", rating: 0 });
    setErrors({});
    setSubmitted(false);
    setServerError("");
  };

  /* ─── Écran succès ─── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-8 px-4">
        <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-200 mb-4">
          <CheckCircle size={30} className="text-white" strokeWidth={2.5} />
        </div>
        <h3 className="font-heading text-lg font-semibold text-gray-800 mb-1">
          {t("review.successTitle")}
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">{t("review.successMessage")}</p>
        <button
          onClick={handleReset}
          className="mt-5 text-xs text-cyan-600 hover:text-cyan-700 font-medium underline underline-offset-4 transition-colors"
        >
          {t("review.addAnother")}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Modal de confirmation */}
      {showConfirm && (
        <ConfirmModal
          name={form.name}
          rating={form.rating}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          loading={submitting}
        />
      )}

      <form onSubmit={handleSubmitClick} className="flex flex-col gap-4">
        {/* Erreur serveur */}
        {serverError && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {serverError}
          </p>
        )}

        {/* Nom */}
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">
            {t("common.name")} *
          </label>
          <input
            value={form.name}
            onChange={(e) => {
              setForm((p) => ({ ...p, name: e.target.value }));
              if (errors.name) setErrors((p) => ({ ...p, name: "" }));
            }}
            placeholder={t("review.namePlaceholder")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Note étoiles */}
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-2">
            {t("review.ratingLabel")} *
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => {
                  setForm((p) => ({ ...p, rating: star }));
                  if (errors.rating) setErrors((p) => ({ ...p, rating: "" }));
                }}
                className="transition-transform hover:scale-110 focus:outline-none"
                aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
              >
                <Star
                  size={26}
                  className={`transition-colors ${
                    star <= (hovered || form.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-100 text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">
            {t("common.message")} *
          </label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => {
              setForm((p) => ({ ...p, message: e.target.value }));
              if (errors.message) setErrors((p) => ({ ...p, message: "" }));
            }}
            placeholder={t("tour.reviewMessagePlaceholder")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-200 transition-colors resize-none"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          {t("common.send")}
        </button>
      </form>
    </>
  );
};

export default ReviewForm;
