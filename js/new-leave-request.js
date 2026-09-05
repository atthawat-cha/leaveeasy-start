// ─────────────────────────────────────────────────────────────
// js/new-leave-request.js — หน้าที่ 2 ยื่นใบลาใหม่
// สัปดาห์ที่ 7: บันทึกใบลาใหม่ลงฐานข้อมูลจริง (Firestore) — โฟลเดอร์ leaveRequests
// requesterId/requesterName มาจากผู้ใช้ที่ล็อกอินอยู่จริง (js/auth-guard.js บังคับล็อกอินก่อนแล้ว)
// ─────────────────────────────────────────────────────────────

import { db, auth } from "./firebase-config.js";
import { collection, addDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

(function () {
  var ฟอร์ม = document.getElementById("ฟอร์มใบลา");
  var ช่องประเภท = document.getElementById("leaveTypeId");
  var กล่องเตือน = document.getElementById("ข้อความเตือน");
  var ปุ่มบันทึก = document.getElementById("ปุ่มบันทึก");

  // เติมรายการเลื่อนลงด้วยประเภทการลาที่มีอยู่
  window.LEAVE_DATA.leaveTypes.forEach(function (ประเภท) {
    var ตัวเลือก = document.createElement("option");
    ตัวเลือก.value = ประเภท.id;
    ตัวเลือก.textContent = ประเภท.name;
    ช่องประเภท.appendChild(ตัวเลือก);
  });

  ฟอร์ม.addEventListener("submit", async function (e) {
    e.preventDefault();

    var ผู้ใช้ = auth.currentUser;
    if (!ผู้ใช้) {
      location.href = "login.html";
      return;
    }

    var ค่า = {
      title: document.getElementById("title").value.trim(),
      reason: document.getElementById("reason").value.trim(),
      leaveTypeId: ช่องประเภท.value,
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value
    };

    // ตรวจว่ากรอกครบก่อนบันทึก
    if (!ค่า.title || !ค่า.reason || !ค่า.leaveTypeId || !ค่า.startDate || !ค่า.endDate) {
      เตือน("กรอกไม่ครบ — ต้องกรอกทุกช่องก่อนกดบันทึก");
      return;
    }
    if (ค่า.endDate < ค่า.startDate) {
      เตือน("วันที่สิ้นสุดต้องไม่มาก่อนวันที่เริ่มลา");
      return;
    }

    var ประเภท = window.LEAVE_DATA.leaveTypes.find(function (t) { return t.id === ค่า.leaveTypeId; });

    ปุ่มบันทึก.disabled = true;

    try {
      var เอกสารผู้ใช้ = await getDoc(doc(db, "users", ผู้ใช้.uid));
      var ชื่อผู้ขอลา = เอกสารผู้ใช้.exists() ? เอกสารผู้ใช้.data().name : ผู้ใช้.email;

      var ใบใหม่ = {
        title: ค่า.title,
        reason: ค่า.reason,
        status: "รอพิจารณา",                       // ใบใหม่เริ่มที่ รอพิจารณา เสมอ
        requesterId: ผู้ใช้.uid, requesterName: ชื่อผู้ขอลา,
        approverId: "",      approverName: "",
        leaveTypeId: ประเภท.id, leaveTypeName: ประเภท.name,
        startDate: ค่า.startDate,
        endDate: ค่า.endDate,
        createdAt: เวลาตอนนี้()
      };

      await addDoc(collection(db, "leaveRequests"), ใบใหม่);
      location.href = "leave-requests.html";
    } catch (ข้อผิดพลาด) {
      เตือน("บันทึกลง Firestore ไม่สำเร็จ: " + ข้อผิดพลาด.message);
      ปุ่มบันทึก.disabled = false;
    }
  });

  function เตือน(ข้อความ) {
    กล่องเตือน.textContent = "⚠️ " + ข้อความ;
    กล่องเตือน.classList.remove("hidden");
  }
})();
