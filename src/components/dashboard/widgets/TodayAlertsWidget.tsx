import type { ReactNode } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Card } from '../../ui/Card';
import { todayAlerts } from '../../../data/mockDashboard';
import type { AlertType } from '../../../data/mockDashboard';
import approvalIconSrc from '../../../assets/icons/approval.png';

function ApprovalIcon({ size = 20 }: { size?: number }) {
  return <img src={approvalIconSrc} alt="" width={size} height={size} />;
}

type AlertIconComponent = (props: { size?: number }) => ReactNode;

const alertIcons: Record<AlertType, AlertIconComponent> = {
  deliverable: Clock,
  risk: AlertTriangle,
  approval: ApprovalIcon,
};

export function TodayAlertsWidget() {
  return (
    <Card className="widget-today-alerts">
      <div className="widget-today-alerts__header">
        <h3 className="widget-header__title">تنبيهات اليوم</h3>
        <span className="widget-today-alerts__count" aria-label={`${todayAlerts.length} تنبيهات`}>
          {todayAlerts.length}
        </span>
      </div>
      <div className="alert-list">
        {todayAlerts.map((alert) => {
          const Icon = alertIcons[alert.type];
          return (
            <div key={alert.id} className="alert-item">
              <div className={`alert-item__icon alert-item__icon--${alert.type}`}>
                <Icon size={20} />
              </div>
              <div className="alert-item__content">
                <p className="alert-item__title">{alert.title}</p>
                <p className="alert-item__subtitle">{alert.subtitle}</p>
              </div>
              <span className="alert-item__time">{alert.time}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
