// ─────────────────────────────────────────────────────────────
// js/signup.js — หน้าสมัครสมาชิก
// สัปดาห์ที่ 7: สมัครด้วย Firebase Authentication (Email/Password)
// สมัครสำเร็จแล้วสร้างไฟล์ใหม่ในโฟลเดอร์ users (doc id = uid) role เริ่มต้นเป็น employee
// ─────────────────────────────────────────────────────────────

import { db, auth } from "./firebase-config.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

(function () {
  var ฟอร์ม = document.getElementById("ฟอร์มสมัคร");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var ปุ่มสมัคร = document.getElementById("ปุ่มสมัคร");

  ฟอร์ม.addEventListener("submit", function (e) {
    e.preventDefault();

    var ค่า = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value
    };

    if (!ค่า.name || !ค่า.email || !ค่า.password || !ค่า.confirmPassword) {
      เตือน("กรอกไม่ครบ — ต้องกรอกทุกช่องก่อนกดสมัครสมาชิก");
      return;
    }
    if (ค่า.password !== ค่า.confirmPassword) {
      เตือน("รหัสผ่านกับยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    ปุ่มสมัคร.disabled = true;

    createUserWithEmailAndPassword(auth, ค่า.email, ค่า.password)
      .then(function (ผลลัพธ์) {
        return setDoc(doc(db, "users", ผลลัพธ์.user.uid), {
          name: ค่า.name,
          email: ค่า.email,
          role: "employee"
        });
      })
      .then(function () {
        location.href = "leave-requests.html";
      })
      .catch(function (ข้อผิดพลาด) {
        เตือน(ข้อความผิดพลาดล็อกอิน(ข้อผิดพลาด.code));
        ปุ่มสมัคร.disabled = false;
      });
  });

  function เตือน(ข้อความ) {
    กล่องเตือน.textContent = "⚠️ " + ข้อความ;
    กล่องเตือน.classList.remove("hidden");
  }
})();
