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
  console.log(searchParams);

  if (searchParams.description == "") {
    searchParams.description = "2000000";
  }
  return (
    <div>
      <Search />

      <section className="relative my-28 mx-3">
        <div className="max-w-5xl mx-auto my-4 h-84 bg-covers">
          <div className="">
            {/* desc section */}
            <div>
              <h1 className="font-semibold text-4xl mb-1">
                <ContentTranslation title="tours.title" />
              </h1>
              <h3 className="text-lg">
                {(searchParams.city != "" ||
                  searchParams.description != "" ||
                  searchParams.city != "") &&
                  "Resultat des recherches pour :"}
              </h3>

              <p className="text-md py-3"></p>
            </div>
            {/* content */}
            <div className="grid  max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-3  gap-4">
              {searchParams.city != null ||
              searchParams.description != null ||
              searchParams.title != null
                ? tours
                    .filter(
                      (tour) =>
                        tour.title
                          .toLowerCase()
                          .includes(`${searchParams.title.toLowerCase()}`) &&
                        tour.city
                          .toLowerCase()
                          .includes(`${searchParams.city.toLowerCase()}`) &&
                        Number(tour.price) <= Number(searchParams.description)
                    )
                    .map((tour) => <TourCardB key={tour.id} {...tour} />)
                : tours.map((tour) => <TourCardB key={tour.id} {...tour} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tours;
