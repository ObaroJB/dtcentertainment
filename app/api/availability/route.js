import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

const CAPACITY = {
  "Early Bird": 100, // adjust to your real capacity
};

export async function GET() {
  try {
    const tiers = {};

    for (const tierName of Object.keys(CAPACITY)) {
      const snapshot = await db
        .collection("orders")
        .where("tier", "==", tierName)
        .where("status", "==", "paid")
        .get();

      tiers[tierName] = {
        capacity: CAPACITY[tierName],
        sold: snapshot.size,
      };
    }

    return NextResponse.json({ tiers });
  } catch (err) {
    console.error("availability error:", err);
    return NextResponse.json({ tiers: {} }, { status: 500 });
  }
}