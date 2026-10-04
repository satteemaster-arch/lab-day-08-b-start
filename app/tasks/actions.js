"use server"

import { revalidatePath } from 'next/cache'
import { addTaskToStore } from '@/lib/taskStore'

// ✓ ของเช้า (บล็อก 1.2) — ยังไม่ validate จริง: ชื่อว่าง/สั้นเกิน = return เงียบ ๆ ไม่บอกผู้ใช้
// (งาน Lab A ขั้น 4 — ทำในโปรเจกต์ lab-day-08-start ไม่ใช่ที่นี่ · Lab B ไม่ต้องแตะ): เปลี่ยนเป็น addTask(prevState, formData) แล้ว return { error } ให้ useActionState
export async function addTask(formData) {
  const title = formData.get('title')
  if (!title || title.trim().length < 2) return

  addTaskToStore({ id: Date.now(), title: title.trim(), done: false })
  revalidatePath('/tasks')
}

// (งาน Lab A ขั้น 2 — ทำในโปรเจกต์ lab-day-08-start ไม่ใช่ที่นี่ · Lab B ไม่ต้องแตะ): removeTask(formData) — อ่าน id จาก <input type="hidden" name="id">
// (งาน Lab A ขั้น 2 — ทำในโปรเจกต์ lab-day-08-start ไม่ใช่ที่นี่ · Lab B ไม่ต้องแตะ): toggleTask(formData) — ★ ของใหม่ ไม่ได้สาธิตตอนเช้า
