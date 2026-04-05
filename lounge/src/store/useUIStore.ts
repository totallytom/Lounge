import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ModalId = 'shop' | 'journal' | 'inventory' | null;

export interface UIState {
  modal: ModalId;
  hudVisible: boolean;
}

export interface UIActions {
  openModal: (id: ModalId) => void;
  closeModal: () => void;
  setHudVisible: (visible: boolean) => void;
}

const initialUI: UIState = {
  modal: null,
  hudVisible: true,
};

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      ...initialUI,
      openModal: (id) => set({ modal: id }),
      closeModal: () => set({ modal: null }),
      setHudVisible: (visible) => set({ hudVisible: visible }),
    }),
    { name: 'lounge-ui', partialize: (s) => ({ hudVisible: s.hudVisible }) }
  )
);
