import type { ReactNode } from 'react';
import { useEffect } from 'react';

export interface ModalProps {
  /** Modal content */
  children: ReactNode;
  /** Called when backdrop is clicked or close is requested */
  onClose: () => void;
  /** Optional title shown in the modal header */
  title?: string;
  /** Optional extra class for the content box */
  className?: string;
}

/** Cozy Pixel modal: elevation 3, centered, hard border/shadow. Modal-first for Shop/Journal. */
export function Modal({ children, onClose, title, className = '' }: ModalProps) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(0,0,0,0.4)',
        boxSizing: 'border-box',
        zIndex: 1000,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={className}
        style={{
          padding: 'var(--page-padding)',
          border: '2px solid var(--color-primary)',
          background: 'var(--color-secondary)',
          boxShadow: '4px 4px 0 var(--border)',
          maxWidth: 'min(420px, 90vw)',
          boxSizing: 'border-box',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: title ? '16px' : 0, gap: '8px' }}>
          {title && (
            <h2 style={{ margin: 0, fontFamily: 'var(--heading)', color: 'var(--text-h)', fontSize: '20px' }}>
              {title}
            </h2>
          )}
          <button
            type="button"
            aria-label="Close"
            className="ui-pixel-button"
            style={{ marginLeft: 'auto', padding: '4px 8px' }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
