import type { HTMLAttributes, ReactNode } from 'react';

/** Cozy Pixel design: 4px grid padding, solid border, hard shadow (elevation level 2). */
export function Card({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={className}
      style={{
        padding: 'var(--content-spacing)',
        border: '2px solid var(--border)',
        background: 'var(--color-secondary)',
        boxShadow: 'var(--shadow-card)',
        boxSizing: 'border-box',
      }}
      {...props}
    />
  );
}
