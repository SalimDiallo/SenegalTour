import Image from "next/image";
import React from "react";
import { imgTourUrl } from "../../../src/config/siteConfig";
import { Metadata } from "next";
import ClientComponent from "../../../src/components/ClientComponent";
import { toursData } from "../../../src/data/tours";
import Step from "../../../src/components/sections/tours/tour/Step";
import { Clock, MapPin, DollarSign, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TourCardA } from "../../../src/components/ui/TourCardA";
import TourCircuit from "../../../src/components/sections/tours/tour/TourCircuit";
import ReservationCTA from "../../../src/components/tours/tour/ReservationCTA";
import ReviewSection from "../../../src/components/reviews/ReviewSection";

export async function generateMetadata({
  params,
}: {
  params: { tourId: string };
}): Promise<Metadata> {
  const tour = toursData[Number(params.tourId)];
  return {
    title: `${tour?.title} — Senegal Premium Tour`,
    description: tour?.description?.slice(0, 160),
    openGraph: {
      title: `${tour?.title} - Senegal Tourism Destination Travel Agency`,
      images: tour?.image ? [{ url: imgTourUrl(tour.image) }] : [],
    },
  };
}

const TourDetailPage = ({ params }: { params: { tourId: string } }) => {
  const tour = toursData[Number(params.tourId)];

  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <MapPin size={24} className="text-gray-400" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-gray-800 mb-2">
            Destination non trouvée
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Cette destination n&apos;existe pas ou a été supprimée.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={14} />
            Retour aux destinations
          </Link>
        </div>
      </div>
    );
  }

  // Gallery
  const gallery = [
    tour.image,
    tour.imageA,
    tour.imageB,
    tour.imageC,
    tour.imageD,
  ].filter(Boolean) as string[];

  // Related tours
  const related = toursData.filter((t) => t.id !== tour.id).slice(0, 3);

  return (
    <div>
      {/* ─── HERO IMAGE ─── */}
      <div className="relative w-full h-[48rem] max-sm:h-[32rem] overflow-hidden">
        <Image
          src={imgTourUrl(tour.image)}
          alt={tour.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Multi-layer gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-transparent" />

        {/* Back button */}
        <Link
          href="/tours"
          className="absolute top-24 left-4 md:left-8 z-10 inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-medium transition-colors bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={13} />
          Destinations
        </Link>

        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-cyan-500 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            <MapPin size={11} />
            {tour.city}
          </span>
          <h1 className="font-heading text-white text-4xl md:text-6xl font-semibold leading-tight max-w-3xl">
            <ClientComponent fr={tour.titlefr} en={tour.title} />
          </h1>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* LEFT — infos + CTA */}
          <div className="lg:col-span-2">
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-gray-100">
              <span className="text-[11px] text-gray-400 uppercase tracking-wide">
                À partir de
              </span>
              <span className="text-3xl font-bold text-cyan-600">€{tour.price}</span>
              <span className="text-sm text-gray-400">/ personne</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              <ClientComponent fr={tour.descriptionfr} en={tour.description} />
            </p>

            {/* Info steps */}
            <div className="mb-8 space-y-1">
              <Step
                title="tour.duration"
                content={`${tour.duration} hours`}
                icon={<Clock size={18} />}
              />
              <Step
                title="tour.price"
                content={`€${tour.price} / person`}
                icon={<DollarSign size={18} />}
              />
              <Step
                title="tour.destination"
                content={tour.address}
                icon={<MapPin size={18} />}
              />
              <Step
                title="tour.statut"
                content="Disponible"
                icon={<CheckCircle size={18} />}
              />
            </div>

            {/* CTA */}
            <ReservationCTA
              tourId={tour.id}
              tourTitle={tour.title}
              tourTitleFr={tour.titlefr}
            />
          </div>

          {/* RIGHT — gallery */}
          <div className="lg:col-span-3">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden mb-3">
              <Image
                src={imgTourUrl(gallery[1] ?? gallery[0])}
                alt={tour.title}
                width={800}
                height={500}
                className="w-full h-72 md:h-[22rem] object-cover hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-3">
              {gallery.slice(2, 5).map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={imgTourUrl(img)}
                    alt={`${tour.title} — photo ${i + 2}`}
                    width={300}
                    height={200}
                    className="w-full h-28 md:h-36 object-cover img-zoom"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── CIRCUIT / ITINÉRAIRE ─── */}
      {tour.stops && tour.stops.length > 0 && <TourCircuit stops={tour.stops} />}

      {/* ─── AVIS & COMMENTAIRES ─── */}
      <ReviewSection tourId={tour.id} />

      {/* ─── RELATED TOURS ─── */}
      <section className="bg-gray-50/80 py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-divider" />
            <span className="text-[11px] text-cyan-600 font-semibold tracking-[0.15em] uppercase">
              À découvrir
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-gray-800 mb-8">
            Autres destinations
          </h2>
          <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 gap-6">
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
