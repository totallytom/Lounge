import type { ReactNode } from 'react';

export interface WindowFrameProps {
  /** Title in the title bar */
  title: string;
  /** Main content inside the frame */
  children: ReactNode;
  /** Optional class for the outer wrapper */
  className?: string;
  /** Optional window controls (minimize, close); decorative or functional */
  onClose?: () => void;
}

/** Pixel-style window: rounded rect, title bar, optional controls. */
export function WindowFrame({ title, children, className = '', onClose }: WindowFrameProps) {
  return (
    <div
      className={className}
      style={{
        border: '2px solid var(--color-primary)',
        borderRadius: '8px',
        overflow: 'hidden',
        background: 'var(--color-secondary)',
        boxShadow: 'var(--shadow-card)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          padding: '8px 12px',
          borderBottom: '2px solid var(--border)',
          background: 'var(--color-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <span style={{ fontFamily: 'var(--heading)', fontWeight: 600, color: 'var(--text-h)', fontSize: '16px' }}>
          {title}
        </span>
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            className="ui-pixel-button"
            style={{ padding: '4px 8px' }}
            onClick={onClose}
          >
            ✕
          </button>
        )}
      </div>
      <div style={{ padding: 'var(--content-spacing)', boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  );
}
