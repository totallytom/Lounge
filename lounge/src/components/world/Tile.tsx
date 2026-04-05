import { memo } from 'react';

export interface TileProps {
  /** 0-based grid x */
  x: number;
  /** 0-based grid y */
  y: number;
  /** Tile size in px (default 24 for 16x16 grid fit) */
  size?: number;
  /** Optional: tile variant for future sprite swap (e.g. 'floor', 'rug') */
  variant?: string;
  /** Optional class */
  className?: string;
}

/**
 * Single grid tile. Memoized for performance in 16x16 grid.
 * Swap variant/styles later for final sprites.
 */
function TileComponent({ x, y, size = 24, variant = 'floor', className = '' }: TileProps) {
  return (
    <div
      className={className}
      data-tile
      data-x={x}
      data-y={y}
      data-variant={variant}
      style={{
        position: 'absolute',
        left: x * size,
        top: y * size,
        width: size,
        height: size,
        boxSizing: 'border-box',
        background: variant === 'floor' ? 'var(--code-bg)' : 'var(--border)',
        border: '1px solid var(--border)',
        imageRendering: 'pixelated',
      }}
    />
  );
}

export const Tile = memo(TileComponent);
