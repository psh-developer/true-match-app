import { useEffect } from "react";
import { getThemeSchema } from "../lib/theme";
import { useConfigStore } from "../stores/config";

export function useTheme() {
  const { config } = useConfigStore();

  useEffect(() => {
    const root = window.document.getElementsByTagName("BODY")[0] as HTMLElement;
    root?.style?.setProperty("--radius", `${config.radius}rem`);
  }, [config.radius]);

  useEffect(() => {
    const root = window.document.getElementsByTagName("BODY")[0] as HTMLElement;
    root.classList.remove(...root.classList);
    const theme = getThemeSchema();
    root.classList.add(`${theme}`);
    root.classList.add(`theme-${config.theme}`);
  }, [config.theme, config.mode]);

  return {
    config,
    theme: getThemeSchema(),
  };
}
