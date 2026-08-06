import { useEffect, useRef, type ReactNode } from 'react';
import closeCircleIcon from '../../assets/icons/vuesax/linear/close-circle.svg';
import './ui.css';

interface WidgetWrapperProps {
  children: ReactNode;
  isEditMode: boolean;
  onRemove: () => void;
  
  autoHeight?: boolean;
  onContentResize?: (contentHeightPx: number) => void;
}

export function WidgetWrapper({
  children,
  isEditMode,
  onRemove,
  autoHeight = false,
  onContentResize,
}: WidgetWrapperProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoHeight || !onContentResize) return;
    const el = contentRef.current;
    if (!el) return;

    
    
    onContentResize(el.scrollHeight);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        onContentResize(entry.target.scrollHeight);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoHeight, onContentResize]);

  return (
    <article dir="rtl" className={`widget-wrapper ${isEditMode ? 'widget-wrapper--edit' : ''}`}>
      {isEditMode && (
        <button
          type="button"
          className="widget-wrapper__remove"
          onClick={onRemove}
          aria-label="إزالة الودجت"
        >
          <img src={closeCircleIcon} alt="" width={20} height={20} />
        </button>
      )}
      {autoHeight ? (
        <div ref={contentRef} className="widget-wrapper__content widget-wrapper__content--auto">
          {children}
        </div>
      ) : (
        children
      )}
    </article>
  );
}
