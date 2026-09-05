// ─────────────────────────────────────────────────────────────
// js/auth-guard.js — บังคับล็อกอินก่อนเข้าใช้หน้าที่ต้องมีสิทธิ์
// ใส่ไว้ในหน้าที่ต้องล็อกอินก่อนเท่านั้น (ห้ามใส่ใน signup.html / login.html
// ไม่งั้นคนที่ยังไม่ล็อกอินจะเข้าหน้าสมัคร/เข้าสู่ระบบเองไม่ได้)
// ─────────────────────────────────────────────────────────────

import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

onAuthStateChanged(auth, function (ผู้ใช้) {
  if (!ผู้ใช้) location.href = "login.html";
});
