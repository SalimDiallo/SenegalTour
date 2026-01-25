import { User } from "@prisma/client";

export type ReviewWithUser = {
  id: string;
  name?: string;
  email: string;
  message: string;
  user: User | null;
  rating: number;
};

export type ReviewProps = {
  tourId: string;
  Reviews: ReviewWithUser[];
  userSessionEmail?: string;
};
