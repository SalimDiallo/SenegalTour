"use server";

import { supabase } from "./supabase";
import { contactSchema, reservationSchema, reviewSchema, ContactInput, ReservationInput, ReviewInput } from "./schemas";
import { sendContactEmail, sendReservationEmail } from "./email";

// ─── Contact ──────────────────────────────────────────────
export async function submitContact(data: ContactInput) {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "form.errorGeneric" };
  }

  const { error } = await supabase.from("contacts").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    message: parsed.data.message,
  });

  if (error) {
    console.error("[submitContact] Supabase error:", JSON.stringify(error));
    return { success: false, error: "form.errorGeneric" };
  }

  // Email de notification à l'admin
  await sendContactEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    message: parsed.data.message,
  });

  return { success: true, error: null };
}

// ─── Reservation ──────────────────────────────────────────
export async function submitReservation(data: ReservationInput) {
  const parsed = reservationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "form.errorGeneric" };
  }

  const { error } = await supabase.from("reservations").insert({
    tour_id: parsed.data.tourId,
    tour_title: parsed.data.tourTitle,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    number_of_persons: parsed.data.numberOfPersons,
    travel_date: parsed.data.travelDate,
    message: parsed.data.message || null,
  });

  if (error) {
    console.error("[submitReservation] Supabase error:", JSON.stringify(error));
    return { success: false, error: "form.errorGeneric" };
  }

  // Email de notification à l'admin
  await sendReservationEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    tourTitle: parsed.data.tourTitle,
    tourId: parsed.data.tourId,
    numberOfPersons: parsed.data.numberOfPersons,
    travelDate: parsed.data.travelDate,
    message: parsed.data.message || null,
  });

  return { success: true, error: null };
}

// ─── Review ───────────────────────────────────────────────
export async function submitReview(data: ReviewInput) {
  const parsed = reviewSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "form.errorGeneric" };
  }

  const { error } = await supabase.from("reviews").insert({
    tour_id: parsed.data.tourId,
    name: parsed.data.name,
    rating: parsed.data.rating,
    message: parsed.data.message,
  });

  if (error) {
    console.error("[submitReview] Supabase error:", JSON.stringify(error));
    return { success: false, error: "form.errorGeneric" };
  }

  return { success: true, error: null };
}

