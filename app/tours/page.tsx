"use client";
import React, { useState, useMemo } from "react";
import Search from "../../src/components/sections/Search";
import ContentTranslation from "./[tourId]/ContentTranslation";
import { toursData } from "../../src/data/tours";
import { TourCardA } from "@/src/components/ui/TourCardA";
import TourFiltersClient from "../../src/components/sections/TourFiltersClient";

const Tours = () => {
  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [cityFilter, setCityFilter] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [durationFilter, setDurationFilter] = useState("");

  const tours = toursData;

  // Enhanced search and filter logic
  const filteredAndSorted = useMemo(() => {
    let result = tours;

    // Apply filters
    const hasFilter = searchTerm || cityFilter || maxPrice < 10000 || durationFilter;

    if (hasFilter) {
      result = tours.filter((tour) => {
        const searchLower = searchTerm.toLowerCase();
        const cityLower = cityFilter.toLowerCase();

        // Search in title (EN & FR), description (EN & FR), address (EN & FR), and city
        const matchesSearch = !searchTerm ||
          tour.title.toLowerCase().includes(searchLower) ||
          tour.titlefr.toLowerCase().includes(searchLower) ||
          tour.description.toLowerCase().includes(searchLower) ||
          tour.descriptionfr.toLowerCase().includes(searchLower) ||
          tour.address.toLowerCase().includes(searchLower) ||
          tour.addressfr.toLowerCase().includes(searchLower);

        const matchesCity = !cityFilter ||
          tour.city.toLowerCase().includes(cityLower);

        const matchesPrice = Number(tour.price) <= maxPrice;

        const matchesDuration = !durationFilter ||
          (durationFilter === "short" && Number(tour.duration) <= 4) ||
          (durationFilter === "medium" && Number(tour.duration) > 4 && Number(tour.duration) <= 8) ||
          (durationFilter === "long" && Number(tour.duration) > 8);

        return matchesSearch && matchesCity && matchesPrice && matchesDuration;
      });
    }

    // Apply sorting
    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return Number(a.price) - Number(b.price);
        case "price-desc":
          return Number(b.price) - Number(a.price);
        case "duration-asc":
          return Number(a.duration) - Number(b.duration);
        case "duration-desc":
          return Number(b.duration) - Number(a.duration);
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [tours, searchTerm, maxPrice, cityFilter, sortBy, durationFilter]);

  // Active filters chips
  const activeFilters = [
    searchTerm && { label: searchTerm, key: "search" },
    cityFilter && { label: cityFilter, key: "city" },
    maxPrice < 10000 && { label: `Prix ≤ €${maxPrice}`, key: "price" },
    durationFilter && {
      label:
        durationFilter === "short"
          ? "Courte durée (≤4h)"
          : durationFilter === "medium"
          ? "Durée moyenne (4-8h)"
          : "Longue durée (>8h)",
      key: "duration",
    },
  ].filter(Boolean) as { label: string; key: string }[];

  const removeFilter = (key: string) => {
    switch (key) {
      case "search":
        setSearchTerm("");
        break;
      case "city":
        setCityFilter("");
        break;
      case "price":
        setMaxPrice(10000);
        break;
      case "duration":
        setDurationFilter("");
        break;
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCityFilter("");
    setMaxPrice(10000);
    setDurationFilter("");
    setSortBy("default");
  };

  return (
    <div>
      <Search
        onSearch={(term: string, price: number, city: string) => {
          setSearchTerm(term);
          setMaxPrice(price);
          setCityFilter(city);
        }}
      />

      <section className="py-16 md:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header with filters */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-[2px] bg-cyan-500 rounded-full" />
                  <span className="text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
                    Explorer
                  </span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800">
                  <ContentTranslation title="tours.title" />
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  {filteredAndSorted.length} destination
                  {filteredAndSorted.length !== 1 ? "s" : ""} disponible
                  {filteredAndSorted.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Sort and filters */}
              <TourFiltersClient
                currentSort={sortBy}
                currentDuration={durationFilter}
                onSortChange={setSortBy}
                onDurationChange={setDurationFilter}
              />
            </div>

            {/* Active filters chips */}
            {activeFilters.length > 0 && (
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                    Filtres actifs :
                  </span>
                  {activeFilters.map((filter, i) => (
                    <button
                      key={i}
                      onClick={() => removeFilter(filter.key)}
                      className="inline-flex items-center gap-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 text-xs font-medium px-3 py-1.5 rounded-full transition-colors group"
                    >
                      {filter.label}
                      <svg
                        className="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium hover:underline underline-offset-2 transition-colors"
                  >
                    Tout effacer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tours grid */}
          {filteredAndSorted.length > 0 ? (
            <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 gap-6">
              {filteredAndSorted.map((tour) => (
                <TourCardA key={tour.id} {...tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">
                Aucune destination trouvée
              </h3>
              <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                Aucune destination ne correspond aux critères de recherche. Essayez de
                modifier vos filtres ou explorez toutes nos destinations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Voir toutes les destinations
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tours;
