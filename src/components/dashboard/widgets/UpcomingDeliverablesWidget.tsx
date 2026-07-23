import { AlertTriangle } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { dashboardStats } from '../../../data/mockDashboard';

export function UpcomingDeliverablesWidget() {
  return (
    <Card className="widget-kpi-compact widget-upcoming-deliverables">
      <p className="widget-title widget-kpi-compact__title">مخرجات قادمة</p>
      <div className="widget-bottom-row widget-kpi-compact__bottom-row">
        <div className="widget-stat-inline">
          <span className="widget-stat-value">{dashboardStats.upcomingDeliverables}</span>
          <span className="widget-stat-label">مخرجات</span>
        </div>
        <Badge variant="warning" icon={<AlertTriangle size={14} />}>
          {dashboardStats.deliverablesThisWeek} خلال أسبوع
        </Badge>
      </div>
    </Card>
  );
}
