import { Plus, X } from 'lucide-react';
import type { WidgetId } from '../../config/widgets';
import { WidgetPreview } from './WidgetPreview';
import './dashboard.css';

interface WidgetLibraryPanelProps {
  removedWidgetIds: WidgetId[];
  onAddWidget: (id: WidgetId) => void;
  onClose: () => void;
}

export function WidgetLibraryPanel({ removedWidgetIds, onAddWidget, onClose }: WidgetLibraryPanelProps) {
  const body = removedWidgetIds.length === 0 ? (
    <p className="widget-library__empty">جميع الودجات مضافة إلى لوحة التحكم</p>
  ) : (
    <>
      <p className="widget-library__hint">انقر لإضافة ودجت إلى لوحة التحكم</p>
      <div className="widget-library__list">
        {removedWidgetIds.map((id) => {
          return (
            <button
              key={id}
              type="button"
              className="widget-library__item"
              onClick={() => onAddWidget(id)}
            >
              <div className="widget-library__preview">
                <WidgetPreview id={id} />
              </div>
              <div className="widget-library__item-footer">
                <span>إضافة إلى لوحة التحكم</span>
                <Plus size={16} />
              </div>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    // No backdrop: the dashboard behind this panel must stay fully
    // interactive (draggable widgets, clickable remove buttons) while
    // the panel is open. The panel is `position: fixed` (see
    // dashboard.css) so it overlays the grid without a blocking layer.
    <aside className="widget-library" dir="rtl">
      <div className="widget-library__header">
        <h2 className="widget-library__title">مكتبة الودجات</h2>
        <button
          type="button"
          className="widget-library__close"
          onClick={onClose}
          aria-label="إغلاق مكتبة الودجات"
        >
          <X size={18} />
        </button>
      </div>
      {body}
    </aside>
  );
}
