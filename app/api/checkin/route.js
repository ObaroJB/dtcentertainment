import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

// Called by the scanner page with the raw QR token that was scanned.
export async function POST(request) {
  try {
    const { qrToken } = await request.json();

    if (!qrToken) {
      return NextResponse.json({ error: "Missing QR token." }, { status: 400 });
    }

    const snap = await db.collection("tickets").where("qrToken", "==", qrToken).limit(1).get();

    if (snap.empty) {
      return NextResponse.json({ valid: false, reason: "Ticket not found." }, { status: 404 });
    }

    const ticketDoc = snap.docs[0];
    const ticket = ticketDoc.data();

    // Confirm the order behind this ticket actually cleared payment.
    const orderSnap = await db.collection("orders").doc(ticket.paymentReference).get();
    if (!orderSnap.exists || orderSnap.data().paymentStatus !== "Paid") {
      return NextResponse.json({ valid: false, reason: "Payment not confirmed." }, { status: 403 });
    }

    if (ticket.checkedIn) {
      return NextResponse.json({
        valid: false,
        reason: "Ticket already used.",
        checkedInAt: ticket.checkedInAt,
        fullName: ticket.fullName,
      });
    }

    const checkedInAt = new Date().toISOString();
    await ticketDoc.ref.set({ checkedIn: true, checkedInAt }, { merge: true });

    return NextResponse.json({
      valid: true,
      fullName: ticket.fullName,
      ticketType: ticket.ticketType,
      ticketId: ticket.ticketId,
      checkedInAt,
    });
  } catch (err) {
    console.error("checkin error:", err);
    return NextResponse.json({ error: "Check-in failed. Try again." }, { status: 500 });
  }
}
