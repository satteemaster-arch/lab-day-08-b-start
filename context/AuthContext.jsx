"use client"
// 🔗 ต่อจาก AuthContext วันที่ 5 — แต่ตอนนี้ user ไม่ได้มาจาก localStorage แล้ว
// layout.jsx (Server) อ่าน cookie `session` แล้วส่งเข้ามาเป็น initialUser
// (cookie เป็น httpOnly — JS ฝั่งเบราว์เซอร์อ่านเองไม่ได้ ต้องให้ server อ่านให้)
import { createContext, useContext } from 'react'

const AuthContext = createContext({ user: null })

export function AuthProvider({ initialUser, children }) {
  return <AuthContext.Provider value={{ user: initialUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
