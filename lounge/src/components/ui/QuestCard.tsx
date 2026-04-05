import type { ReactNode } from 'react';
import { Card } from './Card';
import { PixelButton } from './PixelButton';

export interface QuestCardProps {
  /** Quest description */
  title: string;
  /** Due label (e.g. "@Today 12:00 AM") */
  due?: string;
  /** Called when Complete is clicked */
  onComplete?: () => void;
  /** Optional extra content */
  children?: ReactNode;
}

/** Single quest row: Card with title, due, and Complete button. */
export function QuestCard({ title, due, onComplete, children }: QuestCardProps) {
  return (
    <Card style={{ marginBottom: '8px', padding: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ fontFamily: 'var(--heading)', color: 'var(--text-h)' }}>
          {title}
        </div>
        {due && (
          <div style={{ fontSize: '14px', color: 'var(--text)' }}>
            {due}
          </div>
        )}
        {children}
        {onComplete && (
          <PixelButton onClick={onComplete}>Complete</PixelButton>
        )}
      </div>
    </Card>
  );
}
