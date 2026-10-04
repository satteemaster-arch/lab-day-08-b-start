// Server Component — 🔴 ห้ามใส่ "use client" ในไฟล์นี้
import AddTaskForm from './AddTaskForm'
import { getTasks } from '@/lib/taskStore'

export default function TasksPage() {
  const tasks = getTasks()

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Board</h1>

      <AddTaskForm />

      <ul className="space-y-2">
        {tasks.map(t => (
          <li key={t.id} className="flex items-center justify-between border-b pb-2">
            <span className={t.done ? "line-through text-gray-400" : ""}>{t.title}</span>
            {/* (งาน Lab A ขั้น 2 — ทำใน lab-day-08-start ไม่ใช่ที่นี่): ปุ่ม "ทำเสร็จแล้ว"/"ยังไม่เสร็จ" + ปุ่ม "ลบ" — แต่ละปุ่มเป็น <form action={...}> ของตัวเอง */}
          </li>
        ))}
      </ul>
    </div>
  )
}
