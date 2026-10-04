import './globals.css'
import { cookies } from 'next/headers'
import Nav from '@/components/Nav'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'Task Board — Next.js',
  description: 'วันที่ 8 — Server Actions, Auth Middleware & Deploy',
}

export default async function RootLayout({ children }) {
  // อ่าน cookie ที่ server แล้วส่งให้ AuthContext (ฝั่ง client อ่าน httpOnly cookie เองไม่ได้)
  // ⚠️ ผลข้างเคียงที่ตั้งใจ: การเรียก cookies() ทำให้ทุกหน้าเป็น dynamic (ƒ) — /tasks จึงอ่าน store สดทุก request
  //    ถ้าลบบรรทัดนี้ /tasks จะกลายเป็นหน้า static ที่ render ครั้งเดียวตอน build
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  const user = session ? { email: 'admin@cmu.ac.th' } : null

  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col">
        <AuthProvider initialUser={user}>
          <Nav />
          <main className="flex-1 max-w-4xl mx-auto w-full">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
