# วิธีตั้งค่าตารางคะแนนรวมทั้งห้อง (Google Sheets)

ใช้เวลาประมาณ 5 นาที ฟรี ไม่ต้องใส่บัตร ต้องมีบัญชี Google

## 1. สร้าง Google Sheet
1. เปิด https://sheets.google.com แล้วกด **+ Blank spreadsheet**
2. ตั้งชื่อไฟล์ เช่น `Negative Mart Scores`

## 2. ใส่โค้ดหลังบ้าน
1. ในชีต กดเมนู **Extensions → Apps Script**
2. ลบโค้ดเดิมในหน้าต่างให้หมด (มักมีฟังก์ชัน `myFunction`)
3. เปิดไฟล์ `backend/Code.gs` ใน repo นี้ คัดลอกทั้งหมดไปวาง
4. กดไอคอนแผ่นดิสก์ (**Save project**)

## 3. Deploy เป็น Web App
1. มุมขวาบน กด **Deploy → New deployment**
2. กดไอคอนเฟือง ข้าง "Select type" แล้วเลือก **Web app**
3. ตั้งค่า
   - Description: `Negative Mart`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. กด **Deploy**
5. ครั้งแรกจะขอสิทธิ์ กด **Authorize access** → เลือกบัญชีของคุณ → ถ้าขึ้น "Google hasn't verified this app" ให้กด **Advanced → Go to ... (unsafe)** → **Allow** (เป็นสคริปต์ของคุณเอง)
6. คัดลอก **Web app URL** (ขึ้นต้นด้วย `https://script.google.com/macros/s/.../exec`)

## 4. ใส่ URL ในเกม
1. เปิดไฟล์ `negative-mart-en.html` ใน GitHub กดไอคอนดินสอ (Edit)
2. หาบรรทัด `backendUrl: ''` (อยู่ใน `CONFIG` ต้นส่วน `<script>`)
3. ใส่ URL ระหว่างเครื่องหมายคำพูด เช่น
   ```js
   backendUrl: 'https://script.google.com/macros/s/AKfycb.../exec'
   ```
4. กด **Commit changes** รอ 1-2 นาทีให้ GitHub Pages อัปเดต

## 5. ทดสอบ
เปิดลิงก์เกมจากมือถือสองเครื่อง ให้เล่นจนจบทั้งสองเครื่อง ทั้งสองเครื่องควรเห็นคะแนนของกันและกันในตาราง และคะแนนจะขึ้นในแท็บ **Scores** ของ Google Sheet

## หมายเหตุ
- **ดู/ลบคะแนน:** เปิดแท็บ `Scores` ใน Google Sheet ลบแถวได้เลย ถ้าจะล้างทั้งห้อง ให้ลบทุกแถวยกเว้นแถวหัวตาราง
- **เปลี่ยนห้อง/คาบ:** ทำตารางแยกโดยทำ Sheet ใหม่ + Deploy ใหม่ แล้วใช้ URL คนละอัน
- **แก้โค้ด Code.gs ภายหลัง:** ต้อง Deploy → Manage deployments → ไอคอนดินสอ → Version: New version → Deploy (URL เดิมใช้ต่อได้)
- **ความปลอดภัย:** URL นี้ใครมีลิงก์ก็ส่งคะแนนได้ (ฝั่งสคริปต์จำกัดชื่อไม่เกิน 12 ตัวอักษรและคะแนนไม่เกิน 300) ใช้กับห้องเรียนได้ แต่ไม่เหมาะกับการแข่งขันที่มีรางวัลจริง
- ถ้าหลังบ้านใช้ไม่ได้ (เน็ตหลุด ฯลฯ) เกมจะกลับไปเก็บคะแนนในเครื่องเอง ไม่ค้าง
