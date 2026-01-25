import "./globals.css";
import type { Metadata } from "next";
import Header from "./header";
import Providers from "./providers";
import Footer from "@/src/components/sections/footer/Footer";
import { Toaster } from "react-hot-toast";
import Annonce from "../src/components/sections/Annonce";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Senegal Premuim Tour- Agence de Tourisme Senegal Dakar Goree",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans ">
        <Providers>
          <Annonce />
          <Header />
          {children}
          <Footer />
          <Toaster position="top-center" gutter={10} />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
