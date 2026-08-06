import { useCallback, useMemo, useRef, useState } from 'react';
import GridLayout, {
  WidthProvider,
  type Layout,
  type LayoutItem,
} from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  ALL_WIDGET_IDS,
  DEFAULT_ACTIVE_WIDGET_IDS,
  DEFAULT_LAYOUT,
  WIDGET_REGISTRY,
  type WidgetId,
} from '../../config/widgets';
import { WidgetWrapper } from '../ui/WidgetWrapper';
import './dashboard.css';

const ResponsiveGrid = WidthProvider(GridLayout);

const ROW_HEIGHT = 60;
const ROW_MARGIN_Y = 20;

function pixelsToRows(pixelHeight: number, minH: number) {
  const rows = Math.ceil((pixelHeight + ROW_MARGIN_Y) / (ROW_HEIGHT + ROW_MARGIN_Y));
  return Math.max(rows, minH);
}

interface DashboardGridProps {
  isEditMode: boolean;
  activeWidgetIds: WidgetId[];
  layout: LayoutItem[];
  onLayoutChange: (layout: LayoutItem[]) => void;
  onRemoveWidget: (id: WidgetId) => void;
}

export function DashboardGrid({
  isEditMode,
  activeWidgetIds,
  layout,
  onLayoutChange,
  onRemoveWidget,
}: DashboardGridProps) {
  const activeLayout = useMemo(
    () => layout.filter((item) => activeWidgetIds.includes(item.i as WidgetId)),
    [layout, activeWidgetIds],
  );

  const handleLayoutChange = useCallback(
    (newLayout: Layout) => {
      if (!isEditMode) return;
      const merged = layout.map((item) => {
        const updated = newLayout.find((l) => l.i === item.i);
        return updated ?? item;
      });
      onLayoutChange([...merged]);
    },
    [isEditMode, layout, onLayoutChange],
  );

  
  
  
  
  
  
  
  
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  const handleContentResize = useCallback(
    (id: WidgetId, contentHeightPx: number) => {
      const nextH = pixelsToRows(contentHeightPx, WIDGET_REGISTRY[id].minH);
      const current = layoutRef.current.find((item) => item.i === id);
      if (!current || current.h === nextH) return;
      onLayoutChange(layoutRef.current.map((item) => (item.i === id ? { ...item, h: nextH } : item)));
    },
    [onLayoutChange],
  );

  return (
    
    
    
    
    
    <div className="dashboard-grid">
      <ResponsiveGrid
        className="dashboard-grid__layout"
        layout={activeLayout}
        cols={12}
        rowHeight={60}
        margin={[20, 20]}
        containerPadding={[0, 0]}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
        draggableCancel=".widget-wrapper__remove"
        onLayoutChange={handleLayoutChange}
        compactType="vertical"
        useCSSTransforms
      >
        {activeWidgetIds.map((id) => {
          const { component: WidgetComponent, autoHeight } = WIDGET_REGISTRY[id];
          return (
            <div key={id} className="dashboard-grid__item">
              <WidgetWrapper
                isEditMode={isEditMode}
                onRemove={() => onRemoveWidget(id)}
                autoHeight={autoHeight}
                onContentResize={
                  autoHeight ? (heightPx) => handleContentResize(id, heightPx) : undefined
                }
              >
                <WidgetComponent />
              </WidgetWrapper>
            </div>
          );
        })}
      </ResponsiveGrid>
    </div>
  );
}

export function useDashboardState(initialActiveWidgetIds: WidgetId[] = DEFAULT_ACTIVE_WIDGET_IDS) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeWidgetIds, setActiveWidgetIds] = useState<WidgetId[]>(initialActiveWidgetIds);
  const [layout, setLayout] = useState<LayoutItem[]>(DEFAULT_LAYOUT);

  const removedWidgetIds = useMemo(
    () => ALL_WIDGET_IDS.filter((id) => !activeWidgetIds.includes(id)),
    [activeWidgetIds],
  );

  const removeWidget = useCallback((id: WidgetId) => {
    setActiveWidgetIds((prev) => prev.filter((w) => w !== id));
  }, []);

  const addWidget = useCallback((id: WidgetId) => {
    setActiveWidgetIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  return {
    isEditMode,
    setIsEditMode,
    activeWidgetIds,
    layout,
    setLayout,
    removedWidgetIds,
    removeWidget,
    addWidget,
  };
}
