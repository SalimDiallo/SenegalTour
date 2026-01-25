import { z } from "zod";

export const tourScheme = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  image: z.string(),
});

export const userScheme = z.object({
  name: z.string(),
  email: z.string(),
});

export const BookVisitScheme = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const ContactVisitScheme = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});
