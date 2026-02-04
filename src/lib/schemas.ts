import { z } from "zod";

// ─── Contact (message général) ───────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().optional(),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ─── Réservation (liée à un tour) ────────────────────────
export const reservationSchema = z.object({
  tourId: z.number(),
  tourTitle: z.string(),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(6, "Numéro de téléphone invalide"),
  numberOfPersons: z.number().min(1, "Au moins 1 personne").max(50),
  travelDate: z.string().min(1, "Choisissez une date"),
  message: z.string().optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
