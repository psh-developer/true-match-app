import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Config {
  theme?: string;
  radius?: number;
  mode: "dark" | "light" | "system";
  navigationMode: "top-menu" | "side-menu";
  variant: "sidebar" | "floating" | "inset";
  collapsible: "offExamples" | "icon" | "none";
}

interface ConfigState {
  config: Config;
  setConfig: (ticket: Config) => void;
  removeConfig: () => void;
  resetConfig: () => void;
}

const defaultConfig = {
  mode: "light",
  theme: "default",
  radius: 0.5,
  variant: "sidebar",
  collapsible: "icon",
  navigationMode: "side-menu",
} as Config;

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      resetConfig: () => set(() => ({ config: defaultConfig })),
      setConfig: (val) => set(() => ({ config: val })),
      removeConfig: () => set(() => ({ config: undefined })),
    }),
    {
      name: "config", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
