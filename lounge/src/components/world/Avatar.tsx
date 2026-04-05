import { memo } from 'react';

export interface RoomAvatar {
  id: string;
  displayName: string;
  /** Grid position (0-based) */
  x: number;
  y: number;
  /** Optional sprite/asset key for future swap */
  avatarKey?: string;
}

export interface AvatarProps {
  avatar: RoomAvatar;
  /** Tile size in px; avatar is rendered at tile position */
  tileSize?: number;
  /** Optional class */
  className?: string;
}

/**
 * Avatar representing a user (e.g. discovered via StreetPass). Memoized for performance.
 * Placeholder visual; swap for final sprite via avatarKey later.
 */
function AvatarComponent({ avatar, tileSize = 24, className = '' }: AvatarProps) {
  const size = Math.round(tileSize * 0.9);
  const offset = (tileSize - size) / 2;

  return (
    <div
      className={className}
      data-avatar
      data-avatar-id={avatar.id}
      title={avatar.displayName}
      style={{
        position: 'absolute',
        left: avatar.x * tileSize + offset,
        top: avatar.y * tileSize + offset,
        width: size,
        height: size,
        borderRadius: 4,
        background: 'var(--accent)',
        border: '2px solid var(--accent-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        color: 'var(--bg)',
        overflow: 'hidden',
        imageRendering: 'pixelated',
      }}
    >
      {avatar.displayName.slice(0, 1).toUpperCase()}
    </div>
  );
}

export const Avatar = memo(AvatarComponent);
