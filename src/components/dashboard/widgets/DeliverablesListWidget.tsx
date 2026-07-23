import { ChevronLeft } from 'lucide-react';
import { Card } from '../../ui/Card';
import { deliverables } from '../../../data/mockDashboard';

export function DeliverablesListWidget() {
  return (
    <Card>
      <div className="widget-header">
        <h3 className="widget-header__title">المخرجات</h3>
        <button type="button" className="widget-header__link">
          عرض الكل
        </button>
      </div>
      <div className="list-rows">
        {deliverables.map((item) => (
          <div className="list-row" key={item.id}>
            <div className="list-row__text">
              <p className="list-row__title">{item.title}</p>
              <p className="list-row__subtitle">{item.project}</p>
            </div>
            <button type="button" className="list-row__nav-btn" aria-label="عرض التفاصيل">
              <ChevronLeft size={14} />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
