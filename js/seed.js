// ─────────────────────────────────────────────────────────────
// js/seed.js — ใส่ข้อมูลตัวอย่างจากหัวข้อ 7 ของ leaveeasy-spec.md ลง Firestore
// เครื่องมือสำหรับใช้ครั้งเดียวตอนตั้งค่าโปรเจกต์สัปดาห์ที่ 6
// ใช้ doc id ตายตัว (u001, lr001, ...) กดซ้ำได้โดยไม่เกิดข้อมูลซ้ำ
// ─────────────────────────────────────────────────────────────

import { db } from "./firebase-config.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

var users = [
  { id: "u001", name: "สมชาย ใจดี",   email: "somchai@example.com", role: "employee" },
  { id: "u002", name: "สมหญิง รักงาน", email: "somying@example.com", role: "manager" },
  { id: "u003", name: "สมศรี ตั้งใจ",  email: "somsri@example.com",  role: "hr" }
];

var leaveTypes = [
  { id: "lt001", name: "ลาพักร้อน" },
  { id: "lt002", name: "ลาป่วย" },
  { id: "lt003", name: "ลากิจ" }
];

var leaveRequests = [
  {
    id: "lr001",
    title: "ลาพักร้อนไปเที่ยวกับครอบครัว",
    reason: "วางแผนเดินทางไปต่างจังหวัดกับครอบครัว จองที่พักไว้ล่วงหน้าแล้ว",
    status: "รอพิจารณา",
    requesterId: "u001", requesterName: "สมชาย ใจดี",
    approverId: "u002",  approverName: "สมหญิง รักงาน",
    leaveTypeId: "lt001", leaveTypeName: "ลาพักร้อน",
    startDate: "2026-09-07", endDate: "2026-09-09",
    createdAt: "2026-09-01 09:15",
    approvals: [
      { id: "ap001", authorId: "u002", authorName: "สมหญิง รักงาน",
        message: "รับเรื่องแล้ว ขอดูตารางงานของทีมช่วงนั้นก่อนนะครับ", createdAt: "2026-09-01 13:40" },
      { id: "ap002", authorId: "u003", authorName: "สมศรี ตั้งใจ",
        message: "ตรวจแล้ว วันลาพักร้อนคงเหลือครอบคลุมช่วงที่ขอ ไม่ติดขัดฝั่งฝ่ายบุคคล", createdAt: "2026-09-02 10:05" }
    ]
  },
  {
    id: "lr002",
    title: "ลาป่วยไข้หวัดใหญ่",
    reason: "มีไข้สูงและไอมาก แพทย์แนะนำให้พักอยู่บ้าน 2 วัน",
    status: "อนุมัติ",
    requesterId: "u001", requesterName: "สมชาย ใจดี",
    approverId: "u002",  approverName: "สมหญิง รักงาน",
    leaveTypeId: "lt002", leaveTypeName: "ลาป่วย",
    startDate: "2026-08-24", endDate: "2026-08-25",
    createdAt: "2026-08-24 08:05",
    approvals: [
      { id: "ap003", authorId: "u002", authorName: "สมหญิง รักงาน",
        message: "อนุมัติแล้ว พักผ่อนให้เต็มที่ งานที่ค้างไว้เดี๋ยวทีมช่วยดูให้", createdAt: "2026-08-24 09:20" }
    ]
  },
  {
    id: "lr003",
    title: "ลากิจไปทำบัตรประชาชน",
    reason: "บัตรประชาชนหมดอายุ ต้องไปทำที่สำนักงานเขตในวันทำการ",
    status: "รอพิจารณา",
    requesterId: "u003", requesterName: "สมศรี ตั้งใจ",
    approverId: "",      approverName: "",
    leaveTypeId: "lt003", leaveTypeName: "ลากิจ",
    startDate: "2026-09-15", endDate: "2026-09-15",
    createdAt: "2026-09-10 16:30",
    approvals: []
  },
  {
    id: "lr004",
    title: "ลาพักร้อนช่วงวันหยุดยาว",
    reason: "อยากต่อวันหยุดยาวไปพักผ่อนกับครอบครัวอีก 3 วัน",
    status: "ไม่อนุมัติ",
    requesterId: "u003", requesterName: "สมศรี ตั้งใจ",
    approverId: "u002",  approverName: "สมหญิง รักงาน",
    leaveTypeId: "lt001", leaveTypeName: "ลาพักร้อน",
    startDate: "2026-10-12", endDate: "2026-10-16",
    createdAt: "2026-09-20 11:00",
    approvals: [
      { id: "ap004", authorId: "u002", authorName: "สมหญิง รักงาน",
        message: "ช่วงนั้นทีมมีงานส่งมอบพอดี ขอเลื่อนเป็นสัปดาห์ถัดไปได้ไหมครับ", createdAt: "2026-09-20 15:10" }
    ]
  },
  {
    id: "lr005",
    title: "ลาป่วยไปพบแพทย์ตามนัด",
    reason: "มีนัดตรวจติดตามอาการกับแพทย์ในช่วงเช้า",
    status: "รอพิจารณา",
    requesterId: "u001", requesterName: "สมชาย ใจดี",
    approverId: "u002",  approverName: "สมหญิง รักงาน",
    leaveTypeId: "lt002", leaveTypeName: "ลาป่วย",
    startDate: "2026-09-22", endDate: "2026-09-22",
    createdAt: "2026-09-18 14:45",
    approvals: []
  }
];

export async function ใส่ข้อมูลตัวอย่าง(บันทึกความคืบหน้า) {
  var log = บันทึกความคืบหน้า || function () {};

  for (var i = 0; i < users.length; i++) {
    await setDoc(doc(db, "users", users[i].id), {
      name: users[i].name, email: users[i].email, role: users[i].role
    });
    log("users/" + users[i].id + " ✅");
  }

  for (var j = 0; j < leaveTypes.length; j++) {
    await setDoc(doc(db, "leaveTypes", leaveTypes[j].id), { name: leaveTypes[j].name });
    log("leaveTypes/" + leaveTypes[j].id + " ✅");
  }

  for (var k = 0; k < leaveRequests.length; k++) {
    var ใบ = leaveRequests[k];
    var ฟิลด์หลัก = {
      title: ใบ.title, reason: ใบ.reason, status: ใบ.status,
      requesterId: ใบ.requesterId, requesterName: ใบ.requesterName,
      approverId: ใบ.approverId, approverName: ใบ.approverName,
      leaveTypeId: ใบ.leaveTypeId, leaveTypeName: ใบ.leaveTypeName,
      startDate: ใบ.startDate, endDate: ใบ.endDate, createdAt: ใบ.createdAt
    };
    await setDoc(doc(db, "leaveRequests", ใบ.id), ฟิลด์หลัก);
    log("leaveRequests/" + ใบ.id + " ✅");

    for (var m = 0; m < ใบ.approvals.length; m++) {
      var ap = ใบ.approvals[m];
      await setDoc(doc(db, "leaveRequests", ใบ.id, "approvals", ap.id), {
        authorId: ap.authorId, authorName: ap.authorName,
        message: ap.message, createdAt: ap.createdAt
      });
      log("leaveRequests/" + ใบ.id + "/approvals/" + ap.id + " ✅");
    }
  }

  log("เสร็จแล้ว — ใส่ข้อมูลตัวอย่างครบทุกโฟลเดอร์");
}
