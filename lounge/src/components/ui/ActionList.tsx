import type { ReactNode } from 'react';
import { PixelButton } from './PixelButton';

export interface ActionItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
}

export interface ActionListProps {
  /** Heading above the list (e.g. "Home Records") */
  heading: string;
  /** List of icon + label actions */
  items: ActionItem[];
}

/** Home Records–style list: heading + icon+label PixelButtons. */
export function ActionList({ heading, items }: ActionListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h3
        style={{
          margin: '0 0 8px',
          fontFamily: 'var(--heading)',
          color: 'var(--text-h)',
          fontSize: '16px',
        }}
      >
        {heading}
      </h3>
      {items.map(({ id, label, icon, onClick }) => (
        <PixelButton key={id} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon}
          <span>{label}</span>
        </PixelButton>
      ))}
    </div>
  );
}
