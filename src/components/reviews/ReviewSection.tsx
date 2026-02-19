"use client";
import React, { useState } from "react";
import { MessageCircle, PenLine, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReviews } from "../../hooks/useReviews";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface ReviewSectionProps {
  tourId: number;
}

const ReviewSection = ({ tourId }: ReviewSectionProps) => {
  const { t } = useTranslation("en");
  const { reviews, total, loading, loadingMore, hasMore, averageRating, refetch, fetchMore } = useReviews(tourId);
  const [showForm, setShowForm] = useState(false);

  /* Après soumission réussie : recharge les avis et ferme le formulaire */
  const handleSuccess = () => {
    refetch();
    setShowForm(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-14 md:py-16">
      {/* En-tête section */}
      <div className="flex items-center gap-3 mb-4">
        <div className="section-divider" />
        <span className="text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
          {t("common.reviews")}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800">
          {t("review.sectionTitle")}
        </h2>

        {/* Bouton toggle formulaire */}
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md self-start sm:self-auto"
        >
          {showForm ? (
            <>
              <ChevronUp size={16} />
              {t("review.hideForm")}
            </>
          ) : (
            <>
              <PenLine size={16} />
              {t("common.comment")}
            </>
          )}
        </button>
      </div>

      {/* Grille : formulaire + liste */}
      <div className="grid lg:grid-cols-5 gap-10">
        {/* Formulaire (colonne gauche) */}
        {showForm && (
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                  <MessageCircle size={16} className="text-cyan-600" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-800">
                  {t("review.formTitle")}
                </h3>
              </div>
              <ReviewForm tourId={tourId} onSuccess={handleSuccess} />
            </div>
          </div>
        )}

        {/* Liste des avis */}
        <div className={showForm ? "lg:col-span-3" : "lg:col-span-5"}>
          <ReviewList
            reviews={reviews}
            total={total}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            averageRating={averageRating}
            onLoadMore={fetchMore}
          />
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
