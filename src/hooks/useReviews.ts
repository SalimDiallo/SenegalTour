"use client";
import { useState, useEffect, useCallback } from "react";

export type Review = {
  id: string;
  tour_id: number;
  name: string;
  rating: number;
  message: string;
  created_at: string;
};

const PAGE_SIZE = 5;

async function fetchReviewsApi(tourId: number, offset: number) {
  const res = await fetch(`/api/reviews?tourId=${tourId}&offset=${offset}`, {
    cache: "no-store",
  });
  if (!res.ok) return { success: false, reviews: [], total: 0 };
  return res.json() as Promise<{ success: boolean; reviews: Review[]; total: number }>;
}

export function useReviews(tourId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);

  // Charge la première page depuis zéro (utilisé aussi après un nouveau review)
  const fetchFirst = useCallback(async () => {
    setLoading(true);
    const res = await fetchReviewsApi(tourId, 0);
    if (res.success) {
      setReviews(res.reviews);
      setTotal(res.total);
      setOffset(PAGE_SIZE);
    }
    setLoading(false);
  }, [tourId]);

  // Charge la page suivante et l'ajoute à la liste existante
  const fetchMore = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const res = await fetchReviewsApi(tourId, offset);
    if (res.success) {
      setReviews((prev) => [...prev, ...res.reviews]);
      setOffset((prev) => prev + PAGE_SIZE);
    }
    setLoadingMore(false);
  }, [tourId, offset, loadingMore]);

  useEffect(() => {
    fetchFirst();
  }, [fetchFirst]);

  const hasMore = reviews.length < total;

  const averageRating =
    total === 0
      ? 0
      : reviews.length === 0
      ? 0
      : Math.round((reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) * 10) / 10;

  return {
    reviews,
    total,
    loading,
    loadingMore,
    hasMore,
    averageRating,
    refetch: fetchFirst,
    fetchMore,
  };
}
