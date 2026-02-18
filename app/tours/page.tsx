import Search from "../../src/components/sections/Search";
import { TourCardB } from "../../src/components/ui/TourCardB";
import { Metadata } from "next";
import ContentTranslation from "./[tourId]/ContentTranslation";
import { toursData } from "../../src/data/tours";

export const metadata: Metadata = {
  title: "Destinations — Senegal Premium Tour",
  description:
    "Découvrez toutes nos destinations touristiques au Sénégal. Excursions, circuits et expériences uniques à Dakar, Gorée, Saint-Louis et plus.",
};

const Tours = ({
  searchParams,
}: {
  searchParams: { title: string; description: string; city: string };
}) => {
  const tours = toursData;

  const maxPrice =
    searchParams.description === "" ? "2000000" : searchParams.description;

  const hasFilter =
    searchParams.title || searchParams.city || searchParams.description;

  const filtered = hasFilter
    ? tours.filter(
        (tour) =>
          tour.title
            .toLowerCase()
            .includes((searchParams.title ?? "").toLowerCase()) &&
          tour.city
            .toLowerCase()
            .includes((searchParams.city ?? "").toLowerCase()) &&
          Number(tour.price) <= Number(maxPrice)
      )
    : tours;

  // Search chips
  const chips = [
    searchParams.title && { label: searchParams.title },
    searchParams.city && { label: searchParams.city },
    searchParams.description && { label: `≤ €${searchParams.description}` },
  ].filter(Boolean) as { label: string }[];

  return (
    <div>
      <Search />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-[2px] bg-cyan-500 rounded-full" />
              <span className="text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
                Explorer
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800">
              <ContentTranslation title="tours.title" />
            </h1>

            {/* Search chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">
                  Résultats pour :
                </span>
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-block bg-cyan-50 text-cyan-700 text-[11px] font-medium px-3 py-1.5 rounded-full"
                  >
                    {chip.label}
                  </span>
                ))}
                <span className="text-[11px] text-gray-400 ml-1">
                  — {filtered.length} destination
                  {filtered.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>

          {/* Tours grid */}
          {filtered.length > 0 ? (
            <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 gap-5">
              {filtered.map((tour) => (
                <TourCardB key={tour.id} {...tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <span className="text-xl">🔍</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Aucune destination ne correspond à votre recherche.
              </p>
              <a
                href="/tours"
                className="inline-flex items-center gap-2 text-cyan-600 text-sm font-medium hover:underline underline-offset-4"
              >
                Voir toutes les destinations
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tours;
