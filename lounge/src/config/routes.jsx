/**
 * App Shell routes — aligned with .cursor/002-architecture.mdc "Essential Pages".
 * Single source of truth for route → page mapping.
 */
import { LandingPage } from '../pages/LandingPage';
import { LoungePage } from '../pages/LoungePage';
import { JournalPage } from '../pages/JournalPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';

/** path, element, and architecture label for each route */
export const ROUTES = [
  { path: '/', element: <LandingPage />, label: 'Landing/Login' },
  { path: '/lounge', element: <LoungePage />, label: 'Main World' },
  { path: '/journal', element: <JournalPage />, label: 'Journal' },
  { path: '/profile/:username', element: <ProfilePage />, label: 'Digital Home' },
  { path: '/settings', element: <SettingsPage />, label: 'Settings' },
];
