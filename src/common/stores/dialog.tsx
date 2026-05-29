import { create } from "zustand";

interface Option {
  title: string;
  subtitle?: string;
  content: string | React.ReactNode;
  actions?: string | React.ReactNode;
  className?: string;
}

interface DialogState {
  open: boolean;
  option: Option | undefined;
  closeDialog: () => void;
  openDialog: (option: Option) => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  option: undefined,
  openDialog: (option: Option) => set({ option, open: true }),
  closeDialog: () => set({ option: undefined, open: false }),
}));
