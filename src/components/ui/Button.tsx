"use client";
import React from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const Button = ({
  title,
  onclick,
  href,
  children,
}: PropsWithChildren<{
  title: string;
  onclick?: () => void;
  href?: string;
}>) => {
  const btnClass = "inline-flex items-center justify-center gap-2 rounded-md bg-cyan-500 hover:bg-cyan-600 px-5 py-2 text-sm font-medium text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2";

  return href ? (
    <Link href={href} className={btnClass}>
      {title}
      {children}
    </Link>
  ) : (
    <button type="button" onClick={() => onclick && onclick()} className={btnClass}>
      {title}
      {children}
    </button>
  );
};
