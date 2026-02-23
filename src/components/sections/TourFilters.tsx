"use client";
import React, { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface TourFiltersProps {
  currentSort?: string;
  currentDuration?: string;
  searchParams: {
    title?: string;
    description?: string;
    city?: string;
    sort?: string;
    duration?: string;
  };
}

const TourFilters = ({ currentSort, currentDuration, searchParams }: TourFiltersProps) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDurationMenu, setShowDurationMenu] = useState(false);

  const sortOptions = [
    { value: "default", label: "Par défaut" },
    { value: "price-asc", label: "Prix croissant" },
    { value: "price-desc", label: "Prix décroissant" },
    { value: "duration-asc", label: "Durée croissante" },
    { value: "duration-desc", label: "Durée décroissante" },
    { value: "name-asc", label: "Nom A-Z" },
    { value: "name-desc", label: "Nom Z-A" },
  ];

  const durationOptions = [
    { value: "", label: "Toutes durées" },
    { value: "short", label: "Courte (≤4h)" },
    { value: "medium", label: "Moyenne (4-8h)" },
    { value: "long", label: "Longue (>8h)" },
  ];

  const buildUrl = (newParams: Record<string, string | undefined>) => {
    const params = { ...searchParams, ...newParams };
    // Remove undefined or empty values
    Object.keys(params).forEach(key => {
      if (!params[key as keyof typeof params]) {
        delete params[key as keyof typeof params];
      }
    });
    const queryString = new URLSearchParams(params as any).toString();
    return `/tours${queryString ? `?${queryString}` : ""}`;
  };

  const currentSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label || "Trier par";
  const currentDurationLabel = durationOptions.find(opt => opt.value === currentDuration)?.label || "Durée";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Sort dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowSortMenu(!showSortMenu);
            setShowDurationMenu(false);
          }}
          onBlur={() => setTimeout(() => setShowSortMenu(false), 200)}
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <SlidersHorizontal size={16} />
          {currentSortLabel}
          <ChevronDown size={16} className={`transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
        </button>

        {showSortMenu && (
          <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[200px] overflow-hidden">
            {sortOptions.map((option) => (
              <a
                key={option.value}
                href={buildUrl({ sort: option.value === "default" ? undefined : option.value })}
                className={`block px-4 py-2.5 text-sm transition-colors hover:bg-cyan-50 ${
                  currentSort === option.value || (!currentSort && option.value === "default")
                    ? "bg-cyan-50 text-cyan-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Duration filter dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setShowDurationMenu(!showDurationMenu);
            setShowSortMenu(false);
          }}
          onBlur={() => setTimeout(() => setShowDurationMenu(false), 200)}
          className={`inline-flex items-center gap-2 border text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm ${
            currentDuration
              ? "bg-cyan-600 hover:bg-cyan-700 border-cyan-600 text-white"
              : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {currentDurationLabel}
          <ChevronDown size={16} className={`transition-transform ${showDurationMenu ? "rotate-180" : ""}`} />
        </button>

        {showDurationMenu && (
          <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[180px] overflow-hidden">
            {durationOptions.map((option) => (
              <a
                key={option.value}
                href={buildUrl({ duration: option.value })}
                className={`block px-4 py-2.5 text-sm transition-colors hover:bg-cyan-50 ${
                  currentDuration === option.value || (!currentDuration && option.value === "")
                    ? "bg-cyan-50 text-cyan-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourFilters;
