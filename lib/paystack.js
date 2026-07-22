// lib/paystack.js
// Server-side only. PAYSTACK_SECRET_KEY must never reach the client.

const PAYSTACK_BASE = "https://api.paystack.co";

if (!process.env.PAYSTACK_SECRET_KEY) {
  console.error("❌ PAYSTACK_SECRET_KEY is missing in environment variables!");
}

/**
 * Initialize Paystack Transaction
 */
export async function initializePaystackPayment({
  reference,
  amount,        // Amount in KOBO (e.g. 5000 Naira = 500000)
  email,
  name,
  phone,
  redirectUrl,
  meta = {},
}) {
  try {
    const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference,
        amount,
        email: email.toLowerCase().trim(),
        callback_url: redirectUrl,
        metadata: {
          ...meta,
          customer_name: name?.trim(),
          customer_phone: phone?.trim(),
        },
      }),
    });

    const data = await res.json();

    if (!res.ok || data.status !== true) {
      console.error("Paystack Initialize Error:", data);
      throw new Error(data.message || "Failed to initialize Paystack payment.");
    }

    return data.data; // { authorization_url, reference, access_code, ... }
  } catch (error) {
    console.error("initializePaystackPayment error:", error);
    throw error;
  }
}

/**
 * Verify Paystack Transaction
 */
export async function verifyPaystackTransaction(reference) {
  try {
    const res = await fetch(
      `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== true) {
      console.error("Paystack Verify Error:", data);
      throw new Error(data.message || "Failed to verify Paystack transaction.");
    }

    return data.data; // Contains status, amount (in kobo), currency, id, etc.
  } catch (error) {
    console.error("verifyPaystackTransaction error:", error);
    throw error;
  }
}