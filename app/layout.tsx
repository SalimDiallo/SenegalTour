import "./globals.css";
import type { Metadata } from "next";
import Header from "./header";
import Providers from "./providers";
import Footer from "@/src/components/sections/footer/Footer";
import { Toaster } from "react-hot-toast";
import { Inter, Cormorant_Garamond } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senegal Premium Tour — Agence de Tourisme au Sénégal",
  description:
    "Découvrez le Sénégal avec Senegal Premium Tour, votre agence de tourisme premium. Excursions, circuits et expériences culturelles uniques à Dakar, Gorée, Saint-Louis et plus.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            gutter={10}
            toastOptions={{
              style: {
                borderRadius: "12px",
                background: "#1f2937",
                color: "#fff",
                fontSize: "13px",
                padding: "12px 16px",
              },
            }}
          />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
