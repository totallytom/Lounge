import { Link } from 'react-router-dom';
import { PixelButton } from '../components/ui/PixelButton';

/** Entry: high-vibe landing with CTA to enter Lounge. */
export function LandingPage() {
  return (
    <div
      className="page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ marginBottom: 'var(--content-spacing)', fontFamily: 'var(--heading)', color: 'var(--text-h)' }}>
        Lounge
      </h1>
      <p
        style={{
          marginBottom: 'var(--page-padding)',
          color: 'var(--text)',
          textAlign: 'center',
          maxWidth: 'min(320px, 85vw)',
        }}
      >
        Your cozy third place. Curate your room, join quests, and connect.
      </p>
      <Link to="/lounge">
        <PixelButton>Enter Lounge</PixelButton>
      </Link>
    </div>
  );
}
