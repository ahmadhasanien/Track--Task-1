import { useState } from 'react';
import { AppShell } from './components/layout/AppShell';
import { Header } from './components/layout/Header';
import type { PageId } from './components/layout/Sidebar';
import { DashboardGrid, useDashboardState } from './components/dashboard/DashboardGrid';
import { WidgetLibraryPanel } from './components/dashboard/WidgetLibraryPanel';
import { AIAssistantPanel } from './components/assistant/AIAssistantPanel';
import { CompaniesPage } from './components/companies/CompaniesPage';
import './components/layout/layout.css';
import './components/dashboard/dashboard.css';
import './styles/global.css';

function DashboardPage() {
  const {
    isEditMode,
    setIsEditMode,
    activeWidgetIds,
    layout,
    setLayout,
    removedWidgetIds,
    removeWidget,
    addWidget,
  } = useDashboardState();

  return (
    <div className="dashboard-page">
      <Header
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
        <WidgetLibraryPanel
          removedWidgetIds={removedWidgetIds}
          onAddWidget={addWidget}
          onClose={() => setIsEditMode(false)}
        />
      )}
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');

  return (
    <AppShell activePage={activePage} onNavigate={setActivePage}>
      {activePage === 'dashboard' ? <DashboardPage /> : <CompaniesPage />}
      <AIAssistantPanel />
    </AppShell>
  );
}

export default App;
