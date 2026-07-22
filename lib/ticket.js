import { randomBytes } from "crypto";
import QRCode from "qrcode";

// npm install qrcode

// Generates a sequential, human-readable ticket ID: EVT-000001
// The counter document lives in Firestore so IDs stay sequential across
// concurrent requests.
export async function generateTicketId(db) {
  const counterRef = db.collection("counters").doc("tickets");

  const nextNumber = await db.runTransaction(async (t) => {
    const doc = await t.get(counterRef);
    const current = doc.exists ? doc.data().value : 0;
    const next = current + 1;
    t.set(counterRef, { value: next }, { merge: true });
    return next;
  });

  return `EVT-${String(nextNumber).padStart(6, "0")}`;
}

// The QR code encodes only a random opaque token — never personal data.
// That token is what check-in scanning looks up in Firestore.
export function generateQrToken() {
  return randomBytes(16).toString("hex");
}

// Renders the QR token as a PNG buffer, meant to be sent as a real email
// attachment (with a content-id) rather than an inline base64 image — many
// inboxes (Gmail included) silently strip inline base64 images, which is
// why the QR wasn't showing up before.
export async function generateQrBuffer(qrToken) {
  return QRCode.toBuffer(qrToken, { width: 400, margin: 1 });
}