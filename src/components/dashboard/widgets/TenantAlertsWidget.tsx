import { AlertTriangle, Clock, Tag } from 'lucide-react';
import { Card } from '../../ui/Card';
import { tenantAlerts } from '../../../data/mockDashboard';
import type { TenantAlertType } from '../../../data/mockDashboard';

const alertIconClass: Record<TenantAlertType, string> = {
  renewal: 'deliverable',
  'unused-invite': 'risk',
  'trial-expired': 'approval',
};

const alertIcons: Record<TenantAlertType, typeof Clock> = {
  renewal: Clock,
  'unused-invite': AlertTriangle,
  'trial-expired': Tag,
};

export function TenantAlertsWidget() {
  return (
    <Card className="widget-today-alerts">
      <div className="widget-today-alerts__header">
        <h3 className="widget-header__title">تنبيهات اليوم</h3>
        <span className="widget-today-alerts__count" aria-label={`${tenantAlerts.length} تنبيهات`}>
          {tenantAlerts.length}
        </span>
      </div>
      <div className="alert-list">
        {tenantAlerts.map((alert) => {
          const Icon = alertIcons[alert.type];
          return (
            <div key={alert.id} className="alert-item">
              <div className={`alert-item__icon alert-item__icon--${alertIconClass[alert.type]}`}>
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
