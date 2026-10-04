// เซ็นค่า cookie `session` ด้วย SESSION_SECRET (HMAC-SHA256) — ใครแก้/ปลอม cookie เองจะ verify ไม่ผ่าน
// ใช้ Web Crypto (crypto.subtle) เพราะต้องรันได้ทั้งใน Server Action (Node) และ middleware (Edge runtime)
// ⚠️ SESSION_SECRET ไม่มี prefix NEXT_PUBLIC_ → อ่านได้เฉพาะฝั่ง server ไม่ถูกฝังลง JS ที่ส่งให้เบราว์เซอร์

async function hmac(value) {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("ยังไม่ได้ตั้ง SESSION_SECRET ใน .env.local")

  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value))
  return Array.from(new Uint8Array(sig), b => b.toString(16).padStart(2, "0")).join("")
}

// "admin@cmu.ac.th" → "admin@cmu.ac.th.<ลายเซ็น>"
export async function createSession(email) {
  return `${email}.${await hmac(email)}`
}

// คืน email ถ้าลายเซ็นถูกต้อง ไม่งั้นคืน null
export async function verifySession(token) {
  if (!token) return null
  const i = token.lastIndexOf(".")
  if (i === -1) return null

  const email = token.slice(0, i)
  const sig = token.slice(i + 1)
  return sig === (await hmac(email)) ? email : null
}
