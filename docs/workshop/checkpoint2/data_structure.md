📁 Collection = โฟลเดอร์ · 📄 Document = ไฟล์ · ✏️ Field = ช่องข้อมูลในไฟล์
ไม่มี JOIN จึงต้อง จดชื่อซ้ำไว้ในไฟล์เลย (denormalize) เช่นเก็บ requesterName ไว้ในใบลาตรง ๆ
ของที่เป็นของใบลาใบนั้นโดยเฉพาะ ให้เป็น โฟลเดอร์ย่อย (subcollection) เช่นความเห็นการอนุมัติ


📁 users            → name · email · role
📁 leaveTypes       → name
📁 leaveRequests    → title · reason · startDate · endDate · status
                      requesterId · [requesterName] · approverId · [approverName]
                      leaveTypeId · [leaveTypeName] · createdAt
   └ 📁 approvals   → authorId · [authorName] · message · createdAt
   ### “จดซ้ำเพราะไม่มี JOIN”


1. ถ้าสมชายเปลี่ยนชื่อ ต้องไปแก้กี่ที่? 
    - exdit at users > name

2. ทำไม approvals จึงเป็นโฟลเดอร์ย่อย ไม่ใช่โฟลเดอร์แยก?
    - เพราะต้องมี leaveRequests ก่อนจึงจะสามารถมี approvals เนื่องจากเป็นการเก็บข้อมูลว่าใครเป็นคน  approv คำขอนี้