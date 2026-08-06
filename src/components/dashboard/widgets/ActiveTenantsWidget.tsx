import { Card } from '../../ui/Card';
import { tenantStats } from '../../../data/mockDashboard';

export function ActiveTenantsWidget() {
  return (
    <Card className="widget-kpi-compact widget-active-tenants">
      <p className="widget-title widget-kpi-compact__title">المستأجرون النشطون</p>
      <div className="widget-stat-block widget-stat-inline">
        <span className="widget-stat-value">{tenantStats.activeTenants}</span>
        <span className="widget-stat-label">جهات</span>
      </div>
    </Card>
  );
}
