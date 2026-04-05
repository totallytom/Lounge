import { create } from 'zustand';

export interface UserState {
  id: string | null;
  username: string | null;
  moon: number;
  star: number;
  roomLevel: number;
}

export interface UserActions {
  setUser: (user: Partial<UserState> | null) => void;
  setBalances: (moon: number, star: number) => void;
}

const initialState: UserState = {
  id: null,
  username: null,
  moon: 0,
  star: 0,
  roomLevel: 1,
};

export const useUserStore = create<UserState & UserActions>((set) => ({
  ...initialState,
  setUser: (user) =>
    set((state) => (user === null ? initialState : { ...state, ...user })),
  setBalances: (moon, star) => set({ moon, star }),
}));
