import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../src/lib/supabase";

const PAGE_SIZE = 5;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tourId = Number(searchParams.get("tourId"));
  const offset = Number(searchParams.get("offset") ?? "0");

  if (!tourId || isNaN(tourId)) {
    return NextResponse.json({ success: false, error: "tourId manquant" }, { status: 400 });
  }

  const [{ data, error }, { count, error: countError }] = await Promise.all([
    supabase
      .from("reviews")
      .select("id, tour_id, name, rating, message, created_at")
      .eq("tour_id", tourId)
      .order("rating", { ascending: false })
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),

    supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("tour_id", tourId),
  ]);

  if (error || countError) {
    console.error("[GET /api/reviews]", error ?? countError);
    return NextResponse.json({ success: false, reviews: [], total: 0 }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    reviews: data ?? [],
    total: count ?? 0,
    pageSize: PAGE_SIZE,
  });
}
