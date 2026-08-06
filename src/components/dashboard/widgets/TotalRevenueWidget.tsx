import { TrendingUp } from 'lucide-react';
import { Card } from '../../ui/Card';
import { tenantStats } from '../../../data/mockDashboard';

export function TotalRevenueWidget() {
  return (
    <Card className="widget-total-revenue">
      <span className="widget-icon-badge widget-total-revenue__icon">
        <TrendingUp size={16} aria-hidden style={{ transform: 'scaleX(-1)' }} />
      </span>
      <p className="widget-title widget-kpi-compact__title">إجمالي الايرادات</p>
      <div className="widget-stat-block widget-stat-inline">
        <p className="widget-stat-value widget-total-revenue__value">
          {tenantStats.totalRevenue}
        </p>
        <p className="widget-stat-label">ريال/شهري</p>
      </div>
    </Card>
  );
}
