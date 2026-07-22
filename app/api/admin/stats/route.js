import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

// Very simple shared-secret gate. Fine for a one-event internal dashboard;
// swap for real auth (Firebase Auth + custom claims) if this grows.
function isAuthorized(request) {
  const key = request.headers.get("x-admin-key");
  return key && key === process.env.ADMIN_DASHBOARD_KEY;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const ordersSnap = await db.collection("orders").get();
    const ticketsSnap = await db.collection("tickets").get();

    const orders = ordersSnap.docs.map((d) => d.data());
    const tickets = ticketsSnap.docs.map((d) => d.data());

    const paidOrders = orders.filter((o) => o.paymentStatus === "Paid");
    const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalCheckedIn = tickets.filter((t) => t.checkedIn).length;

    return NextResponse.json({
      totalTicketsSold: tickets.length,
      totalRevenue,
      totalCheckedIn,
      totalOrders: orders.length,
      orders: orders.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")),
      tickets,
    });
  } catch (err) {
    console.error("admin stats error:", err);
    return NextResponse.json({ error: "Could not load stats." }, { status: 500 });
  }
}
