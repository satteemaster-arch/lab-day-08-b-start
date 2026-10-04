"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createSession } from '@/lib/session'

// ค่า mock — ระบบจริงต้องเทียบกับ database + password ที่ hash แล้ว
const MOCK_EMAIL = 'admin@cmu.ac.th'
const MOCK_PASSWORD = '1234'

export async function login(prevState, formData) {
  const email = formData.get('email')?.trim()
  const password = formData.get('password')

  if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
    return { error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
  }

  // Next.js 15: cookies() เป็น async ต้อง await ก่อนใช้
  // httpOnly = JS ฝั่งเบราว์เซอร์อ่าน cookie นี้ไม่ได้ (กัน XSS ขโมย session)
  const cookieStore = await cookies()
  cookieStore.set('session', await createSession(email), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8, // 8 ชั่วโมง
  })

  // redirect() ทำงานโดย throw — ต้องเรียกนอก try/catch และหลังตั้ง cookie แล้ว
  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/login')
}
