import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { verifyPaystackTransaction } from "@/lib/paystack";
import { generateTicketId, generateQrToken, generateQrBuffer } from "@/lib/ticket";
import { sendTicketEmail } from "@/lib/email";

const EVENT_INFO = {
  name: "DTC Presents: Capital Clash",
  date: "Saturday, August 8, 2026",
  venue: "Undisclosed",
  flyer: "/images/flyer.jpeg",
  description:
    "One night. One city. ABJ. Your favourite Influencers, Artists, Content Creators, DJ'S face off in a Brutal Football Match. Every corner of it about to feel it. The lineup, the lights, the noise. This is Capital Clash.",
};

// Paystack redirects back with ?reference=...
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference") || searchParams.get("tx_ref");

  if (!reference) {
    return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
  }

  try {
    const orderRef = db.collection("orders").doc(reference);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const order = orderSnap.data();

    if (order.paymentStatus === "Paid") {
      const existingTicket = await db
        .collection("tickets")
        .where("paymentReference", "==", reference)
        .limit(1)
        .get();
      return NextResponse.json({
        status: "Paid",
        order,
        ticket: existingTicket.empty ? null : existingTicket.docs[0].data(),
      });
    }

    const verification = await verifyPaystackTransaction(reference);

    if (verification.status !== "success") {
      await orderRef.set({ paymentStatus: "Failed" }, { merge: true });
      return NextResponse.json({ status: "Failed" });
    }

    // Paystack returns amount in kobo — convert the stored Naira total to
    // kobo before comparing, otherwise this check never actually fires.
    const expectedKobo = Math.round(order.totalAmount * 100);
    if (verification.amount !== expectedKobo || verification.currency !== "NGN") {
      console.error("Amount/currency mismatch on reference", reference);
      await orderRef.set({ paymentStatus: "Failed" }, { merge: true });
      return NextResponse.json({ error: "Payment amount mismatch." }, { status: 400 });
    }

    await orderRef.set(
      {
        paymentStatus: "Paid",
        paidAt: new Date().toISOString(),
        paystackTransactionId: verification.id,
      },
      { merge: true }
    );

    const ticketId = await generateTicketId(db);
    const qrToken = generateQrToken();
    const qrBuffer = await generateQrBuffer(qrToken);

    const ticket = {
      ticketId,
      fullName: order.fullName,
      email: order.email,
      phone: order.phone,
      paymentReference: reference,
      purchaseDate: new Date().toISOString(),
      ticketType: order.ticketType,
      quantity: order.quantity,
      qrToken,
      checkedIn: false,
      checkedInAt: null,
    };

    await db.collection("tickets").doc(ticketId).set(ticket);

    await sendTicketEmail({
      to: order.email,
      fullName: order.fullName,
      event: EVENT_INFO,
      ticket,
      qrBuffer,
    });

    return NextResponse.json({ status: "Paid", order, ticket });
  } catch (err) {
    console.error("verify-payment error:", err);
    return NextResponse.json(
      { error: "Could not verify payment. Please contact support." },
      { status: 500 }
    );
  }
}