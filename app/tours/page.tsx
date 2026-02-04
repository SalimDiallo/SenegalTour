import Search from "../../src/components/sections/Search";
import { TourCardB } from "../../src/components/ui/TourCardB";
import { Metadata } from "next";
import ContentTranslation from "./[tourId]/ContentTranslation";
import { toursData } from "../../src/data/tours";

export const metadata: Metadata = {
  title:
    "All Destinations tourist for - Toutes les destinations touristiques Senegal ",
};

const Tours = ({
  searchParams,
}: {
  searchParams: { title: string; description: string; city: string };
}) => {
  const tours = toursData;

  const maxPrice = searchParams.description === "" ? "2000000" : searchParams.description;

  const hasFilter = searchParams.title || searchParams.city || searchParams.description;

  const filtered = hasFilter
    ? tours.filter(
        (tour) =>
          tour.title.toLowerCase().includes((searchParams.title ?? "").toLowerCase()) &&
          tour.city.toLowerCase().includes((searchParams.city ?? "").toLowerCase()) &&
          Number(tour.price) <= Number(maxPrice)
      )
    : tours;

  // Termes de recherche pour l'affichage
  const chips = [
    searchParams.title && { label: searchParams.title },
    searchParams.city && { label: searchParams.city },
    searchParams.description && { label: `≤ €${searchParams.description}` },
  ].filter(Boolean) as { label: string }[];

  return (
    <div>
      <Search />

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              <ContentTranslation title="tours.title" />
            </h1>

            {/* Chips de recherche */}
            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs text-gray-400">Résultats pour :</span>
                {chips.map((chip, i) => (
                  <span key={i} className="inline-block bg-cyan-50 text-cyan-700 text-xs font-medium px-2.5 py-1 rounded-full">
                    {chip.label}
                  </span>
                ))}
                <span className="text-xs text-gray-400 ml-1">— {filtered.length} destination{filtered.length !== 1 ? "s" : ""}</span>
              </div>
            )}
          </div>

          {/* Grille de tours */}
          {filtered.length > 0 ? (
            <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3 gap-5">
              {filtered.map((tour) => (
                <TourCardB key={tour.id} {...tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm">Aucune destination ne correspond à votre recherche.</p>
              <a href="/tours" className="inline-block mt-4 text-cyan-600 text-sm font-medium hover:underline">Voir toutes les destinations</a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tours;
