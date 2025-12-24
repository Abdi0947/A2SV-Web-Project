import { NextResponse } from "next/server";
import { fetchOpportunities } from "@/lib/api";

export async function GET() {
  try {
    const opportunities = await fetchOpportunities();
    return NextResponse.json(opportunities);
  } catch (error: any) {
    console.error("Error fetching opportunities:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}

