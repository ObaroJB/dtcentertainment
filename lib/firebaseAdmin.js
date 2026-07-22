import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// npm install firebase-admin
//
// Env vars needed (.env.local — never commit this file):
// FIREBASE_PROJECT_ID=
// FIREBASE_CLIENT_EMAIL=
// FIREBASE_PRIVATE_KEY=   (paste the key, keep the \n escapes)
//
// Get these from Firebase Console > Project Settings > Service Accounts >
// Generate new private key.

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = getFirestore();
