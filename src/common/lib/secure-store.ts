import { ENCRYPT_KEY } from "@/common/const/env"
import type { StateStorage } from "zustand/middleware"
import { decrypt, encrypt } from "./crypto"

export const encryptStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const raw = localStorage.getItem(name)
    if (!raw) return null
    return decrypt(raw, ENCRYPT_KEY)
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const raw = encrypt(value, ENCRYPT_KEY)
    return localStorage.setItem(name, raw)
  },
  removeItem: async (name: string): Promise<void> => {
    await localStorage.removeItem(name)
  },
}

export const encryptSessionStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const raw = sessionStorage.getItem(name)
    if (!raw) return null
    return decrypt(raw, ENCRYPT_KEY)
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const raw = encrypt(value, ENCRYPT_KEY)
    return sessionStorage.setItem(name, raw)
  },
  removeItem: async (name: string): Promise<void> => {
    await sessionStorage.removeItem(name)
  },
}
