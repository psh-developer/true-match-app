import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { encryptStorage } from "../lib/secure-store";

interface TokenState {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set(() => ({ token })),
      removeToken: () => set(() => ({ token: null })),
    }),
    {
      name: "tk", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => encryptStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
