import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";

// npm install resend
// Env var needed:
// RESEND_API_KEY=
// You'll also need to verify your sending domain in the Resend dashboard.

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail({ to, fullName, event, ticket, qrBuffer }) {
  // Read the flyer straight from /public on disk and attach it, instead of
  // linking to a URL — this works even on localhost, and keeps working once
  // deployed regardless of what NEXT_PUBLIC_SITE_URL is set to.
  const flyerPath = path.join(process.cwd(), "public", event.flyer);
  const flyerBuffer = await readFile(flyerPath);

  const html = `
    <div style="font-family:Arial,sans-serif;background:#0a0a0a;padding:40px 0;">
      <div style="max-width:480px;margin:0 auto;background:#111;border-radius:16px;overflow:hidden;color:#fff;">
        <div style="background:#e2001a;padding:20px 28px;">
          <p style="margin:0;font-size:11px;letter-spacing:0.3em;color:#fff;">DTC ENTERTAINMENT</p>
        </div>

        <img src="cid:flyer" alt="${event.name} flyer" width="480" style="display:block;width:100%;" />

        <div style="padding:28px;">
          <h1 style="font-size:22px;margin:0 0 6px;">${event.name}</h1>
          <p style="color:#aaa;font-size:14px;margin:0 0 20px;">Hey ${fullName}, you're in. Here's your ticket.</p>

          <p style="color:#ccc;font-size:13px;line-height:1.6;margin:0 0 20px;">${event.description}</p>

          <table style="width:100%;font-size:13px;color:#ccc;margin-bottom:20px;">
            <tr><td style="padding:4px 0;color:#e2001a;">Date</td><td>${event.date}</td></tr>
            <tr><td style="padding:4px 0;color:#e2001a;">Venue</td><td>${event.venue}</td></tr>
            <tr><td style="padding:4px 0;color:#e2001a;">Ticket ID</td><td>${ticket.ticketId}</td></tr>
            <tr><td style="padding:4px 0;color:#e2001a;">Type</td><td>${ticket.ticketType}</td></tr>
          </table>

          <div style="text-align:center;background:#fff;border-radius:12px;padding:20px;">
            <img src="cid:qrcode" alt="Ticket QR code" width="220" height="220" style="display:block;margin:0 auto;" />
            <p style="color:#0a0a0a;font-size:11px;margin-top:10px;">Show this QR code at entry</p>
          </div>

          <p style="color:#777;font-size:12px;margin-top:24px;">
            One scan, one entry — this QR code is unique to your ticket and can't be reused.
            Questions? Reply to this email or reach us at chizirimuzonduonuoha@gmail.com or
                     <a href="tel:+2347077176328">+234 707 717 6328</a>

          </p>
         <a href="tel:+2347077176328">+234 707 717 6328</a>

        </div>
      </div>
    </div>
  `;

  return resend.emails.send({
    from: "DTC Entertainment <onboarding@resend.dev>",
    to,
    subject: `Your ticket for ${event.name}`,
    html,
    attachments: [
      {
        filename: "flyer.jpeg",
        content: flyerBuffer.toString("base64"),
        contentId: "flyer",
      },
      {
        filename: "ticket-qr.png",
        content: qrBuffer.toString("base64"),
        contentId: "qrcode",
      },
    ],
  });
}