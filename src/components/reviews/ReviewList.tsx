"use client";
import React from "react";
import { Star, MessageCircle, Loader2, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Review } from "../../hooks/useReviews";

interface ReviewListProps {
  reviews: Review[];
  total: number;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  averageRating: number;
  onLoadMore: () => void;
}

const StarRow = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        className={
          s <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-300"
        }
      />
    ))}
  </div>
);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const ReviewList = ({
  reviews,
  total,
  loading,
  loadingMore,
  hasMore,
  averageRating,
  onLoadMore,
}: ReviewListProps) => {
  const { t } = useTranslation("en");

  /* ─── Chargement initial ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-14 gap-2 text-gray-400">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">{t("review.loading")}</span>
      </div>
    );
  }

  /* ─── Aucun avis ─── */
  if (total === 0) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <MessageCircle size={22} className="text-gray-400" />
        </div>
        <p className="text-sm text-gray-400">{t("review.empty")}</p>
      </div>
    );
  }

  return (
    <div>
      {/* ─── Résumé note globale ─── */}
      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
        <span className="text-5xl font-bold text-gray-800 leading-none">{averageRating}</span>
        <div>
          <StarRow rating={Math.round(averageRating)} size={18} />
          <p className="text-xs text-gray-400 mt-1.5">
            {t("review.basedOn")}{" "}
            <span className="font-semibold text-gray-600">{total}</span>{" "}
            {t("review.totalReviews")}
          </p>
        </div>

        {/* Compteur affiché / total */}
        {total > reviews.length && (
          <div className="ml-auto text-right">
            <span className="text-xs text-gray-400">
              {t("review.showing")}{" "}
              <span className="font-semibold text-gray-600">{reviews.length}</span>{" "}
              {t("review.outOf")}{" "}
              <span className="font-semibold text-gray-600">{total}</span>
            </span>
          </div>
        )}
      </div>

      {/* ─── Liste des avis ─── */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                {/* Avatar initiale */}
                <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-cyan-700 uppercase">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {review.name}
                  </p>
                  <p className="text-[11px] text-gray-400">{formatDate(review.created_at)}</p>
                </div>
              </div>
              <StarRow rating={review.rating} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pl-11">{review.message}</p>
          </div>
        ))}
      </div>

      {/* ─── Bouton Voir plus ─── */}
      {hasMore && (
        <div className="flex flex-col items-center gap-2 mt-6">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-cyan-400 hover:text-cyan-600 text-gray-600 text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <ChevronDown size={15} />
            )}
            {loadingMore ? t("review.loadingMore") : t("review.seeMore")}
          </button>
          <p className="text-xs text-gray-400">
            {total - reviews.length} {t("review.remaining")}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
