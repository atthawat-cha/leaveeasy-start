// ─────────────────────────────────────────────────────────────
// js/login.js — หน้าเข้าสู่ระบบ
// สัปดาห์ที่ 7: เข้าสู่ระบบด้วย Firebase Authentication (Email/Password)
// ─────────────────────────────────────────────────────────────

import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

(function () {
  var ฟอร์ม = document.getElementById("ฟอร์มเข้าสู่ระบบ");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var ปุ่มเข้าสู่ระบบ = document.getElementById("ปุ่มเข้าสู่ระบบ");

  ฟอร์ม.addEventListener("submit", function (e) {
    e.preventDefault();

    var อีเมล = document.getElementById("email").value.trim();
    var รหัสผ่าน = document.getElementById("password").value;

    if (!อีเมล || !รหัสผ่าน) {
      เตือน("กรอกไม่ครบ — ต้องกรอกทั้งอีเมลและรหัสผ่าน");
      return;
    }

    ปุ่มเข้าสู่ระบบ.disabled = true;

    signInWithEmailAndPassword(auth, อีเมล, รหัสผ่าน)
      .then(function () {
        location.href = "leave-requests.html";
      })
      .catch(function (ข้อผิดพลาด) {
        เตือน(ข้อความผิดพลาดล็อกอิน(ข้อผิดพลาด.code));
        ปุ่มเข้าสู่ระบบ.disabled = false;
      });
  });

  function เตือน(ข้อความ) {
    กล่องเตือน.textContent = "⚠️ " + ข้อความ;
    กล่องเตือน.classList.remove("hidden");
  }
})();
