// Server-side only. FLUTTERWAVE_SECRET_KEY must never reach the client.
// Env var needed:
// FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X
//
// Note: unlike Paystack, Flutterwave takes amounts in the currency's normal
// unit (e.g. 15000 for ₦15,000) — NOT in kobo. Don't multiply by 100.

const FLW_BASE = "https://api.flutterwave.com/v3";

export async function initializeFlutterwavePayment({
  txRef,
  amount,
  email,
  name,
  phone,
  redirectUrl,
  meta,
}) {
  const res = await fetch(`${FLW_BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: txRef,
      amount,
      currency: "NGN",
      redirect_url: redirectUrl,
      customer: {
        email,
        phonenumber: phone,
        name,
      },
      customizations: {
        title: "DTC Entertainment",
        description: "Event ticket purchase",
        logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      },
      meta,
    }),
  });

  const data = await res.json();

  if (!res.ok || data.status !== "success") {
    throw new Error(data.message || "Failed to initialize Flutterwave payment.");
  }

  return data.data; // { link } — the hosted checkout URL
}

// Verifies by tx_ref (the reference *we* generated), not Flutterwave's
// internal transaction id — simpler since that's all we store up front.
export async function verifyFlutterwaveTransaction(txRef) {
  const res = await fetch(
    `${FLW_BASE}/transactions/verify_by_reference?tx_ref=${encodeURIComponent(txRef)}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok || data.status !== "success") {
    throw new Error(data.message || "Failed to verify Flutterwave transaction.");
  }

  return data.data; // { status: 'successful' | 'failed' | ..., amount, id, tx_ref, ... }
}
