import { useNavigate } from 'react-router-dom';
import { PixelButton } from '../ui/PixelButton';

export interface DoorProps {
  /** Route or path to navigate to (e.g. /profile/username or /lounge) */
  to: string;
  /** Button label */
  label: string;
}

/** Navigates to another room/route. Later can clear world state via NavigationManager. */
export function Door({ to, label }: DoorProps) {
  const navigate = useNavigate();
  return <PixelButton onClick={() => navigate(to)}>{label}</PixelButton>;
}
