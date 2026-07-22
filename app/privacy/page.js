"use client";

import {
  PolicyHeader,
  PolicyCard,
  PolicyIntro,
  PolicyList,
  PolicyFooterNote,
} from "@/components/PolicyLayout";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <PolicyHeader eyebrow="Legal" title="Privacy Policy" updated="July 21, 2026" />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 6vw 100px" }}>
        <PolicyIntro>
          This covers exactly what personal information we collect when you
          buy a ticket, who it passes through, and how it's protected.
        </PolicyIntro>

        <PolicyCard title="What We Collect" index={0}>
          <PolicyList
            items={[
              "Full name, email address, and phone number, entered at checkout.",
              "Your ticket type and quantity purchased.",
              "We never see or store your card details — payment is handled entirely by Paystack, a licensed payment processor.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="Who Processes It" index={1}>
          <PolicyList
            items={[
              "Paystack processes your payment directly and securely — your card information never touches our servers.",
              "Firebase (by Google) stores your order and ticket record so we can verify your entry at the door.",
              "Resend delivers your ticket confirmation email, including your QR code.",
              "Each of these providers only receives the minimum information needed to do its job.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="How We Use It" index={2}>
          <PolicyList
            items={[
              "To generate and email your ticket, including your unique QR code.",
              "To verify your ticket and payment status at the venue on the night of the event.",
              "To contact you directly if something about the event changes — date, venue, or cancellation.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="Your Rights" index={3}>
          <PolicyList
            items={[
              "You can request a copy of the data we hold about you at any time by emailing us.",
              "You can request we delete your data once the event has concluded and any support window has passed.",
              "We never sell or rent your personal information to third parties for marketing.",
            ]}
          />
        </PolicyCard>

        <PolicyFooterNote>
          Questions about your data, or want it deleted? Email{" "}
          <a href="mailto:chizirimuzonduonuoha@gmail.com" style={{ color: "var(--red)", textDecoration: "underline" }}>
            chizirimuzonduonuoha@gmail.com
          </a>
        </PolicyFooterNote>
      </div>
    </div>
  );
}