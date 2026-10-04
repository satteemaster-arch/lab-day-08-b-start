// Server Component — 🔴 ห้ามใส่ "use client"
// โค้ดและข้อความในไฟล์นี้รันที่ server เท่านั้น เบราว์เซอร์ได้แค่ HTML ผลลัพธ์ ไม่ได้ไฟล์ JS ของ component นี้
// (เวอร์ชันเดิมเป็น Client Component → ข้อความลับถูก bundle ลง /_next/static/... ที่ใครก็โหลดได้)
import { getTasks } from '@/lib/taskStore'

export default function DashboardPage() {
  const tasks = getTasks()
  const doneCount = tasks.filter(t => t.done).length

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">งานทั้งหมด {tasks.length} งาน · ทำเสร็จแล้ว {doneCount} งาน</p>
      <div className="p-4 border rounded bg-yellow-50">
        ยอดขายทั้งปีนี้: 12,400,000 บาท (ห้ามพนักงานทั่วไปเห็น)
      </div>
    </div>
  )
}
