"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function SuccessContent() {
  const params = useSearchParams();
  // Flutterwave redirects with ?status=...&tx_ref=...&transaction_id=...
  const reference = params.get("tx_ref") || params.get("reference");
  const flwStatus = params.get("status"); // 'successful' | 'cancelled' | 'failed'
  const [state, setState] = useState({ loading: true, status: null, ticket: null, error: null });

  useEffect(() => {
    if (!reference) {
      setState({ loading: false, status: null, ticket: null, error: "No payment reference found." });
      return;
    }

    if (flwStatus === "cancelled") {
      setState({ loading: false, status: "Failed", ticket: null, error: null });
      return;
    }

    fetch(`/api/verify-payment?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setState({ loading: false, status: null, ticket: null, error: data.error });
        } else {
          setState({ loading: false, status: data.status, ticket: data.ticket, error: null });
        }
      })
      .catch(() =>
        setState({ loading: false, status: null, ticket: null, error: "Could not reach the server." })
      );
  }, [reference]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--black)",
        color: "var(--white)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "440px" }}
      >
        <span className="eyebrow">DTC Entertainment</span>

        {state.loading && (
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginTop: "16px" }}>
            Confirming your payment…
          </h1>
        )}

        {!state.loading && state.status === "Paid" && (
          <>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", marginTop: "16px", color: "var(--red)" }}>
              You're In
            </h1>
            <p style={{ marginTop: "12px", color: "var(--gray-300)" }}>
              Your ticket{state.ticket ? ` (${state.ticket.ticketId})` : ""} has been emailed to you
              with your QR code. See you there.
            </p>
          </>
        )}

        {!state.loading && state.status === "Failed" && (
          <>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginTop: "16px" }}>
              Payment Not Confirmed
            </h1>
            <p style={{ marginTop: "12px", color: "var(--gray-300)" }}>
              We couldn't confirm this payment. If you were charged, contact
              hello@dtcentertainment.com with your reference and we'll sort it out.
            </p>
          </>
        )}

        {!state.loading && state.error && (
          <>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", marginTop: "16px" }}>
              Something Went Wrong
            </h1>
            <p style={{ marginTop: "12px", color: "var(--gray-300)" }}>{state.error}</p>
          </>
        )}

        <motion.a
          href="/"
          whileHover={{ scale: 1.03 }}
          style={{
            display: "inline-block",
            marginTop: "32px",
            background: "var(--red)",
            padding: "14px 32px",
            borderRadius: "999px",
            fontFamily: "var(--font-display)",
            fontSize: "18px",
          }}
        >
          BACK TO DTC
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
