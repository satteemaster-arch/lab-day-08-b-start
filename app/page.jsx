import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">วันที่ 8 — Server Actions, Auth Middleware &amp; Deploy</h1>
      <ul className="list-disc pl-6 space-y-1">
        <li><Link href="/tasks" className="text-blue-600">/tasks</Link> — ช่วง 1 · Server Action</li>
        <li><Link href="/dashboard" className="text-blue-600">/dashboard</Link> — ช่วง 2 · auth guard</li>
        <li><Link href="/login" className="text-blue-600">/login</Link> — ทดสอบ: admin@cmu.ac.th / 1234</li>
      </ul>
    </div>
  )
}
