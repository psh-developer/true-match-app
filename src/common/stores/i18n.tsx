import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface LanguageState {
  lang: "en" | "my" | undefined
  setLang: (lang: "en" | "my") => void
  removeLang: () => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: undefined,
      setLang: (val) => set(() => ({ lang: val })),
      removeLang: () => set(() => ({ lang: undefined })),
    }),
    {
      name: "i18n", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
