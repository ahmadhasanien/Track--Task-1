import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import './layout.css';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">{children}</div>
    </div>
  );
}
