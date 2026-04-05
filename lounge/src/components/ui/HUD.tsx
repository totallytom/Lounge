import type { ReactNode } from 'react';
import { PixelButton } from './PixelButton';

export interface HUDProps {
  /** Moon balance (soft currency) */
  moon: number;
  /** Star balance (premium currency) */
  star: number;
  /** Callback for primary action (e.g. Check-in) */
  onCheckIn?: () => void;
  /** Callback to open settings (top-left) */
  onSettings?: () => void;
  /** Optional right-side content (e.g. extra stats) */
  rightSlot?: ReactNode;
}

/** Rule of Corners: Settings top-left, Moon/Star + Check-in top-right. 4px grid. */
export function HUD({ moon, star, onCheckIn, onSettings, rightSlot }: HUDProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px var(--content-spacing)',
        gap: 'var(--content-spacing)',
        borderBottom: '2px solid var(--border)',
        background: 'var(--color-secondary)',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {onSettings && (
          <PixelButton onClick={onSettings}>Settings</PixelButton>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {onCheckIn && (
          <PixelButton onClick={onCheckIn}>Check in</PixelButton>
        )}
        <span style={{ padding: '4px 8px', border: '2px solid var(--border)', background: 'var(--color-bg)', fontFamily: 'var(--mono)' }}>
          🌙 {moon}
        </span>
        <span style={{ padding: '4px 8px', border: '2px solid var(--border)', background: 'var(--color-bg)', fontFamily: 'var(--mono)' }}>
          ⭐ {star}
        </span>
        {rightSlot}
      </div>
    </header>
  );
}
