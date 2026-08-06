import { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { Header } from './components/layout/Header';
import type { PageId } from './components/layout/Sidebar';
import { TenantsPage } from './components/tenants/TenantsPage';
import { AuditLogPage } from './components/audit/AuditLogPage';
import { SubscriptionsPage } from './components/subscriptions/SubscriptionsPage';
import { DashboardGrid, useDashboardState } from './components/dashboard/DashboardGrid';
import { WidgetLibraryPanel } from './components/dashboard/WidgetLibraryPanel';
import { AIAssistantPanel } from './components/assistant/AIAssistantPanel';
import { CompaniesPage } from './components/companies/CompaniesPage';
import { Login } from './components/auth/Login';
import { TwoFactor } from './components/auth/TwoFactor';
import type { UserRole } from './types/auth';
import {
  ADMIN_DEFAULT_ACTIVE_WIDGET_IDS,
  SUPERADMIN_DEFAULT_ACTIVE_WIDGET_IDS,
} from './config/widgets';
import './components/layout/layout.css';
import './components/dashboard/dashboard.css';
import './styles/global.css';

type AuthStep = 'login' | 'otp' | 'authenticated';

function DashboardPage({ role }: { role: UserRole }) {
  const {
    isEditMode,
    setIsEditMode,
    activeWidgetIds,
    layout,
    setLayout,
    removeWidget,
  } = useDashboardState(
    role === 'admin' ? ADMIN_DEFAULT_ACTIVE_WIDGET_IDS : SUPERADMIN_DEFAULT_ACTIVE_WIDGET_IDS,
  );

  return (
    <div className="dashboard-page">
      <Header
        role={role}
        isEditMode={isEditMode}
        onToggleEdit={() => setIsEditMode((prev) => !prev)}
      />
      <div className="dashboard-body">
        <div
          className={`dashboard-body__grid-area ${
            isEditMode ? 'dashboard-body__grid-area--library-open' : ''
          }`}
        >
          <DashboardGrid
            isEditMode={isEditMode}
            activeWidgetIds={activeWidgetIds}
            layout={layout}
            onLayoutChange={setLayout}
            onRemoveWidget={removeWidget}
          />
        </div>
      </div>
      {isEditMode && (
        <WidgetLibraryPanel onClose={() => setIsEditMode(false)} />
      )}
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [role, setRole] = useState<UserRole>('superadmin');

  if (authStep === 'login') {
    return (
      <Login
        onSuccess={(loggedInRole) => {
          setRole(loggedInRole);
          setActivePage('dashboard');
          setAuthStep('otp');
        }}
      />
    );
  }

  if (authStep === 'otp') {
    return (
      <TwoFactor
        onSuccess={() => setAuthStep('authenticated')}
        onBack={() => setAuthStep('login')}
      />
    );
  }

  function renderPage() {
    if (activePage === 'dashboard') return <DashboardPage role={role} />;
    if (role === 'admin') return <CompaniesPage />;

    if (activePage === 'tenants') {
      return <TenantsPage />;
    }

    if (activePage === 'subscriptions') {
      return <SubscriptionsPage />;
    }

    return <AuditLogPage />;
  }

  const handleSignOut = () => {
    
    setAuthStep('login');
    setActivePage('dashboard');
    setRole('superadmin');
  };

  return (
    <AppShell
      role={role}
      activePage={activePage}
      onNavigate={setActivePage}
      onSignOut={handleSignOut}
    >
      {renderPage()}
      {}
      {role !== 'superadmin' && <AIAssistantPanel />}
    </AppShell>
  );
}

export default App;
