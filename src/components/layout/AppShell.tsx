import type { ReactNode } from 'react';
import { Sidebar, type PageId } from './Sidebar';
import './layout.css';

interface AppShellProps {
  children: ReactNode;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function AppShell({ children, activePage, onNavigate }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="app-shell__main">{children}</div>
    </div>
  );
}
