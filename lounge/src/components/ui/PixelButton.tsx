import type { ButtonHTMLAttributes, ReactNode } from 'react';

/** Cozy Pixel design: solid border, 4px-grid padding, hover = accent border. */
export function PixelButton({
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={`ui-pixel-button ${className}`.trim()}
      style={{
        padding: '8px 16px',
        border: '2px solid var(--color-primary)',
        background: 'var(--color-secondary)',
        color: 'var(--text-h)',
        font: 'inherit',
        cursor: 'pointer',
        boxSizing: 'border-box',
      }}
      {...props}
    />
  );
}
