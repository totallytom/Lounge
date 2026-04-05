import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ShoppingBag, Package } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useUIStore } from '../store/useUIStore';
import { HUD } from '../components/ui/HUD';
import { WindowFrame } from '../components/ui/WindowFrame';
import { Modal } from '../components/ui/Modal';
import { QuestCard } from '../components/ui/QuestCard';
import { ActionList } from '../components/ui/ActionList';
import { Room, RoomCanvas, getFirstFreeCell } from '../components/world';
import type { RoomAvatar } from '../components/world';
import { DiscoveryManager } from '../features/discovery';

const ICON_SIZE = 18;

/** Stub quests for layout reference. */
const STUB_QUESTS = [
  { id: '1', title: 'Log in today', due: '@Today 12:00 AM' },
  { id: '2', title: 'Add something to your room', due: '@Today' },
  { id: '3', title: 'Send a sticker to a friend', due: '@This week' },
];

const GRID_W = 16;
const GRID_H = 16;

/** Main world: window frame, HUD, Quests sidebar, room (RoomCanvas) + Discovery + Home Records list. */
export function LoungePage() {
  const navigate = useNavigate();
  const { moon, star } = useUserStore();
  const { modal, openModal, closeModal, hudVisible } = useUIStore();
  const [roomAvatars, setRoomAvatars] = useState<RoomAvatar[]>([]);
  const [roomItems] = useState<{ id: string; assetKey: string; x: number; y: number }[]>([]);

  /** Handshake: when DiscoveryManager confirms a match, inject that user as an avatar into RoomCanvas. */
  const handleInjectAvatar = useCallback(
    (userId: string, displayName: string, avatarKey?: string) => {
      setRoomAvatars((prev) => {
        const occupied = new Set([
          ...prev.map((a) => `${a.x},${a.y}`),
          ...roomItems.map((i) => `${i.x},${i.y}`),
        ]);
        const pos = getFirstFreeCell(occupied, GRID_W, GRID_H);
        if (!pos) return prev;
        return [...prev, { id: userId, displayName, x: pos.x, y: pos.y, avatarKey }];
      });
    },
    [roomItems]
  );

  const actionItems = [
    { id: 'journal', label: 'Journal', icon: <BookOpen size={ICON_SIZE} strokeWidth={2} />, onClick: () => navigate('/journal') },
    { id: 'shop', label: 'Shop', icon: <ShoppingBag size={ICON_SIZE} strokeWidth={2} />, onClick: () => openModal('shop') },
    { id: 'inventory', label: 'Inventory', icon: <Package size={ICON_SIZE} strokeWidth={2} />, onClick: () => openModal('inventory') },
  ];

  return (
    <div
      className="page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
      }}
    >
      {hudVisible && (
        <HUD
          moon={moon}
          star={star}
          onCheckIn={() => {}}
          onSettings={() => navigate('/settings')}
        />
      )}
      <div
        style={{
          flex: 1,
          display: 'flex',
          padding: 'var(--page-padding)',
          gap: 'var(--section-gap)',
          flexWrap: 'wrap',
          boxSizing: 'border-box',
        }}
      >
        <aside
          style={{
            width: 'clamp(200px, 22vw, 280px)',
            minWidth: '200px',
            flexShrink: 0,
          }}
        >
          <WindowFrame title="Quests">
            {STUB_QUESTS.map((q) => (
              <QuestCard
                key={q.id}
                title={q.title}
                due={q.due}
                onComplete={() => {}}
              />
            ))}
          </WindowFrame>
        </aside>
        <main
          style={{
            flex: 1,
            minWidth: '240px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--section-gap)',
          }}
        >
          <WindowFrame title="Lounge">
            <div
              style={{
                display: 'flex',
                gap: 'var(--section-gap)',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  flex: '1 1 min(200px, 100%)',
                  minWidth: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Room title="My Room">
                  <RoomCanvas
                    gridW={GRID_W}
                    gridH={GRID_H}
                    avatars={roomAvatars}
                    items={roomItems}
                  />
                </Room>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--section-gap)',
                  flexShrink: 0,
                }}
              >
                <DiscoveryManager onInjectAvatar={handleInjectAvatar} />
                <ActionList heading="Home Records" items={actionItems} />
              </div>
            </div>
          </WindowFrame>
        </main>
      </div>

      {modal === 'shop' && (
        <Modal title="Shop" onClose={closeModal}>
          <p style={{ color: 'var(--text)' }}>Shop content — Moon & Star items.</p>
        </Modal>
      )}
      {modal === 'inventory' && (
        <Modal title="Inventory" onClose={closeModal}>
          <p style={{ color: 'var(--text)' }}>Your stickers and items.</p>
        </Modal>
      )}
    </div>
  );
}
