import Image from "next/image";
import React from "react";
import { imgTourUrl } from "../../../src/config/siteConfig";
import { Metadata } from "next";
import ClientComponent from "../../../src/components/ClientComponent";
import { toursData } from "../../../src/data/tours";
import Step from "../../../src/components/sections/tours/tour/Step";
import { Clock, MapPin, DollarSign, CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { TourCardA } from "../../../src/components/ui/TourCardA";

export async function generateMetadata({
  params,
}: {
  params: { tourId: string };
}): Promise<Metadata> {
  const tour = toursData[Number(params.tourId)];
  return {
    title: `${tour?.title} — Senegal Premium Tour`,
    openGraph: {
      title: `${tour?.title} - Senegal Tourism Destination Travel Agency`,
    },
  };
}

const TourDetailPage = ({ params }: { params: { tourId: string } }) => {
  const tour = toursData[Number(params.tourId)];

  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Destination non trouvée</h1>
        <p className="text-gray-500 text-sm mb-6">Cette destination n'existe pas ou a été supprimée.</p>
        <Link href="/tours" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors">
          Retour aux destinations
        </Link>
      </div>
    );
  }

  // Galerie : on prend toutes les images disponibles
  const gallery = [tour.image, tour.imageA, tour.imageB, tour.imageC, tour.imageD].filter(Boolean) as string[];

  // Tours similaires (mêmes pays, excluons le tour actuel, max 3)
  const related = toursData.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <div>
      {/* ─── HERO IMAGE ─── */}
      <div className="relative w-full h-[42rem] max-sm:h-[28rem] overflow-hidden">
        <Image
          src={imgTourUrl(tour.image)}
          alt={tour.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient bas vers le haut */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        {/* Texte superposé en bas du hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 max-w-6xl mx-auto">
          <span className="inline-block bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
            {tour.city}
          </span>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-2xl">
            <ClientComponent fr={tour.titlefr} en={tour.title} />
          </h1>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-10">

          {/* LEFT — texte + infos + CTA */}
          <div className="lg:col-span-2">
            {/* Prix badge */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-cyan-600">€{tour.price}</span>
              <span className="text-sm text-gray-400">/ person</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              <ClientComponent fr={tour.descriptionfr} en={tour.description} />
            </p>

            {/* Steps / infos */}
            <div className="mb-6">
              <Step title="tour.duration" content={`${tour.duration} hours`} icon={<Clock size={18} />} />
              <Step title="tour.price" content={`€${tour.price} / person`} icon={<DollarSign size={18} />} />
              <Step title="tour.destination" content={tour.address} icon={<MapPin size={18} />} />
              <Step title="tour.statut" content="Disponible" icon={<CheckCircle size={18} />} />
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <Link
                href="tel:+221772370789"
                className="inline-flex items-center justify-center gap-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <FaWhatsapp size={18} />
                Réserver ce tour
              </Link>
              <Link
                href="tel:+221772370789"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:border-cyan-300 hover:text-cyan-600 text-sm font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Contacter l'agence
              </Link>
            </div>
          </div>

          {/* RIGHT — galerie d'images */}
          <div className="lg:col-span-3">
            {/* Image principale */}
            <div className="rounded-2xl overflow-hidden mb-3">
              <Image
                src={imgTourUrl(gallery[1] ?? gallery[0])}
                alt={tour.title}
                width={800}
                height={500}
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
            {/* Grille miniatures */}
            <div className="grid grid-cols-3 gap-3">
              {gallery.slice(2, 5).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <Image
                    src={imgTourUrl(img)}
                    alt={`${tour.title} — photo ${i + 2}`}
                    width={300}
                    height={200}
                    className="w-full h-28 md:h-36 object-cover hover:scale-105 transition-transform duration-400"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── RELATED TOURS ─── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-cyan-500 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Autres destinations</h2>
          <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 gap-5">
            {related.map((t) => (
              <TourCardA key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourDetailPage;
