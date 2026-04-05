import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PixelButton } from '../components/ui/PixelButton';

const WEATHER_OPTIONS = [
  { id: 'sun', label: 'Sunny', icon: '☀️' },
  { id: 'partly', label: 'Partly cloudy', icon: '⛅' },
  { id: 'cloudy', label: 'Cloudy', icon: '☁️' },
  { id: 'rain', label: 'Rain', icon: '🌧️' },
  { id: 'snow', label: 'Snow', icon: '❄️' },
];

const NOTEBOOK_SPINE_WIDTH = 24;
const RING_SIZE = 12;

export function JournalPage() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState<string>('sun');
  const [memo, setMemo] = useState('');
  const [diary, setDiary] = useState('');
  const [leftImage, setLeftImage] = useState<string | null>(null);
  const [rightImage, setRightImage] = useState<string | null>(null);
  const leftFileRef = useRef<HTMLInputElement>(null);
  const rightFileRef = useRef<HTMLInputElement>(null);

  const handleLeftImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLeftImage(url);
    }
  };

  const handleRightImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRightImage(url);
    }
  };

  const handleDeleteLeftImage = () => {
    if (leftImage) URL.revokeObjectURL(leftImage);
    setLeftImage(null);
  };

  const notebookStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    maxWidth: 'min(900px, 92vw)',
    margin: '0 auto',
    minHeight: 'calc(100vh - 80px)',
    border: '2px dashed var(--border)',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'var(--color-secondary)',
    boxShadow: 'var(--shadow-card)',
    boxSizing: 'border-box',
  };

  const pageStyle: React.CSSProperties = {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    boxSizing: 'border-box',
    minWidth: 0,
  };

  const spineStyle: React.CSSProperties = {
    width: NOTEBOOK_SPINE_WIDTH,
    flexShrink: 0,
    background: 'var(--border)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '80px',
    gap: '24px',
  };

  return (
    <div
      className="page"
      style={{ padding: 'var(--page-padding)' }}
    >
      {/* Vertical nav tabs (notebook-style) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--content-spacing)',
          marginBottom: 'var(--section-gap)',
          flexWrap: 'wrap',
        }}
      >
        <PixelButton onClick={() => navigate('/lounge')}>← Lounge</PixelButton>
        <PixelButton
          style={{ borderColor: 'var(--color-accent)', background: 'var(--color-bg)' }}
          onClick={() => {}}
        >
          Journal
        </PixelButton>
        <PixelButton onClick={() => navigate('/profile/me')}>Profile</PixelButton>
      </div>

      <div style={notebookStyle}>
        {/* Left page: TODAY IS (weather) + MEMO + optional image */}
        <div style={{ ...pageStyle, borderRight: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--heading)', fontSize: '14px', color: 'var(--text-journal)', marginBottom: '4px' }}>
            TODAY IS
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {WEATHER_OPTIONS.map((w) => (
              <button
                key={w.id}
                type="button"
                className="ui-pixel-button"
                title={w.label}
                onClick={() => setWeather(w.id)}
                style={{
                  padding: '4px 8px',
                  border: `2px solid ${weather === w.id ? 'var(--color-accent)' : 'var(--border)'}`,
                  background: weather === w.id ? 'var(--color-bg)' : 'var(--color-secondary)',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                {w.icon}
              </button>
            ))}
          </div>

          {/* pic (upload / delete) above memo, centered */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
              <input
                ref={leftFileRef}
                type="file"
                accept="image/*"
                onChange={handleLeftImageChange}
                style={{ display: 'none' }}
              />
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  border: '2px solid var(--border)',
                  background: 'var(--journal-bg)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {leftImage ? (
                  <img
                    src={leftImage}
                    alt="Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      imageRendering: 'pixelated',
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '24px', color: 'var(--text)' }}>👤</span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <PixelButton onClick={() => leftFileRef.current?.click()}>Upload</PixelButton>
              <PixelButton onClick={handleDeleteLeftImage} style={{ opacity: leftImage ? 1 : 0.6 }} disabled={!leftImage}>
                Delete
              </PixelButton>
            </div>
          </div>

          <div style={{ fontFamily: 'var(--heading)', fontSize: '14px', color: 'var(--text-h)', marginBottom: '4px' }}>
            MEMO
          </div>
          <textarea
            placeholder="Quick notes for the day…"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            style={{
              height: '56px',
              minHeight: '56px',
              padding: '6px 8px',
              border: '2px solid var(--border)',
              background: 'var(--journal-bg)',
              color: 'var(--text-journal)',
              font: 'inherit',
              fontSize: '13px',
              resize: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Spine with rings */}
        <div style={spineStyle}>
          <div style={{ width: RING_SIZE, height: RING_SIZE, borderRadius: '50%', background: 'var(--color-primary)' }} />
          <div style={{ width: RING_SIZE, height: RING_SIZE, borderRadius: '50%', background: 'var(--color-primary)' }} />
          <div style={{ width: RING_SIZE, height: RING_SIZE, borderRadius: '50%', background: 'var(--color-primary)' }} />
        </div>

        {/* Right page: diary entry + image + write / prev-next */}
        <div style={{ ...pageStyle, borderLeft: '1px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--heading)', fontSize: '14px', color: 'var(--text-h)', marginBottom: '4px' }}>
            Diary
          </div>
          <textarea
            placeholder="How was your day? Write your thoughts here…"
            value={diary}
            onChange={(e) => setDiary(e.target.value)}
            style={{
              flex: 1,
              minHeight: '200px',
              padding: '12px',
              border: '2px solid var(--border)',
              background: 'var(--journal-bg)',
              color: 'var(--text-journal)',
              font: 'inherit',
              resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />

          <div style={{ marginTop: '8px' }}>
            <input
              ref={rightFileRef}
              type="file"
              accept="image/*"
              onChange={handleRightImageChange}
              style={{ display: 'none' }}
            />
            <PixelButton onClick={() => rightFileRef.current?.click()} style={{ marginBottom: '8px' }}>
              📷 Add photo
            </PixelButton>
            {rightImage && (
              <div style={{ marginTop: '8px' }}>
                <img
                  src={rightImage}
                  alt="Upload"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '120px',
                    objectFit: 'contain',
                    border: '2px solid var(--border)',
                    imageRendering: 'pixelated',
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <PixelButton onClick={() => {}}>← Previous</PixelButton>
              <PixelButton onClick={() => {}}>Next →</PixelButton>
            </div>
            <PixelButton
              onClick={() => {}}
              style={{ borderColor: 'var(--color-accent)' }}
            >
              ✎ Save entry
            </PixelButton>
          </div>
        </div>
      </div>
    </div>
  );
}
