import { MetadataRoute } from "next";
import { toursData } from "../src/data/tours";
// app/sitemap.js

// L'URL de votre site
const URL = "https://www.senegalpremiumtours.com";

// Vos routes statiques
const SITE_ROUTES = ["", "/tours"];

// Vos routes dynamiques
// Ici, on utilisera plus souvent le résultat d'un call API
// ou bien une fonction qui va récupérer les chemins de vos pages
const tours = toursData;

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = tours.map((tour) => ({
    url: `${URL}/tours/${tour.id}`,
    lastModified: new Date(),
  }));

  const routes = SITE_ROUTES.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...urls];
}
