import { X } from 'lucide-react';
import './dashboard.css';

interface WidgetLibraryPanelProps {
  onClose: () => void;
}

export function WidgetLibraryPanel({ onClose }: WidgetLibraryPanelProps) {
  return (
    
    
    
    
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
      <p className="widget-library__empty">جميع الودجات مضافة إلى لوحة التحكم</p>
    </aside>
  );
}
