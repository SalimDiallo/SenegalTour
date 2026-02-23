import Image from "next/image";
import React from "react";
import { imgTourUrl } from "../../../src/config/siteConfig";
import { Metadata } from "next";
import ClientComponent from "../../../src/components/ClientComponent";
import { toursData } from "../../../src/data/tours";
import { Clock, MapPin, DollarSign, CheckCircle, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { TourCardA } from "../../../src/components/ui/TourCardA";
import TourCircuit from "../../../src/components/sections/tours/tour/TourCircuit";
import ReservationCTA from "../../../src/components/tours/tour/ReservationCTA";
import ReviewSection from "../../../src/components/reviews/ReviewSection";
import ImageGallery from "../../../src/components/ui/ImageGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tourId: string }>;
}): Promise<Metadata> {
  const { tourId } = await params;
  const tour = toursData.find((t) => String(t.id) === tourId);

  return {
    title: `${tour?.title} — Senegal Premium Tour`,
    description: tour?.description?.slice(0, 160),
    openGraph: {
      title: `${tour?.title} - Senegal Tourism Destination Travel Agency`,
      images: tour?.image ? [{ url: imgTourUrl(tour.image) }] : [],
    },
  };
}

const TourDetailPage = async ({ params }: { params: Promise<{ tourId: string }> }) => {
  const { tourId } = await params;
  const tour = toursData.find((t) => String(t.id) === tourId);


  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <MapPin size={24} className="text-gray-400" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-gray-800 mb-2">
            Destination not found
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
  const gallery = [tour.image, ...tour.images];

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
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-gray-900/40 to-gray-900/30" /> 
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-transparent" />

        {/* Back button */}
        <Link
          href="/tours"
          className="absolute top-24 left-4 md:left-8 z-10 inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-medium transition-all duration-300 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft size={13} />
          Destinations
        </Link>

        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-cyan-500 text-white text-[11px] font-semibold px-4 py-2 rounded-full tracking-wide uppercase shadow-lg">
              <MapPin size={12} />
              {tour.city}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white text-[11px] font-medium px-4 py-2 rounded-full border border-white/20">
              <Clock size={12} />
              {tour.duration}h
            </span>
            {/* <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-white text-[11px] font-medium px-4 py-2 rounded-full border border-white/20">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              4.9
            </span> */}
          </div>
          <h1 className="font-heading text-white text-4xl md:text-6xl font-bold leading-tight max-w-4xl drop-shadow-2xl">
            <ClientComponent fr={tour.titlefr} en={tour.title} />
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
            <ClientComponent fr={tour.descriptionfr.slice(0, 150) + "..."} en={tour.description.slice(0, 150) + "..."} />
          </p>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT — infos + CTA */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={20} className="text-cyan-600" />
                <span className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                  À partir de
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-bold text-cyan-600">€{tour.price}</span>
                <span className="text-sm text-gray-500">/ personne</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Prix par personne, groupe minimum 2 personnes</p>
            </div>

            {/* Quick Info Cards */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-heading text-lg font-semibold text-gray-800 mb-4">Informations essentielles</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Durée</p>
                    <p className="text-sm text-gray-800 font-semibold">{tour.duration} heures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Lieu de départ</p>
                    <p className="text-sm text-gray-800 font-semibold">{tour.city}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Users size={18} className="text-primary " />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Type de groupe</p>
                    <p className="text-sm text-gray-800 font-semibold">Privé ou partagé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Disponibilité</p>
                    <p className="text-sm text-emerald-600 font-semibold">Disponible maintenant</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <ReservationCTA
              tourId={tour.id}
              tourTitle={tour.title}
              tourTitleFr={tour.titlefr}
            />

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-heading text-sm font-semibold text-gray-800 mb-3">Ce qui est inclus</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-cyan-500 flex-shrink-0" />
                  Guide touristique professionnel
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-cyan-500 flex-shrink-0" />
                  Transport climatisé
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-cyan-500 flex-shrink-0" />
                  Prise en charge à l'hôtel
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-cyan-500 flex-shrink-0" />
                  Tous les frais d'entrée
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT — description + gallery */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <h2 className="font-heading text-2xl font-bold text-gray-800">Description</h2>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                <ClientComponent fr={tour.descriptionfr} en={tour.description} />
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-heading text-lg font-semibold text-gray-800 mb-3">Destinations visitées</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <ClientComponent fr={tour.addressfr} en={tour.address} />
                </p>
              </div>
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                  <h2 className="font-heading text-2xl font-bold text-gray-800">Galerie photos</h2>
                  <span className="text-sm text-gray-500">({gallery.length} photos)</span>
                </div>
                <ImageGallery images={gallery} title={tour.title} />
              </div>
            )}
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
