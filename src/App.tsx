import { AppShell } from './components/layout/AppShell';
import { Header } from './components/layout/Header';
import { DashboardGrid, useDashboardState } from './components/dashboard/DashboardGrid';
import { WidgetLibraryPanel } from './components/dashboard/WidgetLibraryPanel';
import { AIAssistantPanel } from './components/assistant/AIAssistantPanel';
import './components/layout/layout.css';
import './components/dashboard/dashboard.css';
import './styles/global.css';

function App() {
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
    <AppShell>
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
      <AIAssistantPanel />
    </AppShell>
  );
}

export default App;
