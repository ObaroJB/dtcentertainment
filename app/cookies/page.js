"use client";

import {
  PolicyHeader,
  PolicyCard,
  PolicyIntro,
  PolicyList,
  PolicyFooterNote,
} from "@/components/PolicyLayout";

export default function CookiesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <PolicyHeader eyebrow="Legal" title="Cookie Policy" updated="July 21, 2026" />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 6vw 100px" }}>
        <PolicyIntro>
          This site keeps things simple — here's the one piece of local data
          we store in your browser, and why.
        </PolicyIntro>

        <PolicyCard title="What We Store" index={0}>
          <PolicyList
            items={[
              "A single local storage entry that remembers you've accepted our terms, so you're not shown that prompt again on your next visit.",
              "This is stored only in your own browser — it is never sent to our servers or shared with anyone.",
              "We do not currently use tracking or advertising cookies of any kind.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="Third-Party Storage" index={1}>
          <PolicyList
            items={[
              "When you're redirected to Paystack to pay, Paystack's own site may set its own cookies during checkout — this is governed by Paystack's policies, not ours.",
              "We don't control or receive any data from cookies set on Paystack's checkout page.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="Managing This" index={2}>
          <PolicyList
            items={[
              "You can clear this at any time through your browser's site settings — it'll simply show the consent prompt again next time you visit.",
              "Clearing it doesn't affect your ability to buy a ticket or receive your emailed QR code.",
            ]}
          />
        </PolicyCard>

        <PolicyFooterNote>
          Questions about this? Email{" "}
          <a href="mailto:chizirimuzonduonuoha@gmail.com" style={{ color: "var(--red)", textDecoration: "underline" }}>
            chizirimuzonduonuoha@gmail.com
          </a>
        </PolicyFooterNote>
      </div>
    </div>
  );
}