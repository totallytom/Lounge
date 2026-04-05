# Lounge: Architecture, Pages & Components — Implementation Plan

Reference: Gamified Life RPG UI (window frame, stats bar, quests sidebar, main scene), `002-architecture.mdc`, `Instructions.md`, Cozy Pixel design system.

---

## 1. Architecture

### Routes (App Shell)
| Route | Purpose |
|-------|---------|
| `/` | Landing / Login — high-vibe entry |
| `/lounge` | Main World — active room, HUD, Quests sidebar, scene + actions |
| `/profile/:username` | Digital Home — public view of a user's room |
| `/settings` | Account & privacy |

### State (Zustand)
- **useUserStore** — auth, profile, `moon` / `star` balances (display only; updates via Supabase).
- **useWorldStore** — current room id, room data; sync via Supabase Realtime later.
- **useUIStore** — open modal (e.g. `'shop' | 'journal' | null`), HUD visibility; persist UI prefs to localStorage only.

### File Layout
- `src/components/ui/` — PixelButton, Card, Modal, WindowFrame, HUD (stats/corners).
- `src/components/world/` — Room, Door (navigation) — stubs for now.
- `src/pages/` — LandingPage, LoungePage, ProfilePage, SettingsPage.
- `src/store/` — useUserStore, useWorldStore, useUIStore.
- `src/hooks/` — (future) useRoomManager, data-fetching; logic stays out of UI.

### Design Rules Applied
- **Rule of Corners:** Moon/Stars top-right, Settings top-left on `/lounge`.
- **Modal-first:** Shop, Journal, etc. open in a centered Modal (elevation 3).
- **4px grid:** All spacing in multiples of 4.
- **Hard shadows:** No blur; solid borders and 2px-offset shadow for cards/modals.

---

## 2. Pages

1. **LandingPage** — Hero + entry CTA; minimal layout.
2. **LoungePage** — Main view:
   - **WindowFrame** (optional): title "Lounge", window controls (decorative or minimize/close).
   - **HUD** top bar or corners: Check-in (primary action), Moon, Star; Settings top-left.
   - **Left sidebar:** "Quests" banner + list of QuestCard (title, due, Complete button).
   - **Main area:** Room/scene placeholder + "Home Records"–style list (Cook, Journal, Shop, etc.) as PixelButtons with icons.
3. **ProfilePage** — Public room for `:username`; placeholder content.
4. **SettingsPage** — Account/privacy placeholder.

---

## 3. Components

### UI (atomic)
- **PixelButton** — already exists; extend usage (icon + label where needed).
- **Card** — already exists; use for quest items, list containers.
- **Modal** — centered overlay, elevation 3, hard border/shadow; children = content; onClose.
- **WindowFrame** — rounded rect container, title bar, optional controls (pixel style).
- **HUD** — corner layout: left = Settings; right = Moon, Star, optional Check-in.

### World (stubs)
- **Room** — placeholder div for room/scene.
- **Door** — link/button that navigates to another room (route or world id); used later with NavigationManager.

### Page-specific
- **QuestCard** — Card + title, due text, PixelButton "Complete".
- **ActionList** — List of icon + label PixelButtons (e.g. Cook, Journal, Shop).

---

## 4. Implementation Order

1. Add deps: `react-router-dom`, `zustand`.
2. Create stores (useUserStore, useWorldStore, useUIStore) with typed state and actions.
3. Add Modal.tsx, then WindowFrame, then HUD.
4. Create LandingPage, LoungePage, ProfilePage, SettingsPage.
5. Wire Router in App, layout with WindowFrame on LoungePage.
6. (Optional) Add a simple hook that reads user/world from stores so pages stay presentational.

---

## 5. Out of Scope (This Pass)

- Supabase client and RLS (stub data only).
- Real-time subscriptions and optimistic Moon/Star updates.
- Actual Door/NavigationManager logic (links only).
- Pixel-art assets and image-rendering (structure only).
