# ร้านแปรงสีฟัน (แลนดิ้งเพจ + Google Sheet + GitHub + Vercel)

โครงสร้างไฟล์
- index.html : หน้าแลนดิ้งเพจ (ลูกค้าสั่งซื้อ)
- admin.html : หน้าหลังร้าน (รายการหยิบสินค้า, แพ็ค, พิมพ์ใบปะหน้า)
- images/    : โฟลเดอร์รูปสินค้า (เปลี่ยนเป็นรูปจริงได้ ชื่อไฟล์ต้องตรงกับคอลัมน์ Image ใน Sheet)
- Code.gs    : โค้ด Google Apps Script

ขั้นตอน
1. สร้าง Google Sheet ใหม่ > Extensions > Apps Script > วางโค้ด Code.gs > รัน setup() > อนุญาตสิทธิ์
2. Deploy > New deployment > Web app > Execute as: Me / Who has access: Anyone > คัดลอก URL
3. แก้ API_URL ใน index.html และ admin.html ให้เป็น URL ที่คัดลอก
4. สร้าง repo ใน GitHub แล้วอัปโหลดทุกไฟล์ (รวมโฟลเดอร์ images)
5. vercel.com > Add New Project > Import repo > Deploy
6. ส่งลิงก์ Vercel (หน้าแรก และ /admin.html) ตามที่อาจารย์กำหนด

ทดสอบ: สั่งซื้อในหน้าแรก > ดูแถวใหม่ใน Sheet (แท็บ Orders) > เปิด /admin.html เพื่อดูรายการหยิบและพิมพ์ใบปะหน้า
