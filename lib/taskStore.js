// in-memory store ฝั่ง server — ไม่ใช่ DB จริง แต่พอให้ Server Action มี "ของจริง" ให้ mutate
// ⚠️ restart dev server = ข้อมูลกลับเป็นค่าเริ่มต้น
// ★ เก็บไว้บน globalThis — ตอน `npm run dev` Next.js โหลดไฟล์นี้แยกกันต่อ route (/tasks กับ /dashboard
//   ได้ตัวแปร tasks คนละก้อน) และโหลดใหม่ทุกครั้งที่แก้ไฟล์ · globalThis มีก้อนเดียวทั้ง process จึงแชร์กันได้
const store = globalThis.__taskStore ??= {
  tasks: [
    { id: 1, title: "ตั้งค่า Next.js project", done: true },
    { id: 2, title: "เขียน Server Action แรก", done: false },
  ],
}

export function getTasks() {
  return store.tasks
}

export function addTaskToStore(task) {
  store.tasks = [...store.tasks, task]
}

export function removeTaskFromStore(id) {
  store.tasks = store.tasks.filter(t => t.id !== id)
}

// (งาน Lab A ขั้น 1 — ทำในโปรเจกต์ lab-day-08-start ไม่ใช่ที่นี่ · Lab B ไม่ต้องแตะ): toggleTaskDone(id) — สลับ done ของงานที่ id ตรง ให้ store.tasks = ... แบบเดียวกับ 2 ฟังก์ชันข้างบน (อย่าแก้ object เดิม ให้สร้างใหม่)
