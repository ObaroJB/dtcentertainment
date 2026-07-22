import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/firebaseAdmin";
import { initializePaystackPayment } from "@/lib/paystack";

// Very small in-memory rate limiter (per server instance)
const recentRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 5;
  const timestamps = (recentRequests.get(ip) || []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return timestamps.length > maxRequests;
}

export async function POST(request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, ticketType, quantity, promoCode, unitPrice } = body;

    // ---- Server-side validation ----
    if (!fullName?.trim() || fullName.trim().length < 2) {
      return NextResponse.json({ error: "A valid full name is required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }
    if (!/^[0-9+()\-\s]{7,15}$/.test(phone || "")) {
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    }

    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 1 || qty > 10) {
      return NextResponse.json({ error: "Quantity must be between 1 and 10." }, { status: 400 });
    }
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      return NextResponse.json({ error: "Invalid ticket price." }, { status: 400 });
    }

    const totalAmountNaira = unitPrice * qty;
    const txRef = `dtc_${randomUUID()}`;

    // Save order to database
    const orderRef = db.collection("orders").doc(txRef);
    await orderRef.set({
      orderId: txRef,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      ticketType,
      quantity: qty,
      unitPrice,
      totalAmount: totalAmountNaira,
      promoCode: promoCode || null,
      paymentStatus: "Pending",
      paymentReference: txRef,
      createdAt: new Date().toISOString(),
    });

    const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/order/success`;

    // Initialize Paystack Payment
    const paystackData = await initializePaystackPayment({
      reference: txRef,
      amount: Math.round(totalAmountNaira * 100), // ← Must be in Kobo
      email: email.trim().toLowerCase(),
      name: fullName.trim(),
      phone: phone.trim(),
      redirectUrl,
      meta: { fullName, quantity: qty, ticketType },
    });

    if (!paystackData?.authorization_url) {
      throw new Error("Paystack did not return authorization URL");
    }

    return NextResponse.json({ 
      authorizationUrl: paystackData.authorization_url,
      reference: txRef 
    });

  } catch (err) {
    console.error("create-order error:", err);
    
    return NextResponse.json(
      { 
        error: "Could not start checkout. Please try again shortly.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined
      },
      { status: 500 }
    );
  }
}