import { Card } from '../../ui/Card';
import { dashboardStats } from '../../../data/mockDashboard';

export function ActiveProjectsWidget() {
  return (
    <Card className="widget-kpi-compact widget-active-projects">
      <p className="widget-title widget-kpi-compact__title">المشاريع النشطة</p>
      <div className="widget-stat-block widget-stat-inline">
        <span className="widget-stat-value">{dashboardStats.activeProjects}</span>
        <span className="widget-stat-label">مشاريع</span>
      </div>
    </Card>
  );
}
