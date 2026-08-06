import type { ReactNode } from 'react';
import { Sidebar, type PageId } from './Sidebar';
import type { UserRole } from '../../types/auth';
import './layout.css';

interface AppShellProps {
  children: ReactNode;
  role: UserRole;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  
  onSignOut?: () => void;
}

export function AppShell({ children, role, activePage, onNavigate, onSignOut }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar
        role={role}
        activePage={activePage}
        onNavigate={onNavigate}
        onSignOut={onSignOut}
      />
      <div className="app-shell__main">{children}</div>
    </div>
  );
}
