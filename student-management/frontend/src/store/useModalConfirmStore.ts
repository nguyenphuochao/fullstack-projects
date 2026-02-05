import { create } from "zustand";
import type { ModalConfirmState } from "../types/store";

export const useModalConfirmStore = create<ModalConfirmState>((set, get) => ({
    isOpen: false,
    setModalConfirm: (open: boolean) => {
        set({ isOpen: open });
    }
}))