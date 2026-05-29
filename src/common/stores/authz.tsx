import { encryptStorage } from "@/common/lib/secure-store"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AuthzState {
  role?: Role
  permissions: string[]
  can: (permission: string | string[]) => boolean
  removeAuthz: () => void
  setAuthz: (data: Role) => void
}

export const useAuthzStore = create<AuthzState>()(
  persist(
    (set, get) => ({
      role: undefined,
      permissions: [],
      setAuthz: (data: Role) => {
        const { permissions, ...role } = data
        const perStrArr = permissions?.map(
          (per) => per.module + "." + per.action
        )
        set(() => ({ role, permissions: perStrArr }))
      },
      removeAuthz: () => set(() => ({ role: undefined, permissions: [] })),
      can: (perform: string | string[]) => {
        const permSet = new Set(get().permissions ?? [])
        if (typeof perform === "string") return permSet.has(perform)
        if (!Array.isArray(perform) || perform.length === 0) return false
        return perform.some((p) => permSet.has(p))
      },
    }),
    {
      name: "auz", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => encryptStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
