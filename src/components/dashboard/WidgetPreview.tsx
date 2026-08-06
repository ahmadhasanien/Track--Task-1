import type { ReactElement } from 'react';
import { AlertTriangle, Bell, CheckCircle2, Clock, Tag, TrendingUp } from 'lucide-react';
import { WIDGET_REGISTRY, type WidgetId } from '../../config/widgets';
import {
  dashboardStats,
  deliverables,
  latestActions,
  latestTenants,
  openRisks,
  projects,
  projectStatuses,
  risksByMonth,
  subscriptionsRevenueByMonth,
  tenantAlerts,
  tenantStats,
  tenantStatusBreakdown,
  tenantsByPlan,
  todayAlerts,
} from '../../data/mockDashboard';

function Donut({ segments }: { segments: { color: string; value: number }[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  let acc = 0;
  const stops = segments
    .map((s) => {
      const start = (acc / total) * 100;
      acc += s.value;
      const end = (acc / total) * 100;
      return `${s.color} ${start}% ${end}%`;
    })
    .join(', ');

  return (
    <div className="wlp-donut" style={{ background: `conic-gradient(${stops})` }}>
      <div className="wlp-donut__hole" />
    </div>
  );
}

function LegendRows({ rows }: { rows: { color: string; label: string; value: number | string }[] }) {
  return (
    <div className="wlp-legend">
      {rows.map((row) => (
        <div className="wlp-legend__row" key={row.label}>
          <span className="wlp-legend__left">
            <span className="wlp-legend__dot" style={{ background: row.color }} />
            {row.label}
          </span>
          <span className="wlp-legend__value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function ActiveProjectsPreview() {
  
  
  return (
    <div className="wlp-stat-inline">
      <span className="wlp-stat__value">{dashboardStats.activeProjects}</span>
      <span className="wlp-stat__label">مشاريع</span>
    </div>
  );
}

const AVG_PROGRESS_TONE_LABELS: Record<'danger' | 'warning' | 'success', string> = {
  success: 'على المسار',
  warning: 'يحتاج متابعة',
  danger: 'متأخر',
};

function AvgProgressPreview() {
  const value = dashboardStats.avgProgress;
  const tone =
    value < 40 ? 'danger' : value < 70 ? 'warning' : 'success';
  const fillClass =
    tone === 'danger'
      ? '#F04438'
      : tone === 'warning'
        ? '#F79009'
        : '#17B26A';

  return (
    <div className="wlp-progress">
      <div className="wlp-bottom-row">
        <span className="wlp-stat__value wlp-stat__value--tight">{value}%</span>
        <span className={`wlp-badge wlp-badge--${tone}`}>
          <CheckCircle2 size={11} />
          {AVG_PROGRESS_TONE_LABELS[tone]}
        </span>
      </div>
      <div className="wlp-track">
        <div className="wlp-track__fill" style={{ width: `${value}%`, background: fillClass }} />
      </div>
    </div>
  );
}

function UpcomingDeliverablesPreview() {
  
  
  
  return (
    <div className="wlp-bottom-row">
      <div className="wlp-stat-inline">
        <span className="wlp-stat__value">{dashboardStats.upcomingDeliverables}</span>
        <span className="wlp-stat__label">مخرجات</span>
      </div>
      <span className="wlp-badge wlp-badge--warning">
        <Bell size={11} />
        {dashboardStats.deliverablesThisWeek} خلال أسبوع
      </span>
    </div>
  );
}

function OpenRisksDonutPreview() {
  const segments = [
    { color: '#F04438', value: openRisks.high },
    { color: '#F79009', value: openRisks.medium },
    { color: '#17B26A', value: openRisks.low },
  ];
  return (
    
    
    
    <div className="wlp-donut-row">
      <LegendRows
        rows={[
          { color: '#F04438', label: 'مرتفع', value: openRisks.high },
          { color: '#F79009', label: 'متوسط', value: openRisks.medium },
          { color: '#17B26A', label: 'منخفض', value: openRisks.low },
        ]}
      />
      <Donut segments={segments} />
    </div>
  );
}

function ProjectStatusDonutPreview() {
  const segments = projectStatuses.map((s) => ({ color: s.color, value: s.value }));
  return (
    
    <div className="wlp-donut-row">
      <LegendRows
        rows={projectStatuses.map((s) => ({ color: s.color, label: s.label, value: `${s.value}%` }))}
      />
      <Donut segments={segments} />
    </div>
  );
}

function RisksByLevelPreview() {
  const sample = risksByMonth.slice(0, 5);
  const maxTotal = Math.max(...sample.map((m) => m.low + m.medium + m.high));
  return (
    <div className="wlp-bars">
      {sample.map((m) => {
        const total = m.low + m.medium + m.high;
        const height = Math.max(24, Math.round((total / maxTotal) * 56));
        return (
          <div className="wlp-bars__col" key={m.month} style={{ height }}>
            {}
            <div className="wlp-bars__seg" style={{ flex: m.low, background: '#17B26A' }} />
            <div className="wlp-bars__seg" style={{ flex: m.medium, background: '#F79009' }} />
            <div className="wlp-bars__seg" style={{ flex: m.high, background: '#F04438' }} />
          </div>
        );
      })}
    </div>
  );
}

function TodayAlertsPreview() {
  const sample = todayAlerts.slice(0, 2);
  return (
    <div className="wlp-alerts">
      {sample.map((alert) => (
        <div className="wlp-alerts__row" key={alert.id}>
          <span className={`wlp-alerts__icon wlp-alerts__icon--${alert.type}`}>
            {alert.type === 'risk' ? <AlertTriangle size={12} /> : <Clock size={12} />}
          </span>
          <span className="wlp-alerts__title">{alert.title}</span>
        </div>
      ))}
    </div>
  );
}

function DeliverablesListPreview() {
  const item = deliverables[0];
  return (
    <div className="wlp-list-item">
      <p className="wlp-list-item__title">{item?.title ?? 'مخرج'}</p>
      <p className="wlp-list-item__subtitle">{item?.project ?? ''}</p>
    </div>
  );
}

function ProjectsListPreview() {
  const item = projects[0];
  return (
    <div className="wlp-list-item">
      <p className="wlp-list-item__title">{item?.title ?? 'مشروع'}</p>
      <div className="wlp-track wlp-track--sm">
        <div className="wlp-track__fill" style={{ width: `${item?.progress ?? 0}%` }} />
      </div>
    </div>
  );
}

function ActiveTenantsPreview() {
  
  return (
    <div className="wlp-stat-inline">
      <span className="wlp-stat__value">{tenantStats.activeTenants}</span>
      <span className="wlp-stat__label">جهات</span>
    </div>
  );
}

function SubscriptionsEndingPreview() {
  return (
    <div className="wlp-stat-inline">
      <span className="wlp-stat__value">{tenantStats.subscriptionsEndingSoon}</span>
      <span className="wlp-stat__label">حسابات</span>
    </div>
  );
}

function TotalRevenuePreview() {
  return (
    <div className="wlp-stat-inline">
      <span className="wlp-stat__value">{tenantStats.totalRevenue}</span>
      <span className="wlp-stat__label">ريال/شهري</span>
    </div>
  );
}

function TenantStatusDonutPreview() {
  const segments = tenantStatusBreakdown.map((s) => ({ color: s.color, value: s.value }));
  return (
    
    <div className="wlp-donut-row">
      <LegendRows
        rows={tenantStatusBreakdown.map((s) => ({ color: s.color, label: s.name, value: s.value }))}
      />
      <Donut segments={segments} />
    </div>
  );
}

function SubscriptionsRevenueChartPreview() {
  const sample = subscriptionsRevenueByMonth.slice(0, 5);
  const maxTotal = Math.max(...sample.map((m) => m.low + m.medium + m.high));
  return (
    <div className="wlp-bars">
      {sample.map((m) => {
        const total = m.low + m.medium + m.high;
        const height = Math.max(24, Math.round((total / maxTotal) * 56));
        return (
          <div className="wlp-bars__col" key={m.month} style={{ height }}>
            <div className="wlp-bars__seg" style={{ flex: m.low, background: '#17B26A' }} />
            <div className="wlp-bars__seg" style={{ flex: m.medium, background: '#F79009' }} />
            <div className="wlp-bars__seg" style={{ flex: m.high, background: '#F04438' }} />
          </div>
        );
      })}
    </div>
  );
}

function TenantsByPlanDonutPreview() {
  const segments = tenantsByPlan.map((s) => ({ color: s.color, value: s.value }));
  return (
    <div className="wlp-donut-row">
      <LegendRows
        rows={tenantsByPlan.map((s) => ({ color: s.color, label: s.label, value: `${s.value}%` }))}
      />
      <Donut segments={segments} />
    </div>
  );
}

function TenantAlertsPreview() {
  const sample = tenantAlerts.slice(0, 2);
  const iconClass: Record<string, string> = {
    renewal: 'deliverable',
    'unused-invite': 'risk',
    'trial-expired': 'approval',
  };
  return (
    <div className="wlp-alerts">
      {sample.map((alert) => (
        <div className="wlp-alerts__row" key={alert.id}>
          <span className={`wlp-alerts__icon wlp-alerts__icon--${iconClass[alert.type]}`}>
            {alert.type === 'unused-invite' ? (
              <AlertTriangle size={12} />
            ) : alert.type === 'trial-expired' ? (
              <Tag size={12} />
            ) : (
              <Clock size={12} />
            )}
          </span>
          <span className="wlp-alerts__title">{alert.title}</span>
        </div>
      ))}
    </div>
  );
}

function LatestActionsPreview() {
  const item = latestActions[0];
  return (
    <div className="wlp-list-item">
      <p className="wlp-list-item__title">{item?.title ?? 'إجراء'}</p>
    </div>
  );
}

function LatestTenantsPreview() {
  const item = latestTenants[0];
  return (
    <div className="wlp-list-item">
      <p className="wlp-list-item__title">{item?.name ?? 'مستأجر'}</p>
      <p className="wlp-list-item__subtitle">{item?.statusLabel ?? ''}</p>
    </div>
  );
}

const PREVIEWS: Record<WidgetId, () => ReactElement> = {
  'active-tenants': ActiveTenantsPreview,
  'total-revenue': TotalRevenuePreview,
  'subscriptions-ending': SubscriptionsEndingPreview,
  'tenant-status-donut': TenantStatusDonutPreview,
  'subscriptions-revenue-chart': SubscriptionsRevenueChartPreview,
  'tenant-plan-donut': TenantsByPlanDonutPreview,
  'tenant-alerts': TenantAlertsPreview,
  'latest-actions': LatestActionsPreview,
  'latest-tenants': LatestTenantsPreview,
  'active-projects': ActiveProjectsPreview,
  'avg-progress': AvgProgressPreview,
  'upcoming-deliverables': UpcomingDeliverablesPreview,
  'open-risks-donut': OpenRisksDonutPreview,
  'risks-by-level': RisksByLevelPreview,
  'project-status-donut': ProjectStatusDonutPreview,
  'today-alerts': TodayAlertsPreview,
  'deliverables-list': DeliverablesListPreview,
  'projects-list': ProjectsListPreview,
};

const PREVIEW_ICONS: Partial<Record<WidgetId, ReactElement>> = {
  'avg-progress': <TrendingUp size={13} aria-hidden style={{ transform: 'scaleX(-1)' }} />,
  'total-revenue': <TrendingUp size={13} aria-hidden />,
};

export function WidgetPreview({ id }: { id: WidgetId }) {
  const Preview = PREVIEWS[id];
  const icon = PREVIEW_ICONS[id];
  return (
    <div className="wlp-card">
      <div className="wlp-header">
        <p className="wlp-title">{WIDGET_REGISTRY[id].title}</p>
        {icon && <span className="wlp-icon-badge">{icon}</span>}
      </div>
      <Preview />
    </div>
  );
}
