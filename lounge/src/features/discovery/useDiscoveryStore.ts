import { create } from 'zustand';

/** StreetPass Discovery lifecycle states */
export type DiscoveryStatus = 'idle' | 'scanning' | 'matched' | 'exchanged';

/** Minimal user info for a discovered/match result (swap for real profile later) */
export interface DiscoveredUser {
  id: string;
  displayName: string;
  /** Optional: avatar sprite key for future asset swap */
  avatarKey?: string;
}

export interface DiscoveryState {
  status: DiscoveryStatus;
  /** Set when status is 'matched' or 'exchanged' */
  matchedUser: DiscoveredUser | null;
  /** Optional error message for UI */
  error: string | null;
}

export interface DiscoveryActions {
  setStatus: (status: DiscoveryStatus) => void;
  setMatchedUser: (user: DiscoveredUser | null) => void;
  setError: (error: string | null) => void;
  /** Transition: start scanning (placeholder for real BLE/nearby logic) */
  startScanning: () => void;
  /** Transition: found a match */
  setMatched: (user: DiscoveredUser) => void;
  /** Transition: user confirmed exchange; can then inject avatar into room */
  confirmExchanged: () => void;
  /** Reset to idle and clear match */
  reset: () => void;
}

const initialState: DiscoveryState = {
  status: 'idle',
  matchedUser: null,
  error: null,
};

export const useDiscoveryStore = create<DiscoveryState & DiscoveryActions>((set) => ({
  ...initialState,
  setStatus: (status) => set({ status }),
  setMatchedUser: (matchedUser) => set({ matchedUser }),
  setError: (error) => set({ error }),
  startScanning: () => set({ status: 'scanning', error: null, matchedUser: null }),
  setMatched: (user) => set({ status: 'matched', matchedUser: user, error: null }),
  confirmExchanged: () => set((s) => ({ status: 'exchanged', matchedUser: s.matchedUser })),
  reset: () => set({ ...initialState }),
}));
