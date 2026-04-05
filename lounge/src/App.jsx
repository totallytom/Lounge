import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';

/**
 * App shell — connects to .cursor/002-architecture.mdc:
 * - Routes: / (Landing), /lounge (Main World), /profile/:username (Digital Home), /settings
 * - Navigation between rooms uses Door component; state lives in Zustand (useUserStore, useWorldStore, useUIStore)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
