"use client"

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { logout } from '@/app/login/actions'

export default function Nav() {
  const { user } = useAuth()

  return (
    <header className="border-b">
      <nav className="max-w-4xl mx-auto flex items-center gap-6 p-4">
        {/* NEXT_PUBLIC_ = อ่านได้ใน Client Component · ถ้าขึ้นข้อความในวงเล็บ = ยังไม่ได้ตั้ง env (หรือลืมตั้งใน Vercel) */}
        <span className="font-bold">{process.env.NEXT_PUBLIC_SITE_NAME ?? "(ยังไม่ตั้ง NEXT_PUBLIC_SITE_NAME)"}</span>
        <Link href="/tasks" className="text-gray-600 hover:text-gray-900">งาน</Link>
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
        <div className="ml-auto text-sm">
          {/* logout เป็น Server Action — ลบ httpOnly cookie ได้เฉพาะฝั่ง server เท่านั้น */}
          {user ? (
            <form action={logout} className="flex items-center gap-3">
              <span className="text-gray-500">{user.email}</span>
              <button type="submit" className="text-red-600">ออกจากระบบ</button>
            </form>
          ) : (
            <Link href="/login" className="text-blue-600">เข้าสู่ระบบ</Link>
          )}
        </div>
      </nav>
    </header>
  )
}
