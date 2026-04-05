import { useCallback, useMemo, useState } from 'react';
import { Tile } from './Tile';
import { Avatar, type RoomAvatar } from './Avatar';

export interface PlacedItem {
  id: string;
  /** Asset/furniture key for future sprite swap */
  assetKey: string;
  x: number;
  y: number;
}

export interface RoomCanvasProps {
  /** Grid width (default 16) */
  gridW?: number;
  /** Grid height (default 16) */
  gridH?: number;
  /** Tile size in px */
  tileSize?: number;
  /** Initial avatars (discovered users). Controlled from parent when using handshake. */
  avatars?: RoomAvatar[];
  /** Initial placed furniture. Controlled from parent if needed. */
  items?: PlacedItem[];
  /** Optional: uncontrolled mode – pass initial state and get updates via onAvatarsChange (e.g. from DiscoveryManager handshake) */
  onAvatarsChange?: (avatars: RoomAvatar[]) => void;
  /** Optional class for the canvas container */
  className?: string;
}

const GRID_W = 16;
const GRID_H = 16;
const TILE_SIZE = 24;

/**
 * Room canvas: 16x16 grid with tiles, placed items (furniture), and avatars (discovered users).
 * Supports the Discovery handshake: parent can add avatars (e.g. when DiscoveryManager triggers onInjectAvatar).
 * Tile and Avatar are memoized for performance.
 */
export function RoomCanvas({
  gridW = GRID_W,
  gridH = GRID_H,
  tileSize = TILE_SIZE,
  avatars: controlledAvatars,
  items: controlledItems,
  onAvatarsChange,
  className = '',
}: RoomCanvasProps) {
  const [localAvatars, setLocalAvatars] = useState<RoomAvatar[]>([]);
  const [localItems, setLocalItems] = useState<PlacedItem[]>([]);

  const avatars = controlledAvatars ?? localAvatars;
  const setAvatars = useCallback(
    (updater: RoomAvatar[] | ((prev: RoomAvatar[]) => RoomAvatar[])) => {
      const next = typeof updater === 'function' ? updater(controlledAvatars ?? localAvatars) : updater;
      if (controlledAvatars === undefined) setLocalAvatars(next);
      onAvatarsChange?.(next);
    },
    [controlledAvatars, localAvatars, onAvatarsChange]
  );

  const items = controlledItems ?? localItems;
  const setItems = useCallback(
    (updater: PlacedItem[] | ((prev: PlacedItem[]) => PlacedItem[])) => {
      if (controlledItems === undefined) {
        setLocalItems((prev) => (typeof updater === 'function' ? updater(prev) : updater));
      }
    },
    [controlledItems]
  );

  /** Public API for the handshake: inject a discovered user as an avatar. Finds first free cell. */
  const injectAvatar = useCallback(
    (userId: string, displayName: string, avatarKey?: string) => {
      const occupied = new Set(
        [...avatars.map((a) => `${a.x},${a.y}`), ...items.map((i) => `${i.x},${i.y}`)]
      );
      for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
          const key = `${x},${y}`;
          if (!occupied.has(key)) {
            setAvatars((prev) => [
              ...prev,
              { id: userId, displayName, x, y, avatarKey },
            ]);
            return;
          }
        }
      }
    },
    [avatars, items, gridW, gridH, setAvatars]
  );

  const tiles = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
        out.push({ x, y });
      }
    }
    return out;
  }, [gridW, gridH]);

  const width = gridW * tileSize;
  const height = gridH * tileSize;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        flexShrink: 0,
        border: '2px solid var(--border)',
        background: 'var(--color-bg)',
        boxSizing: 'border-box',
      }}
    >
      {tiles.map(({ x, y }) => (
        <Tile key={`${x}-${y}`} x={x} y={y} size={tileSize} />
      ))}
      {items.map((item) => (
        <div
          key={item.id}
          data-item
          data-asset={item.assetKey}
          style={{
            position: 'absolute',
            left: item.x * tileSize,
            top: item.y * tileSize,
            width: tileSize,
            height: tileSize,
            background: 'var(--color-primary)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            imageRendering: 'pixelated',
          }}
        />
      ))}
      {avatars.map((avatar) => (
        <Avatar key={avatar.id} avatar={avatar} tileSize={tileSize} />
      ))}
      {/* Expose injectAvatar to parent via data attribute / ref would require forwardRef; parent will use callback instead */}
    </div>
  );
}

/** Type for the handshake: parent receives this to inject avatars from DiscoveryManager */
export type InjectAvatarFn = (userId: string, displayName: string, avatarKey?: string) => void;

/** Helper for handshake: find first free cell given occupied set (e.g. "x,y" strings). */
export function getFirstFreeCell(
  occupied: Set<string>,
  gridW: number,
  gridH: number
): { x: number; y: number } | null {
  for (let y = 0; y < gridH; y++) {
    for (let x = 0; x < gridW; x++) {
      if (!occupied.has(`${x},${y}`)) return { x, y };
    }
  }
  return null;
}
