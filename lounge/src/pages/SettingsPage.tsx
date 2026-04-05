import { Card } from '../components/ui/Card';
import { Door } from '../components/world/Door';

/** Account and privacy controls. */
export function SettingsPage() {
  return (
    <div className="page">
      <div style={{ marginBottom: 'var(--section-gap)' }}>
        <Door to="/lounge" label="← Back to Lounge" />
      </div>
      <Card style={{ maxWidth: 'min(400px, 90vw)' }}>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--heading)', color: 'var(--text-h)' }}>
          Settings
        </h1>
        <p style={{ margin: '0 0 16px', color: 'var(--text)' }}>
          Account management and privacy controls will go here.
        </p>
      </Card>
    </div>
  );
}
