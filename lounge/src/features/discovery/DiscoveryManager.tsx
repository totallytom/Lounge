import type { ReactNode } from 'react';
import { useDiscoveryStore } from './useDiscoveryStore';

export interface DiscoveryManagerProps {
  /** Called when user confirms the match; parent can inject avatar into RoomCanvas */
  onInjectAvatar?: (userId: string, displayName: string, avatarKey?: string) => void;
  /** Optional override for labels (modular swap for i18n or final copy) */
  labels?: {
    idle?: string;
    scanning?: string;
    matched?: string;
    exchanged?: string;
    buttonScan?: string;
    buttonAddToRoom?: string;
    buttonDone?: string;
  };
  /** Optional class for the container */
  className?: string;
  /** Optional slot for custom content per state */
  children?: ReactNode;
}

const DEFAULT_LABELS = {
  idle: 'StreetPass Discovery',
  scanning: 'Scanning for nearby users...',
  matched: 'Someone nearby!',
  exchanged: 'Exchanged — they\'re in your room!',
  buttonScan: 'Scan',
  buttonAddToRoom: 'Add to room',
  buttonDone: 'Done',
};

/**
 * Presentational placeholder for StreetPass Discovery.
 * Renders UI based on discovery state (idle | scanning | matched | exchanged).
 * Triggers onInjectAvatar when user confirms a match so parent can add avatar to RoomCanvas.
 */
export function DiscoveryManager({
  onInjectAvatar,
  labels: customLabels,
  className = '',
  children,
}: DiscoveryManagerProps) {
  const { status, matchedUser, startScanning, setMatched, confirmExchanged, reset } =
    useDiscoveryStore();
  const labels = { ...DEFAULT_LABELS, ...customLabels };

  const handleAddToRoom = () => {
    if (matchedUser) {
      onInjectAvatar?.(matchedUser.id, matchedUser.displayName, matchedUser.avatarKey);
      confirmExchanged();
    }
  };

  // Placeholder: simulate a match for demo (remove when real discovery is wired)
  const handleSimulateMatch = () => {
    setMatched({
      id: 'demo-user-1',
      displayName: 'Nearby Friend',
      avatarKey: 'placeholder',
    });
  };

  return (
    <div
      className={className}
      style={{
        padding: 'var(--content-spacing)',
        border: '2px solid var(--border)',
        background: 'var(--color-bg)',
        borderRadius: 4,
        minWidth: 160,
      }}
    >
      {children}
      <div style={{ fontFamily: 'var(--heading)', color: 'var(--text-h)', marginBottom: 8 }}>
        {labels.idle}
      </div>
      {status === 'idle' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Ready to discover.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="ui-pixel-button"
              style={{
                padding: '6px 12px',
                border: '2px solid var(--border)',
                borderRadius: 4,
                background: 'var(--bg)',
                cursor: 'pointer',
                font: 'inherit',
              }}
              onClick={startScanning}
            >
              {labels.buttonScan}
            </button>
            <button
              type="button"
              style={{
                padding: '6px 12px',
                border: '1px solid var(--border)',
                borderRadius: 4,
                background: 'var(--code-bg)',
                cursor: 'pointer',
                font: 'inherit',
                fontSize: 12,
              }}
              onClick={handleSimulateMatch}
            >
              (Simulate match)
            </button>
          </div>
        </>
      )}
      {status === 'scanning' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--text)' }}>{labels.scanning}</p>
          <div
            style={{
              width: 24,
              height: 24,
              border: '2px solid var(--accent)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              marginTop: 8,
            }}
          />
        </>
      )}
      {status === 'matched' && matchedUser && (
        <>
          <p style={{ fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>{labels.matched}</p>
          <p style={{ fontSize: 13, color: 'var(--text-h)', marginBottom: 8 }}>
            {matchedUser.displayName}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="ui-pixel-button"
              style={{
                padding: '6px 12px',
                border: '2px solid var(--border)',
                borderRadius: 4,
                background: 'var(--bg)',
                cursor: 'pointer',
                font: 'inherit',
              }}
              onClick={handleAddToRoom}
            >
              {labels.buttonAddToRoom}
            </button>
            <button
              type="button"
              style={{
                padding: '6px 12px',
                border: '1px solid var(--border)',
                borderRadius: 4,
                background: 'transparent',
                cursor: 'pointer',
                font: 'inherit',
              }}
              onClick={reset}
            >
              Skip
            </button>
          </div>
        </>
      )}
      {status === 'exchanged' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--text)' }}>{labels.exchanged}</p>
          <button
            type="button"
            style={{
              padding: '6px 12px',
              border: '1px solid var(--border)',
              borderRadius: 4,
              marginTop: 8,
              cursor: 'pointer',
              font: 'inherit',
            }}
            onClick={reset}
          >
            {labels.buttonDone}
          </button>
        </>
      )}
    </div>
  );
}
