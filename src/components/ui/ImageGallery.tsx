"use client";
import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { imgTourUrl } from "../../config/siteConfig";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => openLightbox(i)}
            className={`relative rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 ${
              i === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""
            }`}
          >
            <Image
              src={imgTourUrl(img)}
              alt={`${title} — photo ${i + 1}`}
              width={i === 0 ? 900 : 400}
              height={i === 0 ? 600 : 300}
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                i === 0 ? "h-full min-h-[400px]" : "h-48"
              }`}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-sm font-semibold">Photo {i + 1} / {images.length}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[10001] bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:rotate-90"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 z-[10001] bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Image précédente"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 z-[10001] bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Image suivante"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={imgTourUrl(images[selectedIndex])}
                alt={`${title} — photo ${selectedIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>

            {/* Image counter and title */}
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                <span className="text-white font-medium text-sm">
                  {selectedIndex + 1} / {images.length}
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnails navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[10001] max-w-4xl overflow-x-auto">
            <div className="flex gap-2 px-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                  className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    i === selectedIndex
                      ? "ring-4 ring-cyan-500 scale-110"
                      : "ring-2 ring-white/30 hover:ring-white/60 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={imgTourUrl(img)}
                    alt={`Thumbnail ${i + 1}`}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard hints */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[10001]">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/20 rounded text-[10px]">←</kbd>
                <kbd className="px-2 py-1 bg-white/20 rounded text-[10px]">→</kbd>
                Navigation
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/20 rounded text-[10px]">ESC</kbd>
                Fermer
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
