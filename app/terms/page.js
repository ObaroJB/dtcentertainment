"use client";

import {
  PolicyHeader,
  PolicyCard,
  PolicyIntro,
  PolicyList,
  PolicyFooterNote,
} from "@/components/PolicyLayout";

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <PolicyHeader eyebrow="Legal" title="Terms & Conditions" updated="July 21, 2026" />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 6vw 100px" }}>
        <PolicyIntro>
          These terms apply the moment you buy a ticket or use this website.
          If you don't agree with something here, please don't complete your
          purchase, and reach out to us with any questions first.
        </PolicyIntro>

        <PolicyCard title="Ticket Sales" index={0}>
          <PolicyList
            items={[
              "All sales are final. We do not offer refunds for change of mind, missed entry, or late arrival.",
              "If DTC Entertainment cancels the event outright, ticket holders will be refunded in full within 14 days.",
              "If the event is postponed rather than cancelled, existing tickets remain valid for the new date automatically.",
              "Tickets are non-transferable — the name on the order should match the person attending.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="Entry Requirements" index={1}>
          <PolicyList
            items={[
              "You must present the QR code emailed to you after payment — either printed or on your phone — to be let in.",
              "Each QR code is valid for one scan only. Once used, it cannot grant entry again, even to the original buyer.",
              "This is an 18+ event. Valid government-issued ID may be requested at the door.",
              "Entry may be refused for capacity reasons even with a valid ticket, in the unlikely event of a venue safety limit being reached — we'll always try to reach ticket holders in advance if this risk arises.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="Conduct & Safety" index={2}>
          <PolicyList
            items={[
              "Management may refuse entry or remove any attendee who is a danger to themselves or others, without refund.",
              "Prohibited items include weapons, illegal substances, and outside drinks or food — bags may be searched at entry.",
              "By attending, you consent to being photographed or filmed for DTC Entertainment's promotional use across our social channels.",
            ]}
          />
        </PolicyCard>

        <PolicyCard title="Changes to the Event" index={3}>
          <PolicyList
            items={[
              "Lineup, start time, and specific venue details may change ahead of the event — we'll email registered ticket holders if anything major shifts.",
              "The venue address listed as 'Undisclosed' at checkout will be released to ticket holders closer to the date.",
            ]}
          />
        </PolicyCard>

        <PolicyFooterNote>
          Questions about these terms? Reach us at{" "}
          <a href="mailto:chizirimuzonduonuoha@gmail.com" style={{ color: "var(--red)", textDecoration: "underline" }}>
            chizirimuzonduonuoha@gmail.com
          </a>
        </PolicyFooterNote>
      </div>
    </div>
  );
}