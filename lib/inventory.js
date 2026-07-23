import { FieldValue } from "firebase-admin/firestore";

// One document holds capacity + sold count for every tier.
// Structure in Firestore: inventory/main = { tiers: { "Early Bird": { capacity: 100, sold: 12 }, ... } }

export async function getAvailability(db) {
  const doc = await db.collection("inventory").doc("main").get();
  if (!doc.exists) return {};
  return doc.data().tiers || {};
}

export async function checkAvailability(db, tierName, quantity) {
  const tiers = await getAvailability(db);
  const tier = tiers[tierName];
  if (!tier) return { available: true }; // no cap configured for this tier — allow it
  const remaining = tier.capacity - tier.sold;
  return { available: remaining >= quantity, remaining };
}

export async function incrementSold(db, tierName, quantity) {
  const invRef = db.collection("inventory").doc("main");
  await db.runTransaction(async (t) => {
    const doc = await t.get(invRef);
    const tiers = doc.exists ? doc.data().tiers || {} : {};
    if (!tiers[tierName]) return; // no cap configured, nothing to track
    tiers[tierName].sold = (tiers[tierName].sold || 0) + quantity;
    t.set(invRef, { tiers }, { merge: true });
  });
}