import { Card } from '../../ui/Card';
import { tenantStats } from '../../../data/mockDashboard';

export function SubscriptionsEndingWidget() {
  return (
    <Card className="widget-kpi-compact widget-subscriptions-ending">
      <p className="widget-title widget-kpi-compact__title">اشتراكات تنتهي خلال 30 يوم</p>
      <div className="widget-stat-block widget-stat-inline">
        <span className="widget-stat-value">{tenantStats.subscriptionsEndingSoon}</span>
        <span className="widget-stat-label">حسابات</span>
      </div>
    </Card>
  );
}
