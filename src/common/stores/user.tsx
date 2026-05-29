import { encryptStorage } from "@/common/lib/secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user?: Profile;
  setUser: (user?: Profile) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set(() => ({ user })),
      removeUser: () => set(() => ({ user: undefined })),
    }),
    {
      name: "usr", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => encryptStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
