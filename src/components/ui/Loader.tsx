"use client";
import React from "react";

const Loaders = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Elegant spinner */}
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-2 border-gray-100" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 animate-spin" />
      </div>
      <span className="text-xs text-gray-400 font-medium tracking-wide">
        Chargement…
      </span>
    </div>
  );
};

export default Loaders;
