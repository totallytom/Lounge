import type { ReactNode } from 'react';

export interface RoomProps {
  /** Room title or identifier */
  title?: string;
  /** Content to render inside the room (scene, items, etc.) */
  children?: ReactNode;
  /** Optional class */
  className?: string;
}

/** Placeholder for the active room scene. Real implementation will render room data from useWorldStore + Supabase. */
export function Room({ title, children, className = '' }: RoomProps) {
  return (
    <div
      className={className}
      style={{
        minHeight: 'clamp(320px, 35vh, 480px)',
        padding: 'var(--content-spacing)',
        border: '2px solid var(--border)',
        background: 'var(--color-bg)',
        boxSizing: 'border-box',
      }}
    >
      {title && (
        <div style={{ marginBottom: '8px', fontFamily: 'var(--heading)', color: 'var(--text-h)' }}>
          {title}
        </div>
      )}
      {children ?? (
        <div style={{ color: 'var(--text)', fontSize: '14px' }}>
          Your room scene will appear here.
        </div>
      )}
    </div>
  );
}
