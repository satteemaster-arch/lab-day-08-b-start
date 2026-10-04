import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'

// รันที่ server "ก่อน" Next.js render หน้าใด ๆ — ไม่มี session ที่ถูกต้อง = ตอบ 307 redirect ทันที
// เบราว์เซอร์จึงไม่ได้รับ HTML/JS ของหน้า dashboard เลยแม้แต่ไบต์เดียว
export async function middleware(request) {
  const token = request.cookies.get('session')?.value
  const email = await verifySession(token)

  if (!email) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

// ครอบเฉพาะ /dashboard และทุก path ย่อย (/dashboard/xxx)
export const config = {
  matcher: ['/dashboard/:path*'],
}
