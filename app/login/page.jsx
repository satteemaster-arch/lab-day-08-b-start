"use client"
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { login } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="bg-blue-600 text-white py-2 rounded disabled:opacity-50">
      {pending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
    </button>
  )
}

export default function LoginPage() {
  // ถ้า login ผ่าน action จะ redirect ไป /dashboard · ถ้าไม่ผ่านจะ return { error } กลับมาเป็น state
  const [state, formAction] = useActionState(login, { error: null })

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h1>
      <form action={formAction} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="อีเมล" required className="border p-2 rounded" />
        <input name="password" type="password" placeholder="รหัสผ่าน" required className="border p-2 rounded" />
        <SubmitButton />
        {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
      </form>
    </div>
  )
}
