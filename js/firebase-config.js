// ─────────────────────────────────────────────────────────────
// js/firebase-config.js — จุดเชื่อมต่อ Firestore (สัปดาห์ที่ 6)
// โหลดผ่าน CDN โดยตรง (ไม่มีขั้นตอน build ในโปรเจกต์นี้)
// ─────────────────────────────────────────────────────────────

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmP8iDc4u9dR5Grq9hU2zoFtyY1ugAdXY",
  authDomain: "leaveeasy-a17ab.firebaseapp.com",
  projectId: "leaveeasy-a17ab",
  storageBucket: "leaveeasy-a17ab.firebasestorage.app",
  messagingSenderId: "887209181748",
  appId: "1:887209181748:web:25f30500e38951e5cac061",
  measurementId: "G-0LCSF461V6"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
