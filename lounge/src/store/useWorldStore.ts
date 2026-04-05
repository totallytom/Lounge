import { create } from 'zustand';

export interface WorldState {
  currentRoomId: string | null;
  roomTitle: string | null;
}

export interface WorldActions {
  setRoom: (roomId: string | null, title?: string | null) => void;
}

const initialState: WorldState = {
  currentRoomId: null,
  roomTitle: null,
};

export const useWorldStore = create<WorldState & WorldActions>((set) => ({
  ...initialState,
  setRoom: (roomId, title = null) =>
    set({ currentRoomId: roomId, roomTitle: title ?? null }),
}));
