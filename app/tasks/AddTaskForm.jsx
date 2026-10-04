"use client"
import { addTask } from './actions'

// (งาน Lab A ขั้น 3 — ทำในโปรเจกต์ lab-day-08-start ไม่ใช่ที่นี่ · Lab B ไม่ต้องแตะ): แยก <SubmitButton /> เป็น component ลูก ใช้ useFormStatus โชว์ "กำลังเพิ่ม..."
// (งาน Lab A ขั้น 4 — ทำในโปรเจกต์ lab-day-08-start ไม่ใช่ที่นี่ · Lab B ไม่ต้องแตะ): ต่อ useActionState แล้วโชว์ state.error ใต้ฟอร์ม
export default function AddTaskForm() {
  return (
    <form action={addTask} className="flex gap-2 mb-4">
      <input name="title" placeholder="งานใหม่..." className="border p-2 flex-1 rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">เพิ่ม</button>
    </form>
  )
}
