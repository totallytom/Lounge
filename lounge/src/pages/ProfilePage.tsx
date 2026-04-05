import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Door } from '../components/world/Door';
import { Room } from '../components/world/Room';

/** Public view of a user's room (digital home). */
export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const displayName = username ?? 'unknown';

  return (
    <div className="page">
      <div
        style={{
          marginBottom: 'var(--section-gap)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--content-spacing)',
          flexWrap: 'wrap',
        }}
      >
        <Door to="/lounge" label="← Back to Lounge" />
      </div>
      <Card style={{ marginBottom: 'var(--section-gap)' }}>
        <h1 style={{ margin: '0 0 8px', fontFamily: 'var(--heading)', color: 'var(--text-h)' }}>
          {displayName}'s Room
        </h1>
        <p style={{ margin: 0, color: 'var(--text)' }}>
          Public digital home. Room data will load from Supabase.
        </p>
      </Card>
      <Room title={`${displayName}'s space`} />
    </div>
  );
}
