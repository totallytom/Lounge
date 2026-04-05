# Project: Lounge - Cozy Social World

## Core Vision
Lounge is a "Third Place" digital environment. It is a hybrid of a cozy pixel-art game and a social platform. 
- **Goal:** Foster intentional connection and self-expression through digital home curation, collaborative quests, and non-verbal communication (stickers/items).
- **Aesthetic:** 16-bit pixel art, cozy atmosphere, warm color palette, and high-contrast, clean UI.

## Economic Model (The Faucet & Sink)
- **Moon (Soft Currency):** Earned through social engagement (journaling, logging in, community quests). Used for common goods and room customization.
- **Star (Premium Currency):** Purchased via microtransactions. Used for exclusive, rare, or artist-collab items.
- **Rule:** Never implement "pay-to-win" mechanics. All economy sinks must be for aesthetic or social expression.

## User Experience Pillars
1. **Spatial Navigation:** The "world" consists of interconnected Rooms. Navigation is handled via "Door" components that transition the user from one database instance to another.
2. **Persistence:** User rooms, sticker collections, and item placements are stored in Supabase and synced in real-time.
3. **Collaboration:** Events and Quests are global. When a quest is updated, it updates for all users in real-time via Supabase Real-time.

## Technical Stack
- **Frontend:** React, Vite, Tailwind CSS.
- **Backend:** Supabase (PostgreSQL + Real-time).
- **State Management:** Zustand.
- **Asset Management:** Supabase Storage (pixelated rendering only).
- **Architecture:** Rule-based development. Always reference `.cursor/rules/` for design and logic constraints.

## Development Principles
1. **Plan First:** Always draft an implementation plan in Markdown before writing code.
2. **Component-First:** Build reusable, atomic UI components (Button, Modal, Card) before page-level layouts.
3. **Consistency:** Enforce the 4px grid system and the 16-bit aesthetic at every level. 
4. **Safety:** All economy-related state changes (e.g., purchasing items, updating balance) must be validated server-side.