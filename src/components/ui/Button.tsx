"use client";
import React from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { ArrowRight } from "lucide-react";

export const Button = ({
  title,
  onclick,
  href,
  children,
  variant = "primary",
}: PropsWithChildren<{
  title: string;
  onclick?: () => void;
  href?: string;
  variant?: "primary" | "outline";
}>) => {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 group";

  const variants = {
    primary:
      "bg-cyan-500 hover:bg-cyan-600 px-6 py-2.5 text-white shadow-sm hover:shadow-md hover:shadow-cyan-500/20",
    outline:
      "border border-gray-200 hover:border-cyan-500 px-6 py-2.5 text-gray-700 hover:text-cyan-600",
  };

  const className = `${baseClass} ${variants[variant]}`;

  const content = (
    <>
      {title}
      {children}
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => onclick && onclick()}
      className={className}
    >
      {content}
    </button>
  );
};
